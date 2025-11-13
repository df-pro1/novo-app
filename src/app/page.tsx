"use client"

import { useState, useEffect } from "react"
import { Brain, Heart, Target, TrendingUp, Calendar, CheckCircle2, Flame, Moon, Sun, Droplets, Activity, Book, Zap, Award, ChevronRight, Plus, Clock, Trophy, Sparkles, Focus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Home() {
  const [activeTab, setActiveTab] = useState("hoje")
  const [completedHabits, setCompletedHabits] = useState<number[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration - only run on client
  useEffect(() => {
    setMounted(true)
    const hour = new Date().getHours()
    setIsDarkMode(hour >= 20 || hour < 6)
  }, [])

  const toggleHabit = (id: number) => {
    setCompletedHabits(prev => 
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    )
  }

  const habits = [
    { id: 1, name: "Meditação matinal", icon: Brain, category: "Mente", time: "10 min", streak: 7 },
    { id: 2, name: "Exercício físico", icon: Activity, category: "Corpo", time: "30 min", streak: 12 },
    { id: 3, name: "Leitura", icon: Book, category: "Mente", time: "20 min", streak: 5 },
    { id: 4, name: "Hidratação", icon: Droplets, category: "Corpo", time: "2L", streak: 15 },
    { id: 5, name: "Gratidão", icon: Heart, category: "Propósito", time: "5 min", streak: 9 },
  ]

  const dailyProgress = (completedHabits.length / habits.length) * 100

  const quickActions = [
    { icon: Plus, label: "Criar Hábito", href: "/habits", color: "from-blue-500 to-cyan-600" },
    { icon: Trophy, label: "Desafios", href: "/challenges", color: "from-purple-500 to-pink-600" },
    { icon: TrendingUp, label: "Estatísticas", href: "/stats", color: "from-green-500 to-emerald-600" },
    { icon: Sparkles, label: "Inspiração", href: "/inspiration", color: "from-amber-500 to-orange-600" },
    { icon: Focus, label: "Modo Foco", href: "/focus", color: "from-indigo-500 to-purple-600" },
  ]

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20'
    }`}>
      {/* Header Premium */}
      <header className={`border-b backdrop-blur-xl sticky top-0 z-50 transition-colors ${
        isDarkMode 
          ? 'border-slate-700/60 bg-slate-900/80' 
          : 'border-slate-200/60 bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent'
                }`}>
                  Evolve
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Seu coach digital
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600" />
                )}
              </Button>
              <Link href="/stats">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Award className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Hero Section - Progresso Diário */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Olá, Campeão! 👋
              </h2>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Cada pequeno passo te aproxima da sua melhor versão
              </p>
            </div>
            <Badge variant="secondary" className="self-start sm:self-auto px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg shadow-blue-500/20">
              <Flame className="w-4 h-4 mr-2" />
              {Math.max(...habits.map(h => h.streak))} dias de sequência
            </Badge>
          </div>

          <Card className={`p-6 sm:p-8 backdrop-blur-sm shadow-xl ${
            isDarkMode 
              ? 'bg-slate-800/80 border-slate-700/60 shadow-slate-900/50' 
              : 'bg-white/80 border-slate-200/60 shadow-slate-200/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className={`text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Progresso de Hoje
                </p>
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.round(dailyProgress)}%
                </p>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <Progress value={dailyProgress} className="h-3 mb-3" />
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {completedHabits.length} de {habits.length} hábitos concluídos
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link key={index} href={action.href}>
                  <Card className={`p-4 text-center hover:shadow-xl transition-all cursor-pointer ${
                    isDarkMode 
                      ? 'bg-slate-800/80 border-slate-700/60 hover:bg-slate-800' 
                      : 'bg-white/80 border-slate-200/60 hover:bg-white'
                  }`}>
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-900'}`}>
                      {action.label}
                    </p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className={`grid w-full grid-cols-3 mb-8 backdrop-blur-sm border p-1 rounded-2xl shadow-lg ${
            isDarkMode 
              ? 'bg-slate-800/80 border-slate-700/60' 
              : 'bg-white/80 border-slate-200/60'
          }`}>
            <TabsTrigger 
              value="hoje" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Hoje
            </TabsTrigger>
            <TabsTrigger 
              value="pilares"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <Target className="w-4 h-4 mr-2" />
              Pilares
            </TabsTrigger>
            <TabsTrigger 
              value="evolucao"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Evolução
            </TabsTrigger>
          </TabsList>

          {/* Tab: Hoje */}
          <TabsContent value="hoje" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Seus Hábitos
              </h3>
              <Link href="/habits">
                <Button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Hábito
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {habits.map((habit) => {
                const Icon = habit.icon
                const isCompleted = completedHabits.includes(habit.id)
                
                return (
                  <Card 
                    key={habit.id}
                    className={`p-4 sm:p-6 transition-all duration-300 cursor-pointer hover:shadow-xl border-2 ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg shadow-blue-200/50 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-700' 
                        : isDarkMode
                        ? 'bg-slate-800/80 backdrop-blur-sm border-slate-700/60 hover:border-blue-600'
                        : 'bg-white/80 backdrop-blur-sm border-slate-200/60 hover:border-blue-300'
                    }`}
                    onClick={() => toggleHabit(habit.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30' 
                          : isDarkMode
                          ? 'bg-slate-700'
                          : 'bg-slate-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        ) : (
                          <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-semibold text-base sm:text-lg ${
                            isCompleted 
                              ? isDarkMode ? 'text-blue-300' : 'text-blue-900'
                              : isDarkMode ? 'text-slate-100' : 'text-slate-900'
                          }`}>
                            {habit.name}
                          </h4>
                          <Badge variant="secondary" className={`text-xs border-0 ${
                            isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {habit.category}
                          </Badge>
                        </div>
                        <div className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {habit.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            {habit.streak} dias
                          </span>
                        </div>
                      </div>

                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        isCompleted 
                          ? 'text-blue-600 rotate-90' 
                          : isDarkMode ? 'text-slate-600' : 'text-slate-400'
                      }`} />
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Mensagem Motivacional */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl shadow-blue-500/30 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h4 className="font-bold text-lg mb-2">Continue assim! 💪</h4>
                  <p className="text-sm text-blue-50 leading-relaxed">
                    Você está construindo uma rotina incrível. Lembre-se: não é sobre perfeição, 
                    é sobre progresso constante. Cada dia é uma nova chance de evoluir.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Pilares */}
          <TabsContent value="pilares" className="space-y-4">
            <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Seus Pilares de Evolução
            </h3>
            
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {[
                { 
                  icon: Brain, 
                  title: "Mente", 
                  color: "from-purple-500 to-pink-600",
                  progress: 75,
                  habits: ["Meditação", "Leitura", "Journaling"]
                },
                { 
                  icon: Activity, 
                  title: "Corpo", 
                  color: "from-blue-500 to-cyan-600",
                  progress: 85,
                  habits: ["Exercício", "Hidratação", "Sono"]
                },
                { 
                  icon: Target, 
                  title: "Propósito", 
                  color: "from-orange-500 to-red-600",
                  progress: 60,
                  habits: ["Gratidão", "Metas", "Reflexão"]
                },
              ].map((pilar, index) => {
                const Icon = pilar.icon
                return (
                  <Card key={index} className={`p-6 backdrop-blur-sm hover:shadow-xl transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800/80 border-slate-700/60' 
                      : 'bg-white/80 border-slate-200/60'
                  }`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pilar.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {pilar.title}
                    </h4>
                    <Progress value={pilar.progress} className="h-2 mb-4" />
                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {pilar.progress}% completo
                    </p>
                    <div className="space-y-2">
                      {pilar.habits.map((habit, i) => (
                        <div key={i} className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          {habit}
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Dica do Dia */}
            <Card className={`p-6 sm:p-8 mt-8 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-amber-700/60' 
                : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60'
            }`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    Dica do Dia
                  </h4>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Comece seu dia com 5 minutos de respiração consciente. Inspire profundamente, 
                    segure por 4 segundos e expire lentamente. Isso reduz o cortisol e aumenta seu foco.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tab: Evolução */}
          <TabsContent value="evolucao" className="space-y-6">
            <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              Sua Jornada
            </h3>
            
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Dias Ativos", value: "28", icon: Calendar, color: "from-blue-500 to-cyan-600" },
                { label: "Hábitos Criados", value: "12", icon: Plus, color: "from-purple-500 to-pink-600" },
                { label: "Sequência Atual", value: "15", icon: Flame, color: "from-orange-500 to-red-600" },
                { label: "Taxa de Sucesso", value: "87%", icon: TrendingUp, color: "from-green-500 to-emerald-600" },
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className={`p-6 backdrop-blur-sm hover:shadow-xl transition-all ${
                    isDarkMode 
                      ? 'bg-slate-800/80 border-slate-700/60' 
                      : 'bg-white/80 border-slate-200/60'
                  }`}>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {stat.label}
                    </p>
                    <p className={`text-3xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                      {stat.value}
                    </p>
                  </Card>
                )
              })}
            </div>

            {/* Conquistas */}
            <Card className={`p-6 sm:p-8 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-800/80 border-slate-700/60' 
                : 'bg-white/80 border-slate-200/60'
            }`}>
              <h4 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                <Award className="w-6 h-6 text-amber-500" />
                Conquistas Desbloqueadas
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Primeira Semana", desc: "7 dias consecutivos", unlocked: true },
                  { title: "Mente Forte", desc: "30 dias de meditação", unlocked: true },
                  { title: "Corpo Ativo", desc: "50 treinos completos", unlocked: false },
                  { title: "Disciplina Total", desc: "90 dias de sequência", unlocked: false },
                ].map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      achievement.unlocked 
                        ? isDarkMode
                          ? 'bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-amber-700'
                          : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300'
                        : isDarkMode
                        ? 'bg-slate-800/50 border-slate-700 opacity-60'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg' 
                          : isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
                      }`}>
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                          {achievement.title}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {achievement.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Mensagem Inspiradora */}
            <Card className={`p-6 sm:p-8 border-0 shadow-2xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900' 
                : 'bg-gradient-to-br from-slate-900 to-slate-800'
            }`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h4 className="font-bold text-lg mb-2">Reflexão da Noite 🌙</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Antes de dormir, reserve 5 minutos para refletir sobre suas conquistas do dia. 
                    Celebre cada pequena vitória. O crescimento acontece nos detalhes.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t lg:hidden shadow-2xl ${
        isDarkMode 
          ? 'bg-slate-900/95 border-slate-700/60' 
          : 'bg-white/95 border-slate-200/60'
      }`}>
        <div className="flex items-center justify-around py-3 px-4">
          {[
            { icon: Calendar, label: "Hoje", active: true, href: "/" },
            { icon: Target, label: "Hábitos", active: false, href: "/habits" },
            { icon: Trophy, label: "Desafios", active: false, href: "/challenges" },
            { icon: Award, label: "Stats", active: false, href: "/stats" },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <Link key={index} href={item.href}>
                <button
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                    item.active 
                      ? 'text-blue-600' 
                      : isDarkMode 
                      ? 'text-slate-500 hover:text-slate-300' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
