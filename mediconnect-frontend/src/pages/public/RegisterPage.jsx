import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Stethoscope } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { ROLES, ROLE_LABELS } from '../../constants'

const REGISTER_ROLES = [ROLES.PATIENT, ROLES.DOCTOR, ROLES.PHARMACIST, ROLES.LAB_TECH]

const ROLE_DESCRIPTIONS = {
  [ROLES.PATIENT]: 'Book appointments & manage health',
  [ROLES.DOCTOR]: 'Manage patients & prescriptions',
  [ROLES.PHARMACIST]: 'Handle pharmacy operations',
  [ROLES.LAB_TECH]: 'Manage lab tests & reports',
}

export function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [userType, setUserType] = useState(ROLES.PATIENT)
  const [loading, setLoading] = useState(false)
  const { register, login, getDefaultRoute } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fullName.trim() || !email.trim() || !password) {
      toast.error('Fill required fields')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    try {
      await register({ fullName: fullName.trim(), email: email.trim(), password, phone: phone.trim() || undefined, userType })
      toast.success('Account created. Signing you in...')
      await login(email.trim(), password)
      navigate(getDefaultRoute(), { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.email?.[0] || 'Registration failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 bg-neutral-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-600 mb-4">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900">Create your account</h1>
          <p className="mt-2 text-sm text-neutral-500">Join MediConnect and start managing your health</p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-card p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 characters"
              required
            />
            <Input
              label="Phone (optional)"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />

            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">I am a</label>
              <div className="grid grid-cols-2 gap-2">
                {REGISTER_ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setUserType(r)}
                    className={`flex flex-col items-start px-4 py-3 rounded-xl text-left transition-smooth border-2 ${
                      userType === r
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="text-sm font-semibold">{ROLE_LABELS[r]}</span>
                    <span className="text-xs text-neutral-500 mt-0.5">{ROLE_DESCRIPTIONS[r]}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          {'Already have an account? '}
          <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-soft">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
