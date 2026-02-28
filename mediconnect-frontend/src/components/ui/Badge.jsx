export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
