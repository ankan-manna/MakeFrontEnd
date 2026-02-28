import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { Plus, Clock } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Loader } from '../../components/ui/Loader'
import { doctorApi } from '../../api/services'

export function DoctorAvailability() {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [creating, setCreating] = useState(false)
  const [slotDate, setSlotDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const loadSlots = useCallback(() => {
    if (!from || !to) return
    setLoading(true)
    doctorApi
      .getSlots(from, to)
      .then((res) => setSlots(res.data || []))
      .catch(() => toast.error('Failed to load slots'))
      .finally(() => setLoading(false))
  }, [from, to])

  useEffect(() => {
    const d = new Date()
    const f = d.toISOString().slice(0, 10)
    d.setDate(d.getDate() + 7)
    const t = d.toISOString().slice(0, 10)
    setFrom(f)
    setTo(t)
  }, [])

  useEffect(() => {
    if (from && to) loadSlots()
  }, [from, to, loadSlots])

  const handleCreateSlot = async (e) => {
    e.preventDefault()
    if (!slotDate || !startTime || !endTime) {
      toast.error('Date and times required')
      return
    }
    setCreating(true)
    try {
      await doctorApi.createSlot({ slotDate, startTime, endTime })
      toast.success('Slot created')
      setSlotDate('')
      setStartTime('')
      setEndTime('')
      loadSlots()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create slot')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Availability</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your time slots for appointments</p>
      </div>

      <Card>
        <CardHeader title="Your slots" subtitle="View and filter your availability" />
        <div className="flex flex-wrap gap-3 items-end mb-6">
          <Input label="From" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <Input label="To" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          <Button onClick={loadSlots} disabled={loading}>Load slots</Button>
        </div>
        {loading ? <Loader /> : (
          <div className="divide-y divide-neutral-100">
            {slots.length === 0 && (
              <div className="py-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-neutral-300" />
                </div>
                <p className="text-sm text-neutral-500">No slots in this range. Add one below.</p>
              </div>
            )}
            {slots.map((s) => (
              <div key={s.id} className="py-3 flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{s.slotDate}</p>
                  <p className="text-xs text-neutral-500">{s.startTime} - {s.endTime}</p>
                </div>
                <Badge variant={s.status === 'AVAILABLE' ? 'success' : 'default'}>{s.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <CardHeader title="Add new slot" subtitle="Create a new availability slot" />
        <form onSubmit={handleCreateSlot} className="flex flex-wrap gap-4 items-end">
          <Input label="Date" type="date" value={slotDate} onChange={(e) => setSlotDate(e.target.value)} required />
          <Input label="Start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          <Input label="End" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          <Button type="submit" disabled={creating}>
            <Plus className="w-4 h-4" />
            {creating ? 'Adding...' : 'Add slot'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
