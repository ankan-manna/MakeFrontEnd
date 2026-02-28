import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card'
import { appointmentApi } from '../../api/services'
import { useAuth } from '../../context/AuthContext'

export function PatientBookAppointment() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [doctorProfileId, setDoctorProfileId] = useState('')
  const [slotId, setSlotId] = useState('')
  const [slotDate, setSlotDate] = useState('')
  const [slotStartTime, setSlotStartTime] = useState('')
  const [slotEndTime, setSlotEndTime] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user?.userId) return
    const body = {
      patientUserId: user.userId,
      doctorProfileId: Number(doctorProfileId),
      slotId: Number(slotId),
      slotDate,
      slotStartTime: slotStartTime || undefined,
      slotEndTime: slotEndTime || undefined,
      reason: reason || undefined,
    }
    setLoading(true)
    try {
      await appointmentApi.book(body)
      toast.success('Appointment booked')
      navigate('/patient/appointments')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-neutral-100 transition-soft"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-500" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Book appointment</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Use a known doctor profile ID and slot ID</p>
        </div>
      </div>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <Input label="Doctor profile ID" type="number" value={doctorProfileId} onChange={(e) => setDoctorProfileId(e.target.value)} required />
          <Input label="Slot ID" type="number" value={slotId} onChange={(e) => setSlotId(e.target.value)} required />
          <Input label="Slot date" type="date" value={slotDate} onChange={(e) => setSlotDate(e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start time" type="time" value={slotStartTime} onChange={(e) => setSlotStartTime(e.target.value)} />
            <Input label="End time" type="time" value={slotEndTime} onChange={(e) => setSlotEndTime(e.target.value)} />
          </div>
          <Input label="Reason (optional)" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Brief description..." />
          <Button type="submit" disabled={loading} className="mt-2">{loading ? 'Booking...' : 'Book appointment'}</Button>
        </form>
      </Card>
    </div>
  )
}
