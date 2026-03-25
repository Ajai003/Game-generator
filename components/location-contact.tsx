"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "123 Gaming Street, Tech Hub, Bangalore 560001",
    color: "text-neon-cyan",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    color: "text-neon-purple",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@gamecenter.in",
    color: "text-neon-blue",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Sun: 10:00 AM - 11:00 PM",
    color: "text-green-400",
  },
]

export default function LocationContact() {
  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Find Us
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">
            Visit us at our premium gaming facility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="glass border-white/5 overflow-hidden h-full min-h-[320px]">
              <CardContent className="p-0 relative h-full">
                {/* Fake map background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#111827] to-[#0f172a]">
                  {/* Grid lines */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Location pin */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative"
                    >
                      <Navigation className="h-12 w-12 text-neon-cyan rotate-0" />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-neon-cyan/20 rounded-full blur-sm" />
                    </motion.div>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-neon-cyan/10 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-neon-cyan/5 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-neon-cyan/[0.03] rounded-full" />
                </div>

                {/* Label */}
                <div className="absolute bottom-4 left-4 glass rounded-lg px-3 py-1.5">
                  <p className="text-xs text-white/50">
                    Interactive map coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="glass border-white/5 hover:border-white/10 transition-all duration-300 group">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-white/80">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
