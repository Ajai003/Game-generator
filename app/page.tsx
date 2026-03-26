import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import GameCategories from "@/components/game-categories"
import SlotBooking from "@/components/slot-booking"
import PricingPlans from "@/components/pricing-plans"
import LiveStatus from "@/components/live-status"
import Testimonials from "@/components/testimonials"
import LocationContact from "@/components/location-contact"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />

      {/* Sections with subtle dividers */}
      <div className="relative">
        {/* Ambient glow orbs */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-neon-purple/3 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-neon-cyan/3 rounded-full blur-[120px] animate-pulse-slow" />
        </div>

        <div className="relative z-10">
          <GameCategories />

          {/* Divider */}
          <div className="mx-auto max-w-xs h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <SlotBooking />

          <div className="mx-auto max-w-xs h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <PricingPlans />

          <div className="mx-auto max-w-xs h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <LiveStatus />

          <div className="mx-auto max-w-xs h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <Testimonials />

          <div className="mx-auto max-w-xs h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          <LocationContact />
        </div>
      </div>

      <Footer />
    </main>
  )
}
