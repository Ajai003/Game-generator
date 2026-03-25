"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Gamepad2,
  CalendarDays,
  CreditCard,
  Activity,
  MessageSquare,
  MapPin,
  Home,
} from "lucide-react"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"

const navTabs = [
  { title: "Home", icon: Home },
  { title: "Games", icon: Gamepad2 },
  { type: "separator" as const },
  { title: "Book Slot", icon: CalendarDays },
  { title: "Pricing", icon: CreditCard },
  { type: "separator" as const },
  { title: "Live Status", icon: Activity },
  { title: "Reviews", icon: MessageSquare },
  { title: "Contact", icon: MapPin },
]

const sectionIds = ["hero", "games", null, "booking", "pricing", null, "status", "reviews", "contact"]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleTabChange = (index: number | null) => {
    if (index === null) return
    const sectionId = sectionIds[index]
    if (!sectionId) return

    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <div
        className={`transition-all duration-500 ${
          scrolled ? "scale-[0.95]" : "scale-100"
        }`}
      >
        <ExpandableTabs
          tabs={navTabs}
          activeColor="text-neon-cyan"
          onChange={handleTabChange}
          className="border-white/10 bg-black/60 backdrop-blur-xl shadow-lg shadow-black/30"
        />
      </div>
    </motion.nav>
  )
}
