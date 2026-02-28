import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Loader } from '../../components/ui/Loader'
import { pharmacyApi } from '../../api/services'
import { useAuth } from '../../context/AuthContext'
import { ShoppingCart } from 'lucide-react'

export function PatientMedicineOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.userId) return
    pharmacyApi
      .getOrdersByPatient(user.userId)
      .then((res) => setOrders(res.data || []))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false))
  }, [user?.userId])

  if (loading) return <Loader size="lg" className="min-h-[40vh]" />

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Medicine Orders</h1>
        <p className="text-sm text-neutral-500 mt-1">Track your pharmacy orders and deliveries</p>
      </div>
      <Card>
        {orders.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-neutral-300" />
            </div>
            <p className="font-medium text-neutral-700 mb-1">No orders yet</p>
            <p className="text-sm text-neutral-400">Orders are created when a prescription is sent to the pharmacy.</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {orders.map((o) => (
              <li key={o.id} className="py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-neutral-900">Order #{o.id}</p>
                    <p className="text-sm text-neutral-500">
                      Prescription: {o.prescriptionId || '\u2014'} {o.createdAt && `\u00B7 ${new Date(o.createdAt).toLocaleString()}`}
                    </p>
                    {o.items?.length > 0 && (
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {o.items.map((i) => i.medicineName).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <Badge>{o.status}</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
