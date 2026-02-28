import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { AlertCircle, Phone, MapPin, ShieldAlert } from 'lucide-react'

export function PatientEmergency() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-900">Emergency</h1>
        <p className="text-sm text-neutral-500 mt-1">Quick access to emergency services</p>
      </div>

      <Card className="border-red-200/80 bg-red-50/20 overflow-visible" hover={false}>
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6 animate-glow-pulse" style={{ '--tw-shadow-color': 'rgba(239,68,68,0.15)' }}>
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900 mb-2">Emergency Assistance</h2>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Press the button below to trigger an emergency alert. The system will notify your emergency contacts and nearby hospitals.
          </p>
          <Button variant="danger" size="lg">
            <Phone className="w-5 h-5" />
            Call for help
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-neutral-500" />
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Nearby hospitals</h3>
            <p className="text-sm text-neutral-500">Location-based hospital finder</p>
          </div>
        </div>
        <div className="py-8 text-center">
          <p className="text-sm text-neutral-400">Nearby hospital list will be loaded from a location API.</p>
        </div>
      </Card>
    </div>
  )
}
