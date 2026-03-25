"use client"

import { motion, type Variants } from "framer-motion"
import {
  Gamepad2,
  Sword,
  Monitor,
  Headphones,
  Trophy,
  Users,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    icon: Gamepad2,
    name: "Console Gaming",
    desc: "PS5, Xbox Series X & Nintendo Switch",
    color: "from-blue-500 to-cyan-400",
    glow: "group-hover:glow-blue",
  },
  {
    icon: Monitor,
    name: "PC Gaming",
    desc: "RTX 4090 rigs with 240Hz displays",
    color: "from-purple-500 to-pink-400",
    glow: "group-hover:glow-purple",
  },
  {
    icon: Headphones,
    name: "VR Experience",
    desc: "Meta Quest 3 & PlayStation VR2",
    color: "from-cyan-400 to-green-400",
    glow: "group-hover:glow-cyan",
  },
  {
    icon: Sword,
    name: "Retro Arcade",
    desc: "Classic cabinets & pinball machines",
    color: "from-orange-500 to-yellow-400",
    glow: "group-hover:glow-pink",
  },
  {
    icon: Trophy,
    name: "Tournaments",
    desc: "Weekly competitions with cash prizes",
    color: "from-yellow-400 to-amber-500",
    glow: "group-hover:glow-cyan",
  },
  {
    icon: Users,
    name: "Party Rooms",
    desc: "Private rooms for groups of 4-12",
    color: "from-pink-500 to-rose-400",
    glow: "group-hover:glow-pink",
  },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
}

export default function GameCategories() {
  return (
    <section id="games" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
              Game Categories
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">
            Choose your arena. Every experience is crafted for maximum immersion.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.name} variants={cardVariants}>
              <Card
                className={`group relative overflow-hidden glass cursor-pointer transition-all duration-500 hover:scale-[1.03] border-white/5 hover:border-white/15 ${cat.glow}`}
              >
                <CardContent className="p-6">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <cat.icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Text */}
                  <h3 className="text-lg font-semibold text-white mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {cat.desc}
                  </p>

                  {/* Hover shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
