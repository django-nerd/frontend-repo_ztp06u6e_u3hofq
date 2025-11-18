import React from 'react'

export default function RightPanel({ output, tags, onCopy, onSave, onExport, history, onLoadHistory }) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10">
        <div className="p-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
          <div className="font-semibold text-[#111111] dark:text-white">AI Output</div>
          <div className="flex gap-2">
            <button onClick={onCopy} className="px-3 py-1.5 rounded-md bg-[#EAF0FF] text-[#0A58FF] hover:bg-blue-100">Copy</button>
            <button onClick={onSave} className="px-3 py-1.5 rounded-md bg-[#0A58FF] text-white hover:bg-[#0038CC]">Save Note</button>
            <button onClick={onExport} className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[#111111] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700">Export as TXT</button>
          </div>
        </div>
        <div className="p-4">
          <pre className="whitespace-pre-wrap text-sm sm:text-base text-[#111111] dark:text-slate-100">{output || 'Your AI results will appear here.'}</pre>
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAF0FF] text-[#0A58FF] text-sm">{t}</span>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow border border-gray-100 dark:border-white/10">
        <details className="p-4" open>
          <summary className="cursor-pointer font-semibold text-[#111111] dark:text-white">Saved Notes / History</summary>
          <div className="mt-3 max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-white/10">
            {(history || []).map((n) => (
              <button key={n.id} onClick={() => onLoadHistory(n)} className="w-full text-left px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                <div className="text-sm font-medium text-[#111111] dark:text-white">{(n.processed_note || n.original_note || '').slice(0, 20)}{((n.processed_note || n.original_note || '').length > 20) ? '…' : ''}</div>
                <div className="text-xs text-slate-500">{new Date(n.timestamp || n.created_at || Date.now()).toLocaleString()}</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {(n.tags || []).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-[#EAF0FF] text-[#0A58FF] text-xs">{t}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </details>
      </div>
    </div>
  )
}
