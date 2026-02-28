export function Loader({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} relative`}>
        <div className={`absolute inset-0 rounded-full border-2 border-primary-100`} />
        <div className={`absolute inset-0 rounded-full border-2 border-transparent border-t-primary-600 animate-spin`} />
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Loader size="lg" />
      <p className="text-sm text-neutral-400 animate-pulse-soft">Loading...</p>
    </div>
  )
}
