import { useState } from 'react'
import toast from 'react-hot-toast'
import { Upload } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader } from '../../components/ui/Card'
import { labApi } from '../../api/services'

export function LabUpload() {
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState({
    patientUserId: '',
    bookingId: '',
    testName: '',
    testCode: '',
    reportUrl: '',
    values: [
      { parameterName: 'Hb', value: '14', unit: 'g/dL', referenceRange: '12-16', abnormal: false },
      { parameterName: 'WBC', value: '12000', unit: '/\u00B5L', referenceRange: '4000-11000', abnormal: true },
    ],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await labApi.uploadReport({
        ...body,
        patientUserId: body.patientUserId ? Number(body.patientUserId) : null,
        bookingId: body.bookingId ? Number(body.bookingId) : null,
      })
      toast.success('Report uploaded. Event published to lab-report-uploaded.')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Upload Report</h1>
        <p className="text-sm text-neutral-500 mt-1">Upload lab test results for patients</p>
      </div>

      <Card>
        <CardHeader title="Report details" subtitle="Enter the test results and patient information" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Patient user ID" type="number" value={body.patientUserId} onChange={(e) => setBody((b) => ({ ...b, patientUserId: e.target.value }))} />
            <Input label="Booking ID" type="number" value={body.bookingId} onChange={(e) => setBody((b) => ({ ...b, bookingId: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Test name" value={body.testName} onChange={(e) => setBody((b) => ({ ...b, testName: e.target.value }))} />
            <Input label="Test code" value={body.testCode} onChange={(e) => setBody((b) => ({ ...b, testCode: e.target.value }))} />
          </div>
          <Input label="Report URL (optional)" value={body.reportUrl} onChange={(e) => setBody((b) => ({ ...b, reportUrl: e.target.value }))} placeholder="https://..." />

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">Sample values are pre-filled (Hb, WBC). Abnormal values trigger alerts in the system.</p>
          </div>

          <Button type="submit" disabled={loading} className="self-start">
            <Upload className="w-4 h-4" />
            {loading ? 'Uploading...' : 'Upload report'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
