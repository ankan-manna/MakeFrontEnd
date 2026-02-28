import { useEffect } from 'react'
import { X } from 'lucide-react'

export function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-neutral-950/50 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
        <div className="relative bg-white rounded-2xl shadow-elevated max-w-lg w-full p-6 animate-scale-in border border-neutral-200/60">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-soft focus-ring"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-6">{children}</div>
          {footer && <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">{footer}</div>}
        </div>
      </div>
    </div>
  )
}
