import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Stethoscope } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader } from '../../components/ui/Card'
import { Loader } from '../../components/ui/Loader'
import { doctorApi } from '../../api/services'

export function DoctorProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ qualification: '', specialization: '', registrationNumber: '', bio: '', consultationFee: '' })

  useEffect(() => {
    doctorApi
      .getProfile()
      .then((res) => {
        setProfile(res.data)
        setForm({
          qualification: res.data.qualification || '',
          specialization: res.data.specialization || '',
          registrationNumber: res.data.registrationNumber || '',
          bio: res.data.bio || '',
          consultationFee: res.data.consultationFee || '',
        })
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (profile?.id) {
        await doctorApi.updateProfile(form)
        toast.success('Profile updated')
      } else {
        await doctorApi.createProfile(form)
        toast.success('Profile created')
      }
      setEditing(false)
      const { data } = await doctorApi.getProfile()
      setProfile(data)
      setForm({
        qualification: data.qualification || '',
        specialization: data.specialization || '',
        registrationNumber: data.registrationNumber || '',
        bio: data.bio || '',
        consultationFee: data.consultationFee || '',
      })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    }
  }

  if (loading) return <Loader size="lg" className="min-h-[40vh]" />

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Profile</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your doctor profile and qualifications</p>
      </div>

      <Card>
        {!profile && !editing ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-primary-600" />
            </div>
            <p className="font-medium text-neutral-700 mb-1">{"No profile yet"}</p>
            <p className="text-sm text-neutral-400 mb-6">Create your doctor profile to get started</p>
            <Button onClick={() => setEditing(true)}>Create profile</Button>
          </div>
        ) : editing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-md">
            <Input label="Qualification" value={form.qualification} onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))} />
            <Input label="Specialization" value={form.specialization} onChange={(e) => setForm((f) => ({ ...f, specialization: e.target.value }))} />
            <Input label="Registration number" value={form.registrationNumber} onChange={(e) => setForm((f) => ({ ...f, registrationNumber: e.target.value }))} />
            <Input label="Bio" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
            <Input label="Consultation fee" value={form.consultationFee} onChange={(e) => setForm((f) => ({ ...f, consultationFee: e.target.value }))} />
            <div className="flex gap-3 mt-2">
              <Button type="submit">Save profile</Button>
              <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 text-lg">{profile.specialization || 'Doctor'}</p>
                <p className="text-sm text-neutral-500">{profile.qualification}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <p className="text-xs text-neutral-400 font-medium">Registration</p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">{profile.registrationNumber || '\u2014'}</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <p className="text-xs text-neutral-400 font-medium">Consultation fee</p>
                <p className="text-sm font-semibold text-neutral-900 mt-0.5">{profile.consultationFee || '\u2014'}</p>
              </div>
            </div>
            {profile.bio && <p className="text-sm text-neutral-600 mb-4">{profile.bio}</p>}
            <Button variant="outline" onClick={() => setEditing(true)}>Edit profile</Button>
          </div>
        )}
      </Card>
    </div>
  )
}
