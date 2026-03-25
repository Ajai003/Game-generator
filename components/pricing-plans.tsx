"use client"

import { motion } from "framer-motion"
import { Check, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

const plans = [
  {
    name: "Starter",
    price: "₹199",
    period: "/ hour",
    desc: "Perfect for casual gamers",
    features: [
      "1 Player Station",
      "Standard Display",
      "Basic Headset",
      "Free Wi-Fi",
      "Beverage Included",
    ],
    highlighted: false,
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-white/5 hover:border-blue-500/30",
    glow: "hover:glow-blue",
  },
  {
    name: "Pro Gamer",
    price: "₹499",
    period: "/ hour",
    desc: "The ultimate gaming experience",
    features: [
      "Premium Station",
      "4K 240Hz Display",
      "Surround Sound Headset",
      "Priority Queue",
      "Snacks & Drinks",
      "Stream Setup",
    ],
    highlighted: true,
    gradient: "from-purple-500/30 to-pink-500/30",
    border: "border-neon-purple/40",
    glow: "glow-purple",
  },
  {
    name: "Party Pack",
    price: "₹1,499",
    period: "/ 3 hours",
    desc: "Group fun for up to 6 players",
    features: [
      "6 Player Stations",
      "Private Room",
      "All Consoles Access",
      "Tournament Mode",
      "Food Package",
      "Photo Booth",
    ],
    highlighted: false,
    gradient: "from-cyan-500/20 to-green-500/20",
    border: "border-white/5 hover:border-cyan-500/30",
    glow: "hover:glow-cyan",
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
} as const

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as const },
  },
} as const

export default function PricingPlans() {
  return (
    <section id="pricing" className="relative py-24 px-6">
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
            <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">
            Premium experiences at every price point.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={plan.highlighted ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card
                className={`group relative overflow-hidden glass transition-all duration-500 hover:scale-[1.02] ${plan.border} ${plan.glow} ${
                  plan.highlighted ? "ring-1 ring-neon-purple/20" : ""
                }`}
              >
                {/* Highlighted gradient bg */}
                {plan.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />
                )}

                <CardContent className="p-8 relative">
                  {/* Badge */}
                  {plan.highlighted && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-neon-purple to-neon-pink text-white border-0 shadow-lg shadow-neon-purple/30">
                      <Zap className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}

                  {/* Plan name */}
                  <h3 className="text-lg font-semibold text-white/80 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-white/40 mb-5">{plan.desc}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span
                      className={`text-4xl font-bold ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent"
                          : "text-white"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm text-white/40">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-white/60"
                      >
                        <Check
                          className={`h-4 w-4 flex-shrink-0 ${
                            plan.highlighted
                              ? "text-neon-purple"
                              : "text-neon-cyan/60"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <InteractiveHoverButton
                    text="Get Started"
                    className={`w-full py-3 rounded-full text-sm ${
                      plan.highlighted
                        ? "border-neon-purple/40 bg-black/40 text-white"
                        : "border-white/10 bg-black/20 text-white/80"
                    }`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
