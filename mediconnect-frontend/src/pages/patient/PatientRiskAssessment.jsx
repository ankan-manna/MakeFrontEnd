import { useState, useEffect } from 'react'
import { Card } from '../../components/ui/Card'
import { Loader } from '../../components/ui/Loader'
import { patientApi } from '../../api/services'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Activity, AlertTriangle, TrendingUp } from 'lucide-react'

export function PatientRiskAssessment() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    patientApi
      .getDashboard()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader size="lg" className="min-h-[40vh]" />

  const riskScores = data?.riskScores || {}
  const chartData = [
    { name: 'Diabetes', value: (riskScores.DIABETES ?? 0) * 100 },
    { name: 'Heart', value: (riskScores.HEART ?? 0) * 100 },
    { name: 'Hypertension', value: (riskScores.HYPERTENSION ?? 0) * 100 },
  ]

  const riskCards = [
    { label: 'Diabetes', value: riskScores.DIABETES, icon: Activity, color: 'text-primary-600', bg: 'bg-primary-50', bar: 'bg-primary-500' },
    { label: 'Heart', value: riskScores.HEART, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', bar: 'bg-amber-500' },
    { label: 'Hypertension', value: riskScores.HYPERTENSION, icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-50', bar: 'bg-red-500' },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-900">Risk Assessment</h1>
        <p className="text-sm text-neutral-500 mt-1">AI-powered health risk scores from your monitoring data</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {riskCards.map(({ label, value, icon: Icon, color, bg, bar }) => {
          const pct = ((value ?? 0) * 100).toFixed(0)
          return (
            <Card key={label} className="group">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${bg} transition-smooth group-hover:scale-110`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className="text-sm font-medium text-neutral-500">{label}</p>
              </div>
              <p className={`text-3xl font-extrabold ${color}`}>{pct}%</p>
              <div className="mt-3 h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                <div className={`h-full rounded-full ${bar} transition-all duration-700`} style={{ width: `${pct}%` }} />
              </div>
            </Card>
          )
        })}
      </div>

      <Card>
        <h3 className="font-semibold text-neutral-900 mb-1">Score comparison</h3>
        <p className="text-sm text-neutral-500 mb-6">Visual overview of your risk scores</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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
              <Line type="monotone" dataKey="value" stroke="#3366ff" strokeWidth={2.5} dot={{ r: 5, fill: '#3366ff', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 7, fill: '#3366ff', stroke: '#eef4ff', strokeWidth: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
