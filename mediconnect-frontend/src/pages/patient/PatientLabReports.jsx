import { Card } from '../../components/ui/Card'
import { FlaskConical } from 'lucide-react'

export function PatientLabReports() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Lab Reports</h1>
        <p className="text-sm text-neutral-500 mt-1">View your lab test results and reports</p>
      </div>
      <Card>
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <FlaskConical className="w-8 h-8 text-neutral-300" />
          </div>
          <p className="font-medium text-neutral-700 mb-1">No lab reports yet</p>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">Lab reports uploaded by the lab will appear here once they are ready.</p>
        </div>
      </Card>
    </div>
  )
}
