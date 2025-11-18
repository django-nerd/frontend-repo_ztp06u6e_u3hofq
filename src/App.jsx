import React, { useEffect, useMemo, useRef, useState } from 'react'
import TopBar from './components/TopBar'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import HeroSpline from './components/HeroSpline'

const PRIMARY = '#0A58FF'

function App() {
  const [dark, setDark] = useState(false)
  const [note, setNote] = useState('')
  const [note2, setNote2] = useState('')
  const [showCompare, setShowCompare] = useState(false)
  const [output, setOutput] = useState('')
  const [tags, setTags] = useState([])
  const [history, setHistory] = useState([])
  const [syllabus, setSyllabus] = useState('')
  const [recording, setRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

  const runFlow = async (flow) => {
    let body = { flow }
    if (flow === 'compare_notes') {
      body.note1 = note
      body.note2 = note2
    } else if (flow === 'study_plan') {
      body.user_syllabus = syllabus
    } else if (flow === 'memory_recall') {
      // handled via separate endpoint, but keep consistent UX
      const fd = new FormData()
      fd.append('query', note || '')
      const res = await fetch(`${BACKEND}/api/memory-recall`, { method: 'POST', body: fd })
      const data = await res.json()
      setOutput(data.summary || '')
      return
    } else {
      body.user_note = note
    }

    const res = await fetch(`${BACKEND}/api/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    setOutput(data.output || '')

    if (flow === 'smart_tags') {
      const list = (data.output || '').split(',').map(s => s.trim()).filter(Boolean)
      setTags(list)
    }
  }

  const onCopy = async () => {
    await navigator.clipboard.writeText(output || '')
  }

  const onExport = () => {
    const blob = new Blob([output || ''], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'smartnotes-output.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onSave = async () => {
    const res = await fetch(`${BACKEND}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ original_note: note, processed_note: output, tags })
    })
    const _ = await res.json()
    loadHistory()
  }

  const loadHistory = async () => {
    const res = await fetch(`${BACKEND}/api/history`)
    const data = await res.json()
    setHistory(data.notes || [])
  }

  useEffect(() => { loadHistory() }, [])

  const onLoadHistory = (n) => {
    setNote(n.original_note || '')
    setOutput(n.processed_note || '')
    setTags(n.tags || [])
  }

  const onUploadPDF = async (file) => {
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${BACKEND}/api/upload/pdf`, { method: 'POST', body: fd })
    const data = await res.json()
    setNote((prev) => (prev ? prev + '\n' : '') + (data.text || ''))
  }

  const onUploadText = async (file) => {
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${BACKEND}/api/upload/text`, { method: 'POST', body: fd })
    const data = await res.json()
    setNote((prev) => (prev ? prev + '\n' : '') + (data.text || ''))
  }

  // Voice input using Web Speech API (transcription only in-browser) then cleanup via backend
  const startVoice = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        alert('Speech Recognition not supported in this browser')
        return
      }
      const rec = new SpeechRecognition()
      rec.lang = 'en-US'
      rec.interimResults = true
      rec.continuous = true
      mediaRecorderRef.current = rec
      let transcript = ''
      rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript
          if (e.results[i].isFinal) transcript += t + ' '
        }
      }
      rec.onend = async () => {
        setRecording(false)
        if (transcript) {
          const res = await fetch(`${BACKEND}/api/ai`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flow: 'voice_cleanup', voice_text: transcript })
          })
          const data = await res.json()
          setNote((prev) => (prev ? prev + '\n' : '') + (data.output || transcript))
        }
      }
      rec.start()
      setRecording(true)
    } catch (e) {
      console.error(e)
    }
  }

  const stopVoice = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.stop) {
      mediaRecorderRef.current.stop()
    }
  }

  return (
    <div className={`min-h-screen ${dark ? 'bg-slate-950' : 'bg-[#F5F5F5]'} pb-16`}>
      <TopBar onToggleDark={() => setDark(!dark)} onStartVoice={() => (recording ? stopVoice() : startVoice())} isDark={dark} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-4">
        <HeroSpline />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <LeftPanel
              note={note}
              setNote={setNote}
              onRunFlow={runFlow}
              showCompare={showCompare}
              setShowCompare={setShowCompare}
              note2={note2}
              setNote2={setNote2}
              onUploadPDF={onUploadPDF}
              onUploadText={onUploadText}
              onVoiceStart={() => (recording ? stopVoice() : startVoice())}
              syllabus={syllabus}
              setSyllabus={setSyllabus}
              onGeneratePlan={() => runFlow('study_plan')}
            />
          </div>
          <div className="lg:col-span-5">
            <RightPanel
              output={output}
              tags={tags}
              onCopy={onCopy}
              onSave={onSave}
              onExport={onExport}
              history={history}
              onLoadHistory={onLoadHistory}
            />
          </div>
        </div>

        <footer className="text-center text-sm text-slate-600 dark:text-slate-300 pt-4">
          Made with ⚡ Flames Blue + AI
        </footer>
      </div>

      {recording && (
        <div className="fixed bottom-4 right-4 bg-[#0A58FF] text-white px-4 py-2 rounded-full shadow-lg">
          Recording… click the mic again to stop
        </div>
      )}
    </div>
  )
}

export default App
