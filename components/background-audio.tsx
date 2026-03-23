"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

type BackgroundAudioProps = {
  src: string
}

export default function BackgroundAudio({ src }: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    const saved = window.localStorage.getItem("bg-audio-muted")
    return saved ? saved === "true" : true
  })
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    audio.volume = 0.35
    audio.muted = isMuted
    audio.autoplay = true
    audio.setAttribute("playsinline", "true")
    audio.setAttribute("webkit-playsinline", "true")

    const setupAudioGraph = () => {
      if (!audioContextRef.current) {
        const context = new AudioContext()
        const analyser = context.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.5

        const source = context.createMediaElementSource(audio)
        source.connect(analyser)
        analyser.connect(context.destination)

        audioContextRef.current = context
        analyserRef.current = analyser
        sourceRef.current = source
        dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount))
      }
    }

    const tryPlay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        setupAudioGraph()
        if (audioContextRef.current?.state === "suspended") {
          void audioContextRef.current.resume().catch(() => {
            // Browser may still require a gesture for Web Audio;
            // background audio can continue even if analyser resume is blocked.
          })
        }
        return true
      } catch {
        setIsPlaying(false)
        return false
      }
    }

    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", handleUnlock)
      window.removeEventListener("touchstart", handleUnlock)
      window.removeEventListener("click", handleUnlock)
      window.removeEventListener("keydown", handleUnlock)
    }

    const handleUnlock = () => {
      void tryPlay().then((ok) => {
        if (ok) removeUnlockListeners()
      })
    }

    void tryPlay().then((ok) => {
      if (!ok) {
        // Mobile browsers may require a user gesture. Keep listening until unlocked.
        window.addEventListener("pointerdown", handleUnlock, { passive: true })
        window.addEventListener("touchstart", handleUnlock, { passive: true })
        window.addEventListener("click", handleUnlock, { passive: true })
        window.addEventListener("keydown", handleUnlock)
      }
    })

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)
    audio.addEventListener("ended", onPause)

    return () => {
      removeUnlockListeners()
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.removeEventListener("ended", onPause)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (audioContextRef.current) void audioContextRef.current.close()
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.muted = isMuted
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bg-audio-muted", String(isMuted))
    }
  }, [isMuted])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const analyser = analyserRef.current
      const data = dataRef.current

      ctx.clearRect(0, 0, width, height)

      if (!analyser || !data || !isPlaying || isMuted) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }

      analyser.getByteFrequencyData(data)
      const baseline = height * 0.82
      const t = performance.now() * 0.001

      let lowSum = 0
      let midSum = 0
      const lowEnd = Math.floor(data.length * 0.18)
      const midEnd = Math.floor(data.length * 0.52)

      for (let i = 0; i < lowEnd; i++) lowSum += data[i] ?? 0
      for (let i = lowEnd; i < midEnd; i++) midSum += data[i] ?? 0

      const low = lowEnd > 0 ? lowSum / lowEnd / 255 : 0
      const mid = midEnd - lowEnd > 0 ? midSum / (midEnd - lowEnd) / 255 : 0

      const baseAmplitude = 10 + low * 44
      const pulseAmplitude = 5 + mid * 22

      const drawWave = ({
        amplitude,
        frequency,
        speed,
        color,
        lineWidth,
        yOffset,
        phaseOffset,
      }: {
        amplitude: number
        frequency: number
        speed: number
        color: string
        lineWidth: number
        yOffset: number
        phaseOffset: number
      }) => {
        ctx.beginPath()
        const step = 8
        for (let x = 0; x <= width + step; x += step) {
          const y =
            baseline +
            yOffset +
            Math.sin(x * frequency + t * speed + phaseOffset) * amplitude +
            Math.sin(x * frequency * 0.5 - t * speed * 0.65 + phaseOffset) * amplitude * 0.42 +
            Math.sin(x * 0.012 + t * 1.8 + phaseOffset * 0.7) * pulseAmplitude * 0.2

          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Three layered waves for a smoother "ocean" motion.
      ctx.shadowColor = "rgba(99, 102, 241, 0.16)"
      ctx.shadowBlur = 10

      drawWave({
        amplitude: baseAmplitude,
        frequency: 0.010,
        speed: 0.8,
        color: "rgba(99, 102, 241, 0.30)",
        lineWidth: 1.8,
        yOffset: 0,
        phaseOffset: 0,
      })

      drawWave({
        amplitude: baseAmplitude * 0.72,
        frequency: 0.013,
        speed: 1,
        color: "rgba(59, 130, 246, 0.22)",
        lineWidth: 1.4,
        yOffset: 6,
        phaseOffset: Math.PI / 3,
      })

      drawWave({
        amplitude: baseAmplitude * 0.5,
        frequency: 0.016,
        speed: 1.3,
        color: "rgba(147, 197, 253, 0.16)",
        lineWidth: 1.1,
        yOffset: 12,
        phaseOffset: Math.PI / 1.7,
      })

      ctx.shadowBlur = 0

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isMuted, isPlaying])

  const handleToggleMute = async () => {
    const audio = audioRef.current
    if (!audio) return

    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (!nextMuted && audio.paused) {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[1]" aria-hidden />
      <button
        onClick={handleToggleMute}
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900/85 px-6 py-4 text-sm text-gray-100 shadow-lg backdrop-blur hover:bg-gray-800 transition-colors"
        aria-label={isMuted ? "Unmute background audio" : "Mute background audio"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        <span className="text-lg font-medium">{isMuted ? "Sound off" : "Sound on"}</span>
      </button>
    </>
  )
}
