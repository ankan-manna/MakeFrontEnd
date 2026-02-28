import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Plus, Package } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardHeader } from '../../components/ui/Card'
import { Loader } from '../../components/ui/Loader'
import { pharmacyApi } from '../../api/services'

export function PharmacistInventory() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ medicineSku: '', medicineName: '', quantity: '', unit: '', pricePerUnit: '' })

  useEffect(() => {
    pharmacyApi
      .listInventory()
      .then((res) => setList(res.data || []))
      .catch(() => toast.error('Failed to load inventory'))
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setAdding(true)
    try {
      await pharmacyApi.addInventory({
        medicineSku: form.medicineSku.trim(),
        medicineName: form.medicineName.trim(),
        quantity: form.quantity ? Number(form.quantity) : 0,
        unit: form.unit.trim() || undefined,
        pricePerUnit: form.pricePerUnit ? Number(form.pricePerUnit) : undefined,
      })
      toast.success('Item added')
      setForm({ medicineSku: '', medicineName: '', quantity: '', unit: '', pricePerUnit: '' })
      const { data } = await pharmacyApi.listInventory()
      setList(data || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add')
    } finally {
      setAdding(false)
    }
  }

  if (loading) return <Loader size="lg" className="min-h-[40vh]" />

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Inventory</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your pharmacy stock</p>
      </div>

      <Card>
        <CardHeader title="Add new item" subtitle="Add medicine to your inventory" />
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4 items-end">
          <Input label="SKU" value={form.medicineSku} onChange={(e) => setForm((f) => ({ ...f, medicineSku: e.target.value }))} required />
          <Input label="Name" value={form.medicineName} onChange={(e) => setForm((f) => ({ ...f, medicineName: e.target.value }))} />
          <Input label="Quantity" type="number" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} />
          <Input label="Unit" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} />
          <Input label="Price/unit" type="number" step="0.01" value={form.pricePerUnit} onChange={(e) => setForm((f) => ({ ...f, pricePerUnit: e.target.value }))} />
          <Button type="submit" disabled={adding}>
            <Plus className="w-4 h-4" />
            {adding ? 'Adding...' : 'Add'}
          </Button>
        </form>
      </Card>

      <Card>
        <CardHeader title="Current inventory" subtitle={`${list.length} items in stock`} />
        {list.length === 0 ? (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-neutral-300" />
            </div>
            <p className="text-sm text-neutral-500">No items yet. Add your first item above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">SKU</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Qty</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Unit</th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody>
                {list.map((i) => (
                  <tr key={i.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-soft">
                    <td className="py-3 px-3 font-medium text-neutral-900">{i.medicineSku}</td>
                    <td className="py-3 px-3 text-neutral-600">{i.medicineName}</td>
                    <td className="py-3 px-3 text-neutral-600">{i.quantity}</td>
                    <td className="py-3 px-3 text-neutral-600">{i.unit}</td>
                    <td className="py-3 px-3 text-neutral-600">{i.pricePerUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
