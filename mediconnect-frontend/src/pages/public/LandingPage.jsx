import { Link } from 'react-router-dom'
import { Stethoscope, Calendar, FileText, Shield, Users, Zap, ArrowRight, Heart, Activity, Clock } from 'lucide-react'
import { Button } from '../../components/ui/Button'

function StatCard({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-3xl sm:text-4xl font-bold text-neutral-900">{value}</p>
      <p className="mt-1 text-sm text-neutral-500">{label}</p>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, text, accent }) {
  return (
    <div className="group relative p-6 rounded-2xl border border-neutral-200/80 bg-white hover:border-primary-200 hover:shadow-card transition-smooth">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${accent} mb-4 transition-smooth group-hover:scale-105`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-neutral-900 text-base">{title}</h3>
      <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{text}</p>
    </div>
  )
}

function StepCard({ number, title, text }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center justify-center">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1 text-sm text-neutral-500 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

export function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(51,102,255,0.08),transparent)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-8 animate-fade-in">
              <Heart className="w-4 h-4" />
              Integrated Digital Healthcare Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight leading-[1.1] animate-slide-up">
              Your health,{' '}
              <span className="text-gradient">connected</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
              Book appointments, manage prescriptions, view lab reports, and track your health — all in one seamless platform.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link to="/register">
                <Button size="lg" variant="primary-gradient">
                  Get started free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">Sign in to your account</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-neutral-200/80 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <StatCard value="10K+" label="Active patients" />
            <StatCard value="500+" label="Verified doctors" />
            <StatCard value="50K+" label="Appointments booked" />
            <StatCard value="99.9%" label="Platform uptime" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Everything you need for modern healthcare
            </h2>
            <p className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto">
              One platform connecting patients, doctors, pharmacies, and labs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Calendar}
              title="Easy appointment booking"
              text="Find doctors by specialty, view available slots, and book appointments in just a few clicks."
              accent="bg-primary-50 text-primary-600"
            />
            <FeatureCard
              icon={FileText}
              title="Unified health records"
              text="Your complete health timeline — visits, prescriptions, and lab reports in one place."
              accent="bg-emerald-50 text-emerald-600"
            />
            <FeatureCard
              icon={Shield}
              title="Secure & private"
              text="Your data is protected with consent-based controls. You decide who can access your records."
              accent="bg-amber-50 text-amber-600"
            />
            <FeatureCard
              icon={Users}
              title="Trusted doctors"
              text="Verified profiles with specialties, qualifications, and consultation fees upfront."
              accent="bg-sky-50 text-sky-600"
            />
            <FeatureCard
              icon={Zap}
              title="Instant prescriptions"
              text="Prescriptions flow directly to your pharmacy. Order medicines and track delivery in real-time."
              accent="bg-secondary-50 text-secondary-600"
            />
            <FeatureCard
              icon={Stethoscope}
              title="Remote monitoring"
              text="Track vitals and risk scores with connected devices. Stay informed between visits."
              accent="bg-rose-50 text-rose-600"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 lg:py-28 bg-neutral-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">How it works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900">
                Healthcare in three simple steps
              </h2>
              <p className="mt-4 text-lg text-neutral-500">
                Getting started with MediConnect takes less than a minute.
              </p>
              <div className="mt-10 flex flex-col gap-8">
                <StepCard number="1" title="Create your account" text="Sign up as a patient, doctor, pharmacist, or lab technician. It only takes 30 seconds." />
                <StepCard number="2" title="Book or manage" text="Patients can book appointments and view records. Doctors manage their availability and prescriptions." />
                <StepCard number="3" title="Stay connected" text="Get real-time updates, track your health, and manage prescriptions from anywhere." />
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-soft">
                    <Activity className="w-8 h-8 text-primary-600 mb-3" />
                    <p className="text-sm font-semibold text-neutral-900">Risk Assessment</p>
                    <p className="text-xs text-neutral-500 mt-1">AI-powered health risk scoring</p>
                    <div className="mt-3 h-2 rounded-full bg-neutral-100">
                      <div className="h-full rounded-full bg-primary-500 w-1/3" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-soft">
                    <Clock className="w-8 h-8 text-secondary-500 mb-3" />
                    <p className="text-sm font-semibold text-neutral-900">Appointments</p>
                    <p className="text-xs text-neutral-500 mt-1">Dr. Smith - Tomorrow 10:00 AM</p>
                    <div className="mt-3 inline-flex px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">Confirmed</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-soft">
                    <FileText className="w-8 h-8 text-amber-500 mb-3" />
                    <p className="text-sm font-semibold text-neutral-900">Lab Reports</p>
                    <p className="text-xs text-neutral-500 mt-1">Blood work results ready</p>
                    <div className="mt-3 inline-flex px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 text-xs font-medium">View Report</div>
                  </div>
                  <div className="rounded-2xl bg-white border border-neutral-200 p-5 shadow-soft">
                    <Heart className="w-8 h-8 text-rose-500 mb-3" />
                    <p className="text-sm font-semibold text-neutral-900">Vitals</p>
                    <p className="text-xs text-neutral-500 mt-1">BP: 120/80 mmHg</p>
                    <p className="text-xs text-neutral-500">Heart rate: 72 bpm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-neutral-950 p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,102,255,0.15),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to transform your healthcare?
              </h2>
              <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto">
                Join thousands of patients and doctors who trust MediConnect for seamless healthcare management.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" variant="primary-gradient">
                    Create free account
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white hover:bg-neutral-800">
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-900 font-semibold">
            <Stethoscope className="w-5 h-5 text-primary-600" />
            MediConnect
          </div>
          <p className="text-sm text-neutral-400">
            {'© '}{new Date().getFullYear()} MediConnect. Integrated Digital Healthcare Platform.
          </p>
        </div>
      </footer>
    </>
  )
}
