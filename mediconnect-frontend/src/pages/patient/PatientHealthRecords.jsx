import { useState, useEffect } from 'react'
import { Card, CardHeader } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Loader } from '../../components/ui/Loader'
import { patientApi } from '../../api/services'
import { FileText } from 'lucide-react'

export function PatientHealthRecords() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    patientApi
      .getDashboard()
      .then((res) => setData(res.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader size="lg" className="min-h-[40vh]" />

  const timeline = data?.recentTimeline || []
  const filtered = filter === 'ALL' ? timeline : timeline.filter((e) => e.eventType === filter)
  const types = ['ALL', ...new Set(timeline.map((e) => e.eventType).filter(Boolean))]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Health Records</h1>
        <p className="text-sm text-neutral-500 mt-1">Your complete health timeline</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-smooth ${
              filter === t
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card>
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-neutral-300" />
            </div>
            <p className="font-medium text-neutral-700 mb-1">No records to show</p>
            <p className="text-sm text-neutral-400">Timeline events appear after appointments and lab reports.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {filtered.map((e) => (
              <li key={e.id} className="flex gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="shrink-0 w-1.5 rounded-full bg-primary-500 self-stretch" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm text-neutral-900">{e.title || e.eventType}</p>
                      {e.description && <p className="text-sm text-neutral-600 mt-1">{e.description}</p>}
                      <p className="text-xs text-neutral-400 mt-1.5">
                        {e.eventDate ? new Date(e.eventDate).toLocaleString() : ''} {e.sourceService && `\u00B7 ${e.sourceService}`}
                      </p>
                    </div>
                    <Badge variant="primary">{e.eventType}</Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
