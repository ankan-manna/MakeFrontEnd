import { Card } from '../../components/ui/Card'
import { FileText, ShoppingCart, BarChart3 } from 'lucide-react'

export function PharmacistDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Pharmacist Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage prescriptions and inventory</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-50">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Incoming</p>
              <p className="font-bold text-neutral-900">Prescriptions</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-secondary-50">
              <ShoppingCart className="w-5 h-5 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Active</p>
              <p className="font-bold text-neutral-900">Orders</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50">
              <BarChart3 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Inventory</p>
              <p className="font-bold text-neutral-900">Management</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-100">
          <p className="text-sm text-primary-700 leading-relaxed">
            Incoming prescriptions are received via Kafka. The pharmacy service creates orders automatically.
            Use the sidebar to manage inventory and view prescription orders.
          </p>
        </div>
      </Card>
    </div>
  )
}
