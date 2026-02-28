import { Card } from '../../components/ui/Card'
import { Calendar } from 'lucide-react'

export function DoctorAppointments() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-900">Appointments</h1>
        <p className="text-sm text-neutral-500 mt-1">{"View and manage your patient appointments"}</p>
      </div>
      <Card>
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-neutral-300" />
          </div>
          <p className="font-semibold text-neutral-700 mb-1">Coming soon</p>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
            {"A future endpoint will return today's appointments by doctor. Stay tuned."}
          </p>
        </div>
      </Card>
    </div>
  )
}
