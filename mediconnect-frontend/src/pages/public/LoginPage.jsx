import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Stethoscope, Lock, Mail, Smartphone } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function LoginPage() {
  const [mode, setMode] = useState('password')
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, loginWithOtp, sendOtp, getDefaultRoute } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || getDefaultRoute()

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    if (!emailOrPhone.trim() || !password) {
      toast.error('Enter email/phone and password')
      return
    }
    setLoading(true)
    try {
      await login(emailOrPhone.trim(), password)
      toast.success('Logged in successfully')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!emailOrPhone.trim()) {
      toast.error('Enter email or phone')
      return
    }
    setLoading(true)
    try {
      await sendOtp(emailOrPhone.trim(), 'sms')
      setOtpSent(true)
      toast.success('OTP sent')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpLogin = async (e) => {
    e.preventDefault()
    if (!emailOrPhone.trim() || !otp.trim()) {
      toast.error('Enter email/phone and OTP')
      return
    }
    setLoading(true)
    try {
      await loginWithOtp(emailOrPhone.trim(), otp.trim())
      toast.success('Logged in successfully')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP')
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
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back</h1>
          <p className="mt-2 text-sm text-neutral-500">Sign in to continue to MediConnect</p>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-card p-8">
          {/* Tab switcher */}
          <div className="flex rounded-xl bg-neutral-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode('password')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-smooth ${
                mode === 'password' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Lock className="w-4 h-4" />
              Password
            </button>
            <button
              type="button"
              onClick={() => setMode('otp')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-smooth ${
                mode === 'otp' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              OTP
            </button>
          </div>

          {mode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="flex flex-col gap-4">
              <Input
                label="Email or phone"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col gap-4">
              <Input
                label="Email or phone"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="you@example.com or +91..."
                disabled={otpSent}
              />
              {!otpSent ? (
                <Button onClick={handleSendOtp} className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>
              ) : (
                <form onSubmit={handleOtpLogin} className="flex flex-col gap-4">
                  <Input
                    label="OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify & sign in'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-soft"
                  >
                    Use different number
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          {"Don't have an account? "}
          <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 transition-soft">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}
