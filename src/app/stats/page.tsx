"use client"

import { useState } from "react"
import { ChevronLeft, TrendingUp, Calendar, Flame, Award, Target, Activity, Brain, Heart, BarChart3, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")

  const weeklyData = [
    { day: "Seg", completion: 85, habits: 5 },
    { day: "Ter", completion: 100, habits: 6 },
    { day: "Qua", completion: 70, habits: 4 },
    { day: "Qui", completion: 90, habits: 5 },
    { day: "Sex", completion: 95, habits: 6 },
    { day: "Sáb", completion: 80, habits: 5 },
    { day: "Dom", completion: 75, habits: 4 },
  ]

  const achievements = [
    { id: 1, title: "Primeira Semana", desc: "7 dias consecutivos", icon: "🎯", unlocked: true, date: "15 Mar 2024" },
    { id: 2, title: "Mente Forte", desc: "30 dias de meditação", icon: "🧘", unlocked: true, date: "22 Mar 2024" },
    { id: 3, title: "Corpo Ativo", desc: "50 treinos completos", icon: "💪", unlocked: true, date: "28 Mar 2024" },
    { id: 4, title: "Leitor Dedicado", desc: "100 páginas lidas", icon: "📚", unlocked: true, date: "05 Abr 2024" },
    { id: 5, title: "Hidratação Master", desc: "30 dias de 2L água", icon: "💧", unlocked: false, date: "" },
    { id: 6, title: "Disciplina Total", desc: "90 dias de sequência", icon: "🔥", unlocked: false, date: "" },
  ]

  const categoryStats = [
    { name: "Mente", progress: 85, habits: 4, color: "from-purple-500 to-pink-600", icon: Brain },
    { name: "Corpo", progress: 92, habits: 5, color: "from-blue-500 to-cyan-600", icon: Activity },
    { name: "Propósito", progress: 78, habits: 3, color: "from-orange-500 to-red-600", icon: Heart },
  ]

  const maxCompletion = Math.max(...weeklyData.map(d => d.completion))

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
                <h1 className="text-xl font-bold text-slate-900">Estatísticas</h1>
                <p className="text-xs text-slate-500">Acompanhe sua evolução</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">28</p>
            <p className="text-xs text-slate-600">Dias Ativos</p>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">15</p>
            <p className="text-xs text-slate-600">Sequência</p>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-xs text-slate-600">Hábitos</p>
          </Card>

          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">87%</p>
            <p className="text-xs text-slate-600">Taxa Sucesso</p>
          </Card>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 mb-6">
          <Button
            variant={timeRange === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("week")}
            className={timeRange === "week" ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}
          >
            Semana
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
            className={timeRange === "month" ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}
          >
            Mês
          </Button>
          <Button
            variant={timeRange === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("year")}
            className={timeRange === "year" ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}
          >
            Ano
          </Button>
        </div>

        {/* Weekly Chart */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-slate-200/60">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Progresso Semanal
            </h3>
            <span className="text-sm text-slate-600">Última semana</span>
          </div>

          <div className="space-y-4">
            {weeklyData.map((day) => (
              <div key={day.day}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="relative h-8 bg-slate-100 rounded-lg overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-500"
                        style={{ width: `${day.completion}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-700">{day.completion}%</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-slate-600 w-16 text-right">{day.habits} hábitos</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Category Stats */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-500" />
            Desempenho por Pilar
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {categoryStats.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.name} className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/60">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{category.name}</h4>
                      <p className="text-xs text-slate-600">{category.habits} hábitos</p>
                    </div>
                  </div>
                  <Progress value={category.progress} className="h-2 mb-2" />
                  <p className="text-sm text-slate-600">{category.progress}% de conclusão</p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Conquistas ({achievements.filter(a => a.unlocked).length}/{achievements.length})
          </h3>

          <Tabs defaultValue="unlocked" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 p-1 rounded-2xl">
              <TabsTrigger value="unlocked" className="rounded-xl">
                Desbloqueadas ({achievements.filter(a => a.unlocked).length})
              </TabsTrigger>
              <TabsTrigger value="locked" className="rounded-xl">
                Bloqueadas ({achievements.filter(a => !a.unlocked).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="unlocked" className="space-y-4">
              {achievements.filter(a => a.unlocked).map((achievement) => (
                <Card key={achievement.id} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-slate-600 mb-2">{achievement.desc}</p>
                      <p className="text-xs text-amber-700 font-medium">Desbloqueado em {achievement.date}</p>
                    </div>
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="locked" className="space-y-4">
              {achievements.filter(a => !a.unlocked).map((achievement) => (
                <Card key={achievement.id} className="p-4 bg-slate-50/50 border-slate-200/60 opacity-75">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-3xl flex-shrink-0 relative">
                      {achievement.icon}
                      <div className="absolute inset-0 bg-slate-900/20 rounded-2xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-slate-600">{achievement.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Motivational Card */}
        <Card className="p-6 mt-8 bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl shadow-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h4 className="font-bold text-lg mb-2">Continue Evoluindo! 📈</h4>
              <p className="text-sm text-blue-50 leading-relaxed">
                Suas estatísticas mostram um crescimento consistente. Lembre-se: cada dia é uma oportunidade 
                de melhorar 1% em relação ao dia anterior. Continue assim!
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
