"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Gamepad2, Clock, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    icon: Users,
    label: "Available Seats",
    value: 24,
    suffix: "",
    color: "text-green-400",
    dotColor: "bg-green-400",
    glowColor: "glow-green",
  },
  {
    icon: Gamepad2,
    label: "Active Players",
    value: 42,
    suffix: "",
    color: "text-neon-cyan",
    dotColor: "bg-neon-cyan",
    glowColor: "glow-cyan",
  },
  {
    icon: Clock,
    label: "Avg Wait Time",
    value: 8,
    suffix: " min",
    color: "text-neon-blue",
    dotColor: "bg-neon-blue",
    glowColor: "glow-blue",
  },
  {
    icon: Trophy,
    label: "Games Today",
    value: 156,
    suffix: "",
    color: "text-neon-purple",
    dotColor: "bg-neon-purple",
    glowColor: "glow-purple",
  },
]

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number
  suffix: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.round(eased * target)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function LiveStatus() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="status" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-neon-cyan to-neon-blue bg-clip-text text-transparent">
              Live Status
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">
            Real-time updates from the gaming floor.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            >
              <Card
                className={`group glass border-white/5 hover:border-white/15 transition-all duration-500 hover:scale-[1.03] ${stat.glowColor}`}
              >
                <CardContent className="p-6 text-center">
                  {/* Pulsing Dot */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span
                      className={`relative flex h-2.5 w-2.5`}
                    >
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full ${stat.dotColor} opacity-75 animate-ping`}
                      />
                      <span
                        className={`relative inline-flex h-2.5 w-2.5 rounded-full ${stat.dotColor}`}
                      />
                    </span>
                    <span className="text-xs text-white/40 uppercase tracking-wider">
                      Live
                    </span>
                  </div>

                  {/* Icon */}
                  <stat.icon
                    className={`h-8 w-8 mx-auto mb-3 ${stat.color} transition-transform duration-500 group-hover:scale-110`}
                  />

                  {/* Counter */}
                  <div
                    className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}
                  >
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      inView={inView}
                    />
                  </div>

                  <p className="text-xs text-white/50">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
