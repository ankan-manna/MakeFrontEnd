import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Calendar, User, FileText, Stethoscope } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Loader } from '../../components/ui/Loader'
import { doctorApi } from '../../api/services'

export function DoctorDashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    doctorApi
      .getProfile()
      .then((res) => setProfile(res.data))
      .catch(() => {
        setProfile(null)
        toast.error('Profile not found. Create your doctor profile first.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader size="lg" className="min-h-[40vh]" />

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Welcome back, Doctor</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-50">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Profile Status</p>
              <p className="font-bold text-neutral-900">{profile ? 'Active' : 'Not set up'}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">{"Today's appointments"}</p>
              <p className="font-bold text-neutral-900">{'\u2014'}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Prescriptions</p>
              <p className="font-bold text-neutral-900">Create new</p>
            </div>
          </div>
        </Card>
      </div>

      {profile && (
        <Card>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 text-lg">Your Profile</h3>
              <p className="text-sm text-neutral-500">{profile.specialization} {profile.qualification && `\u00B7 ${profile.qualification}`}</p>
            </div>
          </div>
          {profile.consultationFee && (
            <div className="inline-flex px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
              Fee: {profile.consultationFee}
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
