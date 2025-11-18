import React from 'react'

const buttons = [
  { key: 'summarize', label: 'Summarize', emoji: '✨' },
  { key: 'rewrite', label: 'Rewrite', emoji: '📝' },
  { key: 'bullet_points', label: 'Bullet Points', emoji: '📌' },
  { key: 'short_version', label: 'Short Version', emoji: '⚡' },
  { key: 'eli5', label: "Explain Like I'm 5", emoji: '👶' },
  { key: 'flashcards', label: 'Flashcards', emoji: '🧠' },
  { key: 'mcqs', label: 'MCQs', emoji: '❓' },
  { key: 'short_questions', label: 'Short Questions', emoji: '🧾' },
  { key: 'chapter_summary', label: 'Chapter Summary', emoji: '📚' },
  { key: 'mindmap', label: 'Mindmap', emoji: '🌳' },
  { key: 'smart_tags', label: 'Smart Tags', emoji: '🏷️' },
  { key: 'memory_recall', label: 'Recall Study', emoji: '🔍' },
  { key: 'compare_notes', label: 'Compare Notes', emoji: '📋' },
  { key: 'study_plan', label: 'Study Plan', emoji: '📅' },
]

export default function AIGrid({ onRun }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
      {buttons.map((b) => (
        <button
          key={b.key}
          onClick={() => onRun(b.key)}
          className="rounded-xl bg-[#0A58FF] text-white px-3 py-2 text-sm sm:text-base hover:bg-[#0038CC] transition shadow-sm"
        >
          <span className="mr-1">{b.emoji}</span>
          {b.label}
        </button>
      ))}
    </div>
  )
}
