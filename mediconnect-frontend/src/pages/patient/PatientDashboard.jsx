import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Calendar, Activity, FileText, AlertTriangle, TrendingUp, Shield } from 'lucide-react'
import { Card, CardHeader } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Loader } from '../../components/ui/Loader'
import { patientApi } from '../../api/services'

function MetricCard({ icon: Icon, label, value, accent, bgAccent }) {
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${bgAccent}`}>
          <Icon className={`w-5 h-5 ${accent}`} />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-neutral-500 truncate">{label}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-0.5">{value}</p>
        </div>
      </div>
    </Card>
  )
}

export function PatientDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    patientApi
      .getDashboard()
      .then((res) => {
        if (!cancelled) setData(res.data)
      })
      .catch(() => {
        if (!cancelled) toast.error('Failed to load dashboard')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  if (loading) return <Loader size="lg" className="min-h-[40vh]" />
  if (!data) return <p className="text-neutral-500">No data</p>

  const riskScores = data.riskScores || {}
  const recentTimeline = data.recentTimeline || []

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Your health overview at a glance</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={Activity}
          label="Diabetes risk"
          value={`${((riskScores.DIABETES ?? 0) * 100).toFixed(0)}%`}
          accent="text-primary-600"
          bgAccent="bg-primary-50"
        />
        <MetricCard
          icon={AlertTriangle}
          label="Heart risk"
          value={`${((riskScores.HEART ?? 0) * 100).toFixed(0)}%`}
          accent="text-amber-600"
          bgAccent="bg-amber-50"
        />
        <MetricCard
          icon={TrendingUp}
          label="Hypertension risk"
          value={`${((riskScores.HYPERTENSION ?? 0) * 100).toFixed(0)}%`}
          accent="text-red-500"
          bgAccent="bg-red-50"
        />
        <MetricCard
          icon={FileText}
          label="Timeline events"
          value={recentTimeline.length}
          accent="text-emerald-600"
          bgAccent="bg-emerald-50"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Recent health timeline" subtitle="Latest appointments and lab results" />
          {recentTimeline.length === 0 ? (
            <div className="py-8 text-center">
              <Calendar className="w-10 h-10 text-neutral-200 mx-auto mb-3" />
              <p className="text-neutral-500 text-sm">No recent events. Appointments and lab reports will appear here.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {recentTimeline.slice(0, 5).map((e) => (
                <li key={e.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-neutral-900 truncate">{e.title || e.eventType}</p>
                    <p className="text-xs text-neutral-400">{e.eventDate ? new Date(e.eventDate).toLocaleDateString() : ''}</p>
                  </div>
                  <Badge variant="primary">{e.eventType}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card>
          <CardHeader title="Active consents" subtitle="Data access permissions you have granted" />
          {(data.activeConsents || []).length === 0 ? (
            <div className="py-8 text-center">
              <Shield className="w-10 h-10 text-neutral-200 mx-auto mb-3" />
              <p className="text-neutral-500 text-sm">No active consents. Grant access to doctors or labs from Profile.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {data.activeConsents.map((c) => (
                <li key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                  <Badge variant="info" className="mr-2">{c.consentType}</Badge>
                  <span className="text-sm text-neutral-600">Granted to ID: {c.grantedToId}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
