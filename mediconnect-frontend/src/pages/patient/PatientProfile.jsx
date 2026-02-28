import { useAuth } from '../../context/AuthContext'
import { Card } from '../../components/ui/Card'
import { ROLE_LABELS } from '../../constants'
import { User, Mail, Hash, Shield } from 'lucide-react'

export function PatientProfile() {
  const { user } = useAuth()
  const role = user?.roles?.[0]

  const fields = [
    { icon: Mail, label: 'Email', value: user?.email },
    { icon: Hash, label: 'User ID', value: user?.userId },
    { icon: Shield, label: 'Role', value: ROLE_LABELS[role] },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Profile</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your account details and preferences</p>
      </div>

      <Card>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
            <User className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900 text-lg">{user?.email}</p>
            <p className="text-sm text-neutral-500">{ROLE_LABELS[role]}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <div className="w-9 h-9 rounded-lg bg-white border border-neutral-200 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-neutral-500" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium">{label}</p>
                <p className="text-sm font-semibold text-neutral-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary-50/50 border border-primary-100">
          <p className="text-sm text-primary-700">Consent management: manage who can access your records from the settings panel.</p>
        </div>
      </Card>
    </div>
  )
}
