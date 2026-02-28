import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Pill,
  FlaskConical,
  ShoppingCart,
  Activity,
  Radio,
  AlertCircle,
  User,
  Menu,
  X,
  Bell,
  LogOut,
  Stethoscope,
  ChevronRight,
  Search,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ROLES, ROLE_LABELS } from '../../constants'

const patientNav = [
  { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/patient/appointments', label: 'Appointments', icon: Calendar },
  { to: '/patient/health-records', label: 'Health Records', icon: FileText },
  { to: '/patient/prescriptions', label: 'Prescriptions', icon: Pill },
  { to: '/patient/lab-reports', label: 'Lab Reports', icon: FlaskConical },
  { to: '/patient/medicine-orders', label: 'Medicine Orders', icon: ShoppingCart },
  { to: '/patient/risk-assessment', label: 'Risk Assessment', icon: Activity },
  { to: '/patient/remote-monitoring', label: 'Remote Monitoring', icon: Radio },
  { to: '/patient/emergency', label: 'Emergency', icon: AlertCircle },
  { to: '/patient/profile', label: 'Profile', icon: User },
]

const doctorNav = [
  { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/doctor/appointments', label: 'Appointments', icon: Calendar },
  { to: '/doctor/patient-records', label: 'Patient Records', icon: FileText },
  { to: '/doctor/prescriptions', label: 'Prescriptions', icon: Pill },
  { to: '/doctor/availability', label: 'Availability', icon: Calendar },
  { to: '/doctor/profile', label: 'Profile', icon: User },
]

const pharmacistNav = [
  { to: '/pharmacist/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pharmacist/prescriptions', label: 'Incoming Prescriptions', icon: FileText },
  { to: '/pharmacist/inventory', label: 'Inventory', icon: Pill },
]

const labNav = [
  { to: '/lab/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/lab/bookings', label: 'Test Bookings', icon: Calendar },
  { to: '/lab/upload', label: 'Upload Report', icon: FileText },
]

const adminNav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'User Management', icon: User },
]

function getNav(role) {
  if (role === ROLES.PATIENT) return patientNav
  if (role === ROLES.DOCTOR) return doctorNav
  if (role === ROLES.PHARMACIST) return pharmacistNav
  if (role === ROLES.LAB_TECH) return labNav
  if (role === ROLES.ADMIN) return adminNav
  return []
}

function NavItem({ item, active, onClick }) {
  const Icon = item.icon
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-smooth group ${
        active
          ? 'bg-primary-50 text-primary-700 shadow-sm'
          : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
      }`}
    >
      <Icon className={`w-[18px] h-[18px] shrink-0 transition-smooth ${active ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'}`} />
      <span className="flex-1">{item.label}</span>
      {active && <ChevronRight className="w-4 h-4 text-primary-400" />}
    </Link>
  )
}

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const role = user?.roles?.[0]
  const navItems = getNav(role)

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-neutral-100">
        <Link to="/" className="flex items-center gap-2.5 text-neutral-900 font-bold text-base group">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center group-hover:bg-primary-700 transition-smooth">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          MediConnect
        </Link>
      </div>

      {/* Role badge */}
      <div className="px-4 pt-4 pb-2">
        <div className="px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-100">
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Logged in as</p>
          <p className="text-sm font-semibold text-neutral-700 mt-0.5">{ROLE_LABELS[role]}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            item={item}
            active={location.pathname === item.to}
            onClick={() => setSidebarOpen(false)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-neutral-100">
        <button
          onClick={() => { logout(); setSidebarOpen(false) }}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-smooth"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200/80 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-neutral-950/30 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-neutral-200/80 flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="absolute right-3 top-3">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-xl hover:bg-neutral-100 transition-soft"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>
        {sidebarContent}
      </aside>

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 h-16 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 transition-soft"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-neutral-600" />
            </button>
            {/* Search (visual only) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-100/80 text-neutral-400 text-sm min-w-[240px]">
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-2.5 rounded-xl hover:bg-neutral-100 transition-soft relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-neutral-500" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-500" />
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-xl hover:bg-neutral-100 transition-soft"
              >
                <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-700">
                    {(user?.email?.[0] || 'U').toUpperCase()}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-neutral-700 leading-tight">{user?.email}</p>
                  <p className="text-xs text-neutral-400">{ROLE_LABELS[role]}</p>
                </div>
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 py-1.5 bg-white rounded-xl shadow-elevated border border-neutral-200/80 z-20 animate-slide-up">
                    <Link
                      to={role === ROLES.PATIENT ? '/patient/profile' : role === ROLES.DOCTOR ? '/doctor/profile' : '#'}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-soft"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="w-4 h-4 text-neutral-400" />
                      Profile
                    </Link>
                    <div className="mx-3 my-1 border-t border-neutral-100" />
                    <button
                      onClick={() => { logout(); setProfileOpen(false) }}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-soft"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
