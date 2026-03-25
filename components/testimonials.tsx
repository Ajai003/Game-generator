"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Arjun Patel",
    role: "Pro Gamer",
    quote:
      "Hands down the best gaming center I've ever been to. The RTX 4090 rigs are insane, and the VR experience is out of this world. Can't wait to come back!",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Sneha Reddy",
    role: "Casual Gamer",
    quote:
      "Perfect place for a weekend hangout! The party rooms are amazing, and the food is surprisingly good. My friends and I had a blast playing Mario Kart.",
    rating: 5,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Rahul Kumar",
    role: "Esports Enthusiast",
    quote:
      "The tournament setup is professional-grade. Great monitors, low latency, and the staff really knows their stuff. This is where serious gaming happens.",
    rating: 4,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "Priya Sharma",
    role: "VR Explorer",
    quote:
      "The VR section blew my mind! Beat Saber on the Quest 3 was incredible. The staff was super helpful for first-timers. Already booked my next session!",
    rating: 5,
    gradient: "from-green-500 to-cyan-500",
  },
  {
    name: "Vikram Singh",
    role: "Retro Collector",
    quote:
      "Finally, a place that respects retro gaming! The arcade cabinets are authentic, and the pinball machines are in perfect condition. Nostalgia overload!",
    rating: 5,
    gradient: "from-orange-500 to-yellow-500",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [current])

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  const t = testimonials[current]

  return (
    <section id="reviews" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
              What Gamers Say
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">
            Real reviews from our community.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
                className="glass-strong rounded-2xl p-8 md:p-12"
              >
                {/* Quote icon */}
                <Quote className="h-10 w-10 text-white/10 mb-6" />

                {/* Quote text */}
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t.name}</h4>
                    <p className="text-sm text-white/40">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1)
                    setCurrent(i)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-neon-cyan"
                      : "w-2 bg-white/20 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
