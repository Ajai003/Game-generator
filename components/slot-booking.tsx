"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gamepad2, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { DatePicker } from "@/components/ui/date-picker"
import { format } from "date-fns"

const games = [
  "Call of Duty: Warzone",
  "FIFA 25",
  "Fortnite",
  "Gran Turismo 7",
  "Minecraft",
  "Valorant",
  "VR Beat Saber",
  "Mario Kart 8",
]

const timeSlots = [
  { time: "10:00 AM", status: "available" },
  { time: "11:00 AM", status: "booked" },
  { time: "12:00 PM", status: "available" },
  { time: "1:00 PM", status: "available" },
  { time: "2:00 PM", status: "booked" },
  { time: "3:00 PM", status: "available" },
  { time: "4:00 PM", status: "booked" },
  { time: "5:00 PM", status: "available" },
  { time: "6:00 PM", status: "available" },
  { time: "7:00 PM", status: "booked" },
  { time: "8:00 PM", status: "available" },
  { time: "9:00 PM", status: "available" },
]

export default function SlotBooking() {
  const [selectedGame, setSelectedGame] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConfirm = () => {
    if (selectedGame && selectedDate && selectedSlot) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setSelectedSlot("")
      }, 3000)
    }
  }

  return (
    <section id="booking" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-neon-blue via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              Book Your Slot
            </span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-lg">
            Reserve your gaming station in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass-strong border-white/10">
            <CardContent className="p-8">
              {/* Game & Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Game Select */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                    <Gamepad2 className="h-4 w-4 text-neon-purple" />
                    Select Game
                  </label>
                  <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-gray-900">
                      Choose a game...
                    </option>
                    {games.map((g) => (
                      <option key={g} value={g} className="bg-gray-900">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
                    Select Date
                  </label>
                  <DatePicker
                    date={selectedDate}
                    onDateChange={setSelectedDate}
                    placeholder="Pick a date"
                    className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 h-auto px-4 py-3"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-8">
                <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-4">
                  <Clock className="h-4 w-4 text-neon-blue" />
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot) => {
                    const isBooked = slot.status === "booked"
                    const isSelected = selectedSlot === slot.time

                    return (
                      <motion.button
                        key={slot.time}
                        whileHover={!isBooked ? { scale: 1.05 } : {}}
                        whileTap={!isBooked ? { scale: 0.95 } : {}}
                        onClick={() =>
                          !isBooked && setSelectedSlot(isSelected ? "" : slot.time)
                        }
                        disabled={isBooked}
                        className={`relative px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 border ${
                          isBooked
                            ? "bg-red-500/5 border-red-500/10 text-red-400/40 cursor-not-allowed"
                            : isSelected
                              ? "bg-blue-500/10 border-blue-400/20 text-blue-300/80"
                              : "bg-white/3 border-white/8 text-green-400/60 hover:bg-green-500/8 hover:border-green-400/15 hover:text-green-400/80"
                        }`}
                      >
                        {slot.time}
                        {isBooked && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
                <div className="flex gap-4 mt-4 text-xs text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    Available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    Booked
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500/50" />
                    Selected
                  </span>
                </div>
              </div>

              {/* Confirm */}
              <InteractiveHoverButton
                text="Confirm Booking"
                onClick={handleConfirm}
                disabled={!selectedGame || !selectedDate || !selectedSlot}
                className="w-full py-3.5 rounded-full text-sm border-neon-purple/30 bg-black/40 text-white disabled:opacity-30 disabled:cursor-not-allowed"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="glass-strong rounded-2xl p-8 max-w-sm mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  damping: 10,
                  stiffness: 200,
                }}
              >
                <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">
                Slot Booked!
              </h3>
              <p className="text-white/50 text-sm">
                {selectedGame} — {selectedDate ? format(selectedDate, "PPP") : ""} at {selectedSlot}
              </p>
              <p className="text-white/30 text-xs mt-3">
                This is a demo. No actual booking was made.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
