import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Calendar, Search } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { labApi } from '../../api/services'

export function LabBookings() {
  const [patientUserId, setPatientUserId] = useState('')
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ patientUserId: '', testName: '', testCode: '', bookingDate: '', slotTime: '', status: 'SCHEDULED' })

  const loadBookings = () => {
    if (!patientUserId) return
    setLoading(true)
    labApi
      .getBookingsByPatient(Number(patientUserId))
      .then((res) => setList(res.data || []))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await labApi.createBooking({
        patientUserId: Number(form.patientUserId),
        testName: form.testName,
        testCode: form.testCode,
        bookingDate: form.bookingDate || undefined,
        slotTime: form.slotTime || undefined,
        status: form.status,
      })
      toast.success('Booking created')
      setForm({ patientUserId: '', testName: '', testCode: '', bookingDate: '', slotTime: '', status: 'SCHEDULED' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Test Bookings</h1>
        <p className="text-sm text-neutral-500 mt-1">Create and manage lab test bookings</p>
      </div>

      <Card>
        <CardHeader title="Create booking" subtitle="Schedule a new lab test" />
        <form onSubmit={handleCreate} className="flex flex-wrap gap-4 items-end">
          <Input label="Patient user ID" type="number" value={form.patientUserId} onChange={(e) => setForm((f) => ({ ...f, patientUserId: e.target.value }))} required />
          <Input label="Test name" value={form.testName} onChange={(e) => setForm((f) => ({ ...f, testName: e.target.value }))} />
          <Input label="Test code" value={form.testCode} onChange={(e) => setForm((f) => ({ ...f, testCode: e.target.value }))} />
          <Input label="Date" type="date" value={form.bookingDate} onChange={(e) => setForm((f) => ({ ...f, bookingDate: e.target.value }))} />
          <Input label="Time" type="time" value={form.slotTime} onChange={(e) => setForm((f) => ({ ...f, slotTime: e.target.value }))} />
          <Button type="submit" disabled={loading}>
            <Plus className="w-4 h-4" />
            Create
          </Button>
        </form>
      </Card>

      <Card>
        <CardHeader title="Search bookings" subtitle="Look up bookings by patient" />
        <div className="flex gap-3 items-end mb-6">
          <Input label="Patient user ID" type="number" value={patientUserId} onChange={(e) => setPatientUserId(e.target.value)} />
          <Button onClick={loadBookings} disabled={loading}>
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
        {list.length === 0 && !loading && (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-neutral-300" />
            </div>
            <p className="text-sm text-neutral-500">Enter patient ID and click Search to view bookings.</p>
          </div>
        )}
        {list.length > 0 && (
          <ul className="divide-y divide-neutral-100">
            {list.map((b) => (
              <li key={b.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{b.testName} ({b.testCode})</p>
                    <p className="text-xs text-neutral-500">{b.bookingDate}</p>
                  </div>
                </div>
                <Badge variant={b.status === 'SCHEDULED' ? 'primary' : 'success'}>{b.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
