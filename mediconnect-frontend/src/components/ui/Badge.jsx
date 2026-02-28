export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700 border-neutral-200/80',
    primary: 'bg-primary-50 text-primary-700 border-primary-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    danger: 'bg-red-50 text-red-700 border-red-200/80',
    info: 'bg-sky-50 text-sky-700 border-sky-200/80',
  }
  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  }
  return (
    <span
      className={`inline-flex items-center rounded-lg font-semibold border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  )
}
