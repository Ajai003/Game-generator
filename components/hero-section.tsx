"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"

const TOTAL_FRAMES = 240
const INTRO_DURATION = 3000 // 3 seconds for initial zoom animation
const LERP_SPEED = 0.08

function getFrameSrc(idx: number): string {
  const num = String(Math.min(Math.max(idx, 1), TOTAL_FRAMES)).padStart(3, "0")
  return `/images/ezgif-frame-${num}.jpg`
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [loadProgress, setLoadProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const currentFrameRef = useRef(1)
  const targetFrameRef = useRef(120)
  const isHoveringRef = useRef(false)
  const rafRef = useRef<number>(0)

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0
    const images: HTMLImageElement[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFrameSrc(i)
      img.onload = () => {
        loadedCount++
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100))
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true)
        }
      }
      images[i] = img
    }

    imagesRef.current = images
  }, [])

  // Draw frame on canvas
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const img = imagesRef.current[Math.round(frameIdx)]
    if (!canvas || !ctx || !img) return

    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Cover fit
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    )
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    const x = (canvas.width - w) / 2
    const y = (canvas.height - h) / 2
    ctx.drawImage(img, x, y, w, h)
  }, [])

  // Intro animation: play frames 1→240 over 3s with ease-out
  useEffect(() => {
    if (!loaded) return

    const startTime = performance.now()
    let animFrame: number

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / INTRO_DURATION, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const frame = Math.round(1 + eased * (TOTAL_FRAMES - 1))

      currentFrameRef.current = frame
      drawFrame(frame)

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate)
      } else {
        currentFrameRef.current = 120
        targetFrameRef.current = 120
        setIntroComplete(true)
      }
    }

    animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [loaded, drawFrame])

  // Interactive cursor-driven frame scrubbing with lerp
  useEffect(() => {
    if (!introComplete) return

    const loop = () => {
      const current = currentFrameRef.current
      const target = targetFrameRef.current
      const next = current + (target - current) * LERP_SPEED

      if (Math.abs(next - current) > 0.1) {
        currentFrameRef.current = next
        drawFrame(Math.round(next))
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [introComplete, drawFrame])

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!introComplete) return
      isHoveringRef.current = true

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = (e.clientX - rect.left) / rect.width // 0 to 1
      const frame = Math.round(1 + x * (TOTAL_FRAMES - 1))
      targetFrameRef.current = frame
    },
    [introComplete]
  )

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false
    targetFrameRef.current = 120 // Reset to center
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ 
          opacity: loaded ? 1 : 0, 
          transition: "opacity 0.8s ease-in-out" 
        }}
      />

      {/* Loading overlay */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
          <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${loadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-4 text-xs text-white/40 tracking-widest uppercase">
            Loading Experience — {loadProgress}%
          </p>
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />

      {/* Top vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />

      {/* Animated glow orbs in background */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-neon-purple/10 blur-[100px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-neon-cyan/10 blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neon-blue/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Scroll indicator */}
      {introComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        >
          <p className="text-xs text-white/40 tracking-[0.3em] uppercase mb-3">
            Scroll to Explore
          </p>
          <motion.div
            className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5"
            initial={{ opacity: 0.5 }}
          >
            <motion.div
              className="w-1 h-2 bg-neon-cyan rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}

      {/* Cursor hint */}
      {introComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        >
          <motion.p
            className="text-sm text-white/30 tracking-widest uppercase text-center"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Move cursor to interact
          </motion.p>
        </motion.div>
      )}
    </section>
  )
}
