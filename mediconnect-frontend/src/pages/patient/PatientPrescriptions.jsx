import { Card } from '../../components/ui/Card'
import { Pill } from 'lucide-react'

export function PatientPrescriptions() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Prescriptions</h1>
        <p className="text-sm text-neutral-500 mt-1">View prescriptions from your doctors</p>
      </div>
      <Card>
        <div className="py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Pill className="w-8 h-8 text-neutral-300" />
          </div>
          <p className="font-medium text-neutral-700 mb-1">No prescriptions yet</p>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">Prescriptions from your doctor visits will appear here. They are automatically sent to your pharmacy.</p>
        </div>
      </Card>
    </div>
  )
}
