import { Card } from '../../components/ui/Card'
import { FlaskConical, Calendar, FileText } from 'lucide-react'

export function LabDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Lab Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage test bookings and lab reports</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-50">
              <FlaskConical className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Lab</p>
              <p className="font-bold text-neutral-900">Operations</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Test</p>
              <p className="font-bold text-neutral-900">Bookings</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Upload</p>
              <p className="font-bold text-neutral-900">Reports</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-100">
          <p className="text-sm text-primary-700 leading-relaxed">
            Manage test bookings and upload lab reports. Use the sidebar navigation to access Test Bookings and Upload Report sections.
          </p>
        </div>
      </Card>
    </div>
  )
}
