import { useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader } from '../../components/ui/Card'
import { doctorApi } from '../../api/services'

export function DoctorPrescriptions() {
  const [patientUserId, setPatientUserId] = useState('')
  const [appointmentId, setAppointmentId] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState([{ medicineName: '', dosage: '', frequency: '', duration: '', instructions: '' }])
  const [loading, setLoading] = useState(false)

  const addItem = () => setItems((prev) => [...prev, { medicineName: '', dosage: '', frequency: '', duration: '', instructions: '' }])
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index))

  const updateItem = (i, field, value) => {
    setItems((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!patientUserId.trim()) {
      toast.error('Patient user ID required')
      return
    }
    setLoading(true)
    try {
      await doctorApi.createPrescription({
        patientUserId: Number(patientUserId),
        appointmentId: appointmentId ? Number(appointmentId) : undefined,
        diagnosis: diagnosis || undefined,
        notes: notes || undefined,
        items: items.filter((x) => x.medicineName.trim()),
      })
      toast.success('Prescription created. Pharmacy will receive it via Kafka.')
      setPatientUserId('')
      setAppointmentId('')
      setDiagnosis('')
      setNotes('')
      setItems([{ medicineName: '', dosage: '', frequency: '', duration: '', instructions: '' }])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create prescription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Create Prescription</h1>
        <p className="text-sm text-neutral-500 mt-1">Write and send prescriptions to the pharmacy</p>
      </div>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Patient user ID" type="number" value={patientUserId} onChange={(e) => setPatientUserId(e.target.value)} required />
            <Input label="Appointment ID (optional)" type="number" value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} />
          </div>
          <Input label="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="Enter diagnosis..." />
          <Input label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." />

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-neutral-700">Medicines</label>
              <Button type="button" variant="ghost" size="sm" onClick={addItem}>
                <Plus className="w-4 h-4" />
                Add medicine
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <Input placeholder="Name" value={item.medicineName} onChange={(e) => updateItem(i, 'medicineName', e.target.value)} />
                    <Input placeholder="Dosage" value={item.dosage} onChange={(e) => updateItem(i, 'dosage', e.target.value)} />
                    <Input placeholder="Frequency" value={item.frequency} onChange={(e) => updateItem(i, 'frequency', e.target.value)} />
                    <Input placeholder="Duration" value={item.duration} onChange={(e) => updateItem(i, 'duration', e.target.value)} />
                    <div className="flex gap-2">
                      <Input placeholder="Instructions" value={item.instructions} onChange={(e) => updateItem(i, 'instructions', e.target.value)} className="flex-1" />
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(i)}
                          className="p-2.5 rounded-xl hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-soft self-end"
                          aria-label="Remove medicine"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="self-start mt-2">
            {loading ? 'Creating...' : 'Create prescription'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
