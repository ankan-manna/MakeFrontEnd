import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Calendar, Plus } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Loader } from '../../components/ui/Loader'
import { appointmentApi } from '../../api/services'
import { useAuth } from '../../context/AuthContext'

const STATUS_VARIANTS = {
  SCHEDULED: 'primary',
  CONFIRMED: 'primary',
  COMPLETED: 'success',
  CANCELLED: 'default',
  NO_SHOW: 'warning',
  EXPIRED: 'default',
}

export function PatientAppointments() {
  const { user } = useAuth()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.userId) return
    appointmentApi
      .getByPatient(user.userId)
      .then((res) => setList(res.data || []))
      .catch(() => toast.error('Failed to load appointments'))
      .finally(() => setLoading(false))
  }, [user?.userId])

  if (loading) return <Loader size="lg" className="min-h-[40vh]" />

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900">Appointments</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your upcoming and past appointments</p>
        </div>
        <Link to="/patient/book-appointment">
          <Button variant="primary-gradient">
            <Plus className="w-4 h-4" />
            Book appointment
          </Button>
        </Link>
      </div>

      <Card>
        {list.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-neutral-300" />
            </div>
            <p className="font-semibold text-neutral-700 mb-1">No appointments yet</p>
            <p className="text-sm text-neutral-400">Book your first appointment from the doctor search.</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {list.map((a) => (
              <li key={a.id} className="py-4 flex flex-wrap items-center justify-between gap-3 hover:bg-neutral-50/50 px-1 -mx-1 rounded-xl transition-soft">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">Doctor profile #{a.doctorProfileId}</p>
                    <p className="text-sm text-neutral-500">
                      {a.slotDate} {a.slotStartTime} - {a.slotEndTime}
                      {a.reason && ` \u00B7 ${a.reason}`}
                    </p>
                  </div>
                </div>
                <Badge variant={STATUS_VARIANTS[a.status] || 'default'}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
