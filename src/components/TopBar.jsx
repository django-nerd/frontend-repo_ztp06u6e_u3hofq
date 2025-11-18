import React from 'react'
import { History, Settings, Mic, Moon } from 'lucide-react'

export default function TopBar({ onToggleDark, onStartVoice, isDark }) {
  return (
    <header className="w-full sticky top-0 z-20">
      <div className="bg-[#0A58FF] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="font-semibold text-lg sm:text-xl tracking-tight">
            SmartNotes AI – Your Intelligent Study Partner
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button title="History" className="p-2 rounded-md hover:bg-white/10 transition">
              <History className="w-5 h-5" />
            </button>
            <button title="Settings" className="p-2 rounded-md hover:bg-white/10 transition">
              <Settings className="w-5 h-5" />
            </button>
            <button title="Voice Notes" onClick={onStartVoice} className="p-2 rounded-md hover:bg-white/10 transition">
              <Mic className="w-5 h-5" />
            </button>
            <button title="Dark Mode" onClick={onToggleDark} className="p-2 rounded-md hover:bg-white/10 transition">
              <Moon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
