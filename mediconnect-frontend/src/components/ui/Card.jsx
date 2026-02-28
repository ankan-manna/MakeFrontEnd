export function Card({ children, className = '', padding = true, hover = true, ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-neutral-200/80 shadow-soft overflow-hidden transition-smooth ${
        hover ? 'hover:shadow-card hover:border-neutral-300/80' : ''
      } ${padding ? 'p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between mb-5 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
