import { Card } from '../../components/ui/Card'
import { Users, Shield, Settings, BarChart3 } from 'lucide-react'

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
        <p className="text-sm text-neutral-500 mt-1">Platform management and oversight</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary-50">
              <Users className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Users</p>
              <p className="font-bold text-neutral-900">Management</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Profile</p>
              <p className="font-bold text-neutral-900">Verification</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50">
              <Settings className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">System</p>
              <p className="font-bold text-neutral-900">Configuration</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-sky-50">
              <BarChart3 className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Usage</p>
              <p className="font-bold text-neutral-900">Analytics</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-100">
          <p className="text-sm text-primary-700 leading-relaxed">
            User management, profile verification, specialties configuration, commission settings, and usage analytics will be available here. Admin API endpoints are under development.
          </p>
        </div>
      </Card>
    </div>
  )
}
