"use client"

import { useState } from "react"
import { ChevronLeft, Trophy, Target, Clock, Users, CheckCircle2, Lock, Play, Award, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Challenge {
  id: number
  title: string
  description: string
  duration: string
  difficulty: "Iniciante" | "Intermediário" | "Avançado"
  participants: number
  progress: number
  isActive: boolean
  isLocked: boolean
  reward: string
  icon: string
  color: string
}

export default function ChallengesPage() {
  const [challenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "21 Dias de Meditação",
      description: "Medite por 10 minutos todos os dias durante 21 dias consecutivos",
      duration: "21 dias",
      difficulty: "Iniciante",
      participants: 1247,
      progress: 65,
      isActive: true,
      isLocked: false,
      reward: "Medalha Mente Zen",
      icon: "🧘",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 2,
      title: "Desafio 5K",
      description: "Corra ou caminhe 5km por dia durante 30 dias",
      duration: "30 dias",
      difficulty: "Intermediário",
      participants: 892,
      progress: 0,
      isActive: false,
      isLocked: false,
      reward: "Troféu Corredor",
      icon: "🏃",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 3,
      title: "Leitura Diária",
      description: "Leia pelo menos 20 páginas todos os dias por 30 dias",
      duration: "30 dias",
      difficulty: "Iniciante",
      participants: 2341,
      progress: 40,
      isActive: true,
      isLocked: false,
      reward: "Emblema Leitor",
      icon: "📚",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 4,
      title: "Hidratação Perfeita",
      description: "Beba 2L de água todos os dias durante 14 dias",
      duration: "14 dias",
      difficulty: "Iniciante",
      participants: 3156,
      progress: 0,
      isActive: false,
      isLocked: false,
      reward: "Medalha Hidratação",
      icon: "💧",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 5,
      title: "Gratidão Diária",
      description: "Escreva 3 coisas pelas quais você é grato todos os dias por 30 dias",
      duration: "30 dias",
      difficulty: "Iniciante",
      participants: 1876,
      progress: 0,
      isActive: false,
      isLocked: false,
      reward: "Coração de Ouro",
      icon: "❤️",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 6,
      title: "Maratona de Foco",
      description: "Complete 90 sessões de trabalho focado de 25 minutos",
      duration: "30 dias",
      difficulty: "Avançado",
      participants: 567,
      progress: 0,
      isActive: false,
      isLocked: true,
      reward: "Troféu Produtividade",
      icon: "🎯",
      color: "from-indigo-500 to-purple-600"
    },
  ])

  const difficultyColors = {
    "Iniciante": "bg-green-100 text-green-700 border-green-200",
    "Intermediário": "bg-amber-100 text-amber-700 border-amber-200",
    "Avançado": "bg-red-100 text-red-700 border-red-200",
  }

  const activeChallenges = challenges.filter(c => c.isActive)
  const availableChallenges = challenges.filter(c => !c.isActive && !c.isLocked)
  const lockedChallenges = challenges.filter(c => c.isLocked)

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
                <h1 className="text-xl font-bold text-slate-900">Desafios Guiados</h1>
                <p className="text-xs text-slate-500">Supere seus limites</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-bold text-slate-900">3</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <p className="text-2xl font-bold text-slate-900">3</p>
            </div>
            <p className="text-xs text-slate-600">Concluídos</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <p className="text-2xl font-bold text-slate-900">{activeChallenges.length}</p>
            </div>
            <p className="text-xs text-slate-600">Ativos</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-500" />
              <p className="text-2xl font-bold text-slate-900">{availableChallenges.length}</p>
            </div>
            <p className="text-xs text-slate-600">Disponíveis</p>
          </Card>
        </div>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Desafios Ativos
            </h2>
            <div className="space-y-4">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                      {challenge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 mb-1">{challenge.title}</h3>
                          <p className="text-sm text-slate-600 mb-3">{challenge.description}</p>
                        </div>
                        <Badge className={difficultyColors[challenge.difficulty]}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700">Progresso</span>
                            <span className="text-sm font-bold text-blue-600">{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-slate-600">
                              <Clock className="w-4 h-4" />
                              {challenge.duration}
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                              <Users className="w-4 h-4" />
                              {challenge.participants.toLocaleString()}
                            </span>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                            Continuar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Challenges */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Desafios Disponíveis
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {availableChallenges.map((challenge) => (
              <Card key={challenge.id} className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                    {challenge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 mb-1">{challenge.title}</h3>
                    <Badge className={difficultyColors[challenge.difficulty]}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4">{challenge.description}</p>

                <div className="flex items-center justify-between mb-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {challenge.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {challenge.participants.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200/60 mb-4">
                  <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="text-sm text-amber-900 font-medium">{challenge.reward}</span>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Desafio
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Challenges */}
        {lockedChallenges.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-slate-400" />
              Desafios Bloqueados
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {lockedChallenges.map((challenge) => (
                <Card key={challenge.id} className="p-6 bg-slate-50/50 backdrop-blur-sm border-slate-200/60 opacity-75">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center text-2xl flex-shrink-0 relative">
                      {challenge.icon}
                      <div className="absolute inset-0 bg-slate-900/20 rounded-2xl flex items-center justify-center">
                        <Lock className="w-6 h-6 text-slate-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 mb-1">{challenge.title}</h3>
                      <Badge className={difficultyColors[challenge.difficulty]}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{challenge.description}</p>

                  <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-xl border border-slate-200">
                    <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700">Complete 3 desafios para desbloquear</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Motivational Card */}
        <Card className="p-6 mt-8 bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl shadow-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h4 className="font-bold text-lg mb-2">Dica de Desafio 🎯</h4>
              <p className="text-sm text-blue-50 leading-relaxed">
                Escolha desafios que se alinhem com seus objetivos pessoais. Não tente fazer todos de uma vez - 
                foque em 1 ou 2 desafios por vez para manter a qualidade e a consistência.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
