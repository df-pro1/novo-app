"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Play, Pause, RotateCcw, Brain, Heart, Waves, Volume2, VolumeX, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

type Mode = "focus" | "breathe" | "meditate"

export default function FocusPage() {
  const [mode, setMode] = useState<Mode>("focus")
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutos em segundos
  const [isSoundOn, setIsSoundOn] = useState(true)
  const [sessions, setSessions] = useState(0)

  const modes = {
    focus: { duration: 25 * 60, title: "Foco Profundo", icon: Brain, color: "from-blue-500 to-cyan-600" },
    breathe: { duration: 5 * 60, title: "Respiração", icon: Waves, color: "from-purple-500 to-pink-600" },
    meditate: { duration: 10 * 60, title: "Meditação", icon: Heart, color: "from-orange-500 to-red-600" },
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      setSessions((s) => s + 1)
      // Aqui você poderia adicionar um som de notificação
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(modes[mode].duration)
  }

  const changeMode = (newMode: Mode) => {
    setMode(newMode)
    setIsRunning(false)
    setTimeLeft(modes[newMode].duration)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((modes[mode].duration - timeLeft) / modes[mode].duration) * 100

  const breathingExercises = [
    { name: "4-7-8", desc: "Inspire 4s, segure 7s, expire 8s", duration: "5 min" },
    { name: "Box Breathing", desc: "Inspire 4s, segure 4s, expire 4s, segure 4s", duration: "5 min" },
    { name: "Respiração Profunda", desc: "Inspire profundamente, expire lentamente", duration: "3 min" },
  ]

  const meditationGuides = [
    { name: "Atenção Plena", desc: "Foque no momento presente", duration: "10 min" },
    { name: "Body Scan", desc: "Relaxe cada parte do corpo", duration: "15 min" },
    { name: "Gratidão", desc: "Reflita sobre o que é grato", duration: "5 min" },
  ]

  const CurrentIcon = modes[mode].icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 pb-20 lg:pb-8">
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Foco & Bem-Estar</h1>
                <p className="text-xs text-slate-500">Cuide da sua mente</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 text-center">
            <p className="text-2xl font-bold text-slate-900">{sessions}</p>
            <p className="text-xs text-slate-600">Sessões Hoje</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 text-center">
            <p className="text-2xl font-bold text-slate-900">45</p>
            <p className="text-xs text-slate-600">Total Semana</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 text-center">
            <p className="text-2xl font-bold text-slate-900">12h</p>
            <p className="text-xs text-slate-600">Tempo Total</p>
          </Card>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {(Object.keys(modes) as Mode[]).map((m) => {
            const ModeIcon = modes[m].icon
            return (
              <Button
                key={m}
                variant={mode === m ? "default" : "outline"}
                onClick={() => changeMode(m)}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  mode === m ? `bg-gradient-to-br ${modes[m].color} text-white border-0 shadow-lg` : ""
                }`}
              >
                <ModeIcon className="w-6 h-6" />
                <span className="text-xs font-medium">{modes[m].title}</span>
              </Button>
            )
          })}
        </div>

        {/* Timer */}
        <Card className="p-8 sm:p-12 mb-8 bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
          <div className="flex flex-col items-center">
            {/* Circular Progress */}
            <div className="relative w-64 h-64 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-slate-200"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                  className="transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-blue-500" stopColor="currentColor" />
                    <stop offset="100%" className="text-purple-600" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <CurrentIcon className={`w-12 h-12 mb-4 bg-gradient-to-br ${modes[mode].color} bg-clip-text text-transparent`} />
                <p className="text-5xl font-bold text-slate-900">{formatTime(timeLeft)}</p>
                <p className="text-sm text-slate-600 mt-2">{modes[mode].title}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                onClick={toggleTimer}
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${modes[mode].color} hover:opacity-90 shadow-2xl`}
              >
                {isRunning ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={resetTimer}
                className="w-14 h-14 rounded-full"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsSoundOn(!isSoundOn)}
                className="w-14 h-14 rounded-full"
              >
                {isSoundOn ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Guides */}
        <Tabs defaultValue="breathing" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 p-1 rounded-2xl">
            <TabsTrigger value="breathing" className="rounded-xl">Respiração</TabsTrigger>
            <TabsTrigger value="meditation" className="rounded-xl">Meditação</TabsTrigger>
          </TabsList>

          <TabsContent value="breathing" className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Exercícios de Respiração</h3>
            {breathingExercises.map((exercise, index) => (
              <Card key={index} className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <Waves className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{exercise.name}</h4>
                      <p className="text-sm text-slate-600">{exercise.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">{exercise.duration}</p>
                    <Button size="sm" variant="ghost" className="mt-1">
                      Iniciar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="meditation" className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Meditações Guiadas</h3>
            {meditationGuides.map((guide, index) => (
              <Card key={index} className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{guide.name}</h4>
                      <p className="text-sm text-slate-600">{guide.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">{guide.duration}</p>
                    <Button size="sm" variant="ghost" className="mt-1">
                      Iniciar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Tip Card */}
        <Card className="p-6 mt-8 bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl shadow-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h4 className="font-bold text-lg mb-2">Dica de Foco 🎯</h4>
              <p className="text-sm text-blue-50 leading-relaxed">
                Use a técnica Pomodoro: 25 minutos de foco intenso seguidos de 5 minutos de pausa. 
                Após 4 ciclos, faça uma pausa maior de 15-30 minutos.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
