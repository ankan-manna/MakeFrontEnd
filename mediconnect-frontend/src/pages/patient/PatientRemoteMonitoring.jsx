import { Card } from '../../components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Heart, Activity, Droplets } from 'lucide-react'

const placeholderData = [
  { name: 'Mon', value: 120 },
  { name: 'Tue', value: 118 },
  { name: 'Wed', value: 125 },
  { name: 'Thu', value: 122 },
  { name: 'Fri', value: 119 },
  { name: 'Sat', value: 121 },
  { name: 'Sun', value: 117 },
]

function VitalCard({ icon: Icon, label, value, status, accent, bgAccent }) {
  return (
    <Card className="group">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${bgAccent} transition-smooth group-hover:scale-110`}>
          <Icon className={`w-4 h-4 ${accent}`} />
        </div>
        <p className="text-sm text-neutral-500">{label}</p>
      </div>
      <p className="text-2xl font-extrabold text-neutral-900">{value}</p>
      <div className="mt-2 inline-flex px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">{status}</div>
    </Card>
  )
}

export function PatientRemoteMonitoring() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-900">Remote Monitoring</h1>
        <p className="text-sm text-neutral-500 mt-1">Track vitals from your connected devices</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <VitalCard icon={Heart} label="Blood Pressure" value="120/80" status="Normal range" accent="text-rose-600" bgAccent="bg-rose-50" />
        <VitalCard icon={Activity} label="Heart Rate" value="72 bpm" status="Normal range" accent="text-primary-600" bgAccent="bg-primary-50" />
        <VitalCard icon={Droplets} label="Glucose" value="95 mg/dL" status="Normal range" accent="text-secondary-600" bgAccent="bg-secondary-50" />
      </div>

      <Card>
        <h3 className="font-semibold text-neutral-900 mb-1">Blood Pressure Trend</h3>
        <p className="text-sm text-neutral-500 mb-6">Systolic readings over the past week (sample data)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placeholderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 13, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 13, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -3px rgba(0,0,0,0.08)',
                  fontSize: 13,
                }}
              />
              <Bar dataKey="value" fill="#06c4af" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
