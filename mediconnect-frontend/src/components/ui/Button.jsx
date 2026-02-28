export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  type = 'button',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-smooth focus-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none relative overflow-hidden'
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md hover:shadow-primary-500/20',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-sm hover:shadow-md hover:shadow-secondary-500/20',
    outline: 'border-2 border-neutral-300 text-neutral-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50/50 active:bg-primary-100/50',
    ghost: 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200/70',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md hover:shadow-red-500/20',
    'primary-gradient': 'bg-[linear-gradient(135deg,#3366ff_0%,#1a45f5_50%,#3366ff_100%)] bg-[length:200%_100%] text-white hover:bg-[position:100%_0] active:opacity-90 shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/30',
    'white': 'bg-white text-neutral-900 hover:bg-neutral-50 border border-neutral-200/80 shadow-sm hover:shadow-card',
  }
  const sizes = {
    sm: 'px-3.5 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
    xl: 'px-9 py-4 text-base gap-3 font-bold',
  }
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
