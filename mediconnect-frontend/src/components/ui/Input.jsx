export function Input({
  label,
  error,
  type = 'text',
  className = '',
  id,
  ...props
}) {
  const inputId = id || props.name
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`block w-full rounded-xl border px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 bg-white shadow-sm transition-smooth focus-ring ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-500/30'
            : 'border-neutral-300 hover:border-neutral-400 focus:border-primary-500 focus:ring-primary-500/30'
        }`}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}
