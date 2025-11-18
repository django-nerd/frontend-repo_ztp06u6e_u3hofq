import React, { useRef, useState } from 'react'
import AIGrid from './AIGrid'

export default function LeftPanel({ note, setNote, onRunFlow, showCompare, setShowCompare, note2, setNote2, onUploadPDF, onUploadText, onVoiceStart, syllabus, setSyllabus, onGeneratePlan }) {
  const pdfRef = useRef(null)
  const textRef = useRef(null)

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#111111] dark:text-white mb-2">Write or Paste Your Notes Here</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type or paste your notes…"
          className="w-full h-[300px] rounded-xl border border-gray-200 dark:border-white/10 p-3 focus:outline-none focus:ring-2 focus:ring-[#0A58FF] bg-white dark:bg-slate-900 text-[#111111] dark:text-white"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#111111] dark:text-white mb-2">PDF Upload</label>
          <input ref={pdfRef} type="file" accept="application/pdf,.pdf" onChange={(e)=> onUploadPDF(e.target.files?.[0])} className="block w-full text-sm text-slate-700 dark:text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#EAF0FF] file:text-[#0A58FF] hover:file:bg-blue-100" />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-[#111111] dark:text-white mb-2">Text File Upload</label>
          <input ref={textRef} type="file" accept="text/plain,.txt" onChange={(e)=> onUploadText(e.target.files?.[0])} className="block w-full text-sm text-slate-700 dark:text-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#EAF0FF] file:text-[#0A58FF] hover:file:bg-blue-100" />
        </div>
        <div className="col-span-1 flex items-end">
          <button onClick={onVoiceStart} className="w-full rounded-lg bg-[#0A58FF] text-white py-2 hover:bg-[#0038CC]">🎤 Voice Input</button>
        </div>
      </div>

      <AIGrid onRun={(key)=>{
        if(key === 'compare_notes') setShowCompare(true)
        onRunFlow(key)
      }} />

      {showCompare && (
        <div>
          <label className="block text-sm font-medium text-[#111111] dark:text-white mb-2">Second Note for Comparison</label>
          <textarea
            value={note2}
            onChange={(e)=> setNote2(e.target.value)}
            placeholder="Paste the second note here…"
            className="w-full h-40 rounded-xl border border-gray-200 dark:border-white/10 p-3 focus:outline-none focus:ring-2 focus:ring-[#0A58FF] bg-white dark:bg-slate-900 text-[#111111] dark:text-white"
          />
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#111111] dark:text-white">Enter Syllabus / Topic for Study Plan</label>
        <textarea value={syllabus} onChange={(e)=> setSyllabus(e.target.value)} className="w-full h-28 rounded-xl border border-gray-200 dark:border-white/10 p-3 focus:outline-none focus:ring-2 focus:ring-[#0A58FF] bg-white dark:bg-slate-900 text-[#111111] dark:text-white" />
        <button onClick={onGeneratePlan} className="rounded-lg bg-[#0A58FF] text-white px-4 py-2 hover:bg-[#0038CC]">Generate Study Plan (7 & 30 days)</button>
      </div>
    </div>
  )
}
