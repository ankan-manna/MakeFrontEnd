import { Link } from 'react-router-dom'
import { Stethoscope, Calendar, FileText, Shield, Users, Zap, ArrowRight, Heart, Activity, Clock, Star, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/Button'

function StatCard({ value, label, icon: Icon }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-200/60 shadow-soft hover-lift">
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
          <Icon className="w-5 h-5 text-primary-600" />
        </div>
      )}
      <p className="stat-value">{value}</p>
      <p className="mt-1.5 text-sm text-neutral-500 font-medium">{label}</p>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, text, accent, index }) {
  return (
    <div
      className="group relative p-6 rounded-2xl border border-neutral-200/60 bg-white hover:border-primary-200 hover:shadow-card-hover transition-smooth overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Subtle hover gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(51,102,255,0.02)_0%,rgba(6,196,175,0.02)_100%)] opacity-0 group-hover:opacity-100 transition-smooth" />
      <div className="relative">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${accent} mb-4 transition-smooth group-hover:scale-110 group-hover:shadow-sm`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-neutral-900 text-base">{title}</h3>
        <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function StepCard({ number, title, text }) {
  return (
    <div className="flex gap-5 items-start group">
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-primary-500/25 group-hover:scale-110 transition-smooth">
        {number}
      </div>
      <div>
        <h3 className="font-semibold text-neutral-900 text-base">{title}</h3>
        <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

function TestimonialCard({ name, role, quote }) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-neutral-200/60 shadow-soft hover-lift">
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-4">{`"${quote}"`}</p>
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="text-sm font-bold text-primary-700">{name[0]}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">{name}</p>
          <p className="text-xs text-neutral-400">{role}</p>
        </div>
      </div>
    </div>
  )
}

export function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        {/* Background mesh gradient */}
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        {/* Top glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(51,102,255,0.1)_0%,transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 lg:pt-32 lg:pb-36">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 text-primary-700 text-sm font-medium mb-8 animate-fade-in shadow-sm">
              <Sparkles className="w-4 h-4" />
              Integrated Digital Healthcare Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.08] animate-slide-up">
              Your health,{' '}
              <span className="text-gradient">connected</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-100">
              Book appointments, manage prescriptions, view lab reports, and track your health -- all in one seamless platform designed for modern healthcare.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 animate-slide-up animation-delay-200">
              <Link to="/register">
                <Button size="lg" variant="primary-gradient">
                  Get started free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="white" size="lg">Sign in to your account</Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-400 animate-fade-in animation-delay-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-neutral-50/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <StatCard value="10K+" label="Active patients" icon={Users} />
            <StatCard value="500+" label="Verified doctors" icon={Stethoscope} />
            <StatCard value="50K+" label="Appointments booked" icon={Calendar} />
            <StatCard value="99.9%" label="Platform uptime" icon={Shield} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(6,196,175,0.04)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold tracking-wide uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
              Everything you need for modern healthcare
            </h2>
            <p className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto">
              One platform connecting patients, doctors, pharmacies, and labs seamlessly.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={Calendar}
              title="Easy appointment booking"
              text="Find doctors by specialty, view available slots, and book appointments in just a few clicks."
              accent="bg-primary-50 text-primary-600"
              index={0}
            />
            <FeatureCard
              icon={FileText}
              title="Unified health records"
              text="Your complete health timeline -- visits, prescriptions, and lab reports in one place."
              accent="bg-emerald-50 text-emerald-600"
              index={1}
            />
            <FeatureCard
              icon={Shield}
              title="Secure & private"
              text="Your data is protected with consent-based controls. You decide who can access your records."
              accent="bg-amber-50 text-amber-600"
              index={2}
            />
            <FeatureCard
              icon={Users}
              title="Trusted doctors"
              text="Verified profiles with specialties, qualifications, and consultation fees upfront."
              accent="bg-sky-50 text-sky-600"
              index={3}
            />
            <FeatureCard
              icon={Zap}
              title="Instant prescriptions"
              text="Prescriptions flow directly to your pharmacy. Order medicines and track delivery in real-time."
              accent="bg-secondary-50 text-secondary-600"
              index={4}
            />
            <FeatureCard
              icon={Stethoscope}
              title="Remote monitoring"
              text="Track vitals and risk scores with connected devices. Stay informed between visits."
              accent="bg-rose-50 text-rose-600"
              index={5}
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 lg:py-28 bg-neutral-50/80 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(51,102,255,0.04)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold tracking-wide uppercase mb-4">
                How it works
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
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
                  <div className="rounded-2xl bg-white border border-neutral-200/60 p-5 shadow-soft hover-lift">
                    <Activity className="w-8 h-8 text-primary-600 mb-3" />
                    <p className="text-sm font-semibold text-neutral-900">Risk Assessment</p>
                    <p className="text-xs text-neutral-500 mt-1">AI-powered health risk scoring</p>
                    <div className="mt-3 h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <div className="h-full rounded-full bg-primary-500 w-1/3 transition-all duration-1000" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white border border-neutral-200/60 p-5 shadow-soft hover-lift">
                    <Clock className="w-8 h-8 text-secondary-500 mb-3" />
                    <p className="text-sm font-semibold text-neutral-900">Appointments</p>
                    <p className="text-xs text-neutral-500 mt-1">Dr. Smith - Tomorrow 10:00 AM</p>
                    <div className="mt-3 inline-flex px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/80">Confirmed</div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="rounded-2xl bg-white border border-neutral-200/60 p-5 shadow-soft hover-lift">
                    <FileText className="w-8 h-8 text-amber-500 mb-3" />
                    <p className="text-sm font-semibold text-neutral-900">Lab Reports</p>
                    <p className="text-xs text-neutral-500 mt-1">Blood work results ready</p>
                    <div className="mt-3 inline-flex px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-200/80">View Report</div>
                  </div>
                  <div className="rounded-2xl bg-white border border-neutral-200/60 p-5 shadow-soft hover-lift">
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

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold tracking-wide uppercase mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
              Trusted by healthcare professionals
            </h2>
            <p className="mt-4 text-lg text-neutral-500 max-w-2xl mx-auto">
              See what doctors and patients are saying about MediConnect.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <TestimonialCard
              name="Dr. Priya Sharma"
              role="Cardiologist"
              quote="MediConnect has streamlined my practice. Managing appointments and prescriptions is effortless now."
            />
            <TestimonialCard
              name="Rahul Mehta"
              role="Patient"
              quote="I can book appointments, see my lab results, and track my health all from one app. Incredible experience."
            />
            <TestimonialCard
              name="Dr. Anjali Verma"
              role="General Physician"
              quote="The prescription workflow is seamless. My patients get their medicines faster and I have full visibility."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-neutral-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-cta-gradient p-10 sm:p-16 text-center overflow-hidden noise-overlay">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,102,255,0.2),transparent_70%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(6,196,175,0.1)_0%,transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ready to transform your healthcare?
              </h2>
              <p className="mt-4 text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
                Join thousands of patients and doctors who trust MediConnect for seamless healthcare management.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" variant="primary-gradient">
                    Create free account
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="border-neutral-600 text-neutral-300 hover:border-neutral-400 hover:text-white hover:bg-neutral-800/50">
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neutral-200/60 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-neutral-900 font-bold">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
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
