"use client"

import { useState } from "react"
import { Plus, X, Clock, Target, Flame, ChevronLeft, Save, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Habit {
  id: number
  name: string
  category: "Mente" | "Corpo" | "Propósito"
  time: string
  frequency: string
  icon: string
  color: string
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Meditação matinal", category: "Mente", time: "10 min", frequency: "Diário", icon: "🧘", color: "from-purple-500 to-pink-600" },
    { id: 2, name: "Exercício físico", category: "Corpo", time: "30 min", frequency: "Diário", icon: "💪", color: "from-blue-500 to-cyan-600" },
    { id: 3, name: "Leitura", category: "Mente", time: "20 min", frequency: "Diário", icon: "📚", color: "from-purple-500 to-pink-600" },
    { id: 4, name: "Hidratação", category: "Corpo", time: "2L", frequency: "Diário", icon: "💧", color: "from-blue-500 to-cyan-600" },
    { id: 5, name: "Gratidão", category: "Propósito", time: "5 min", frequency: "Diário", icon: "❤️", color: "from-orange-500 to-red-600" },
  ])
  
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "Mente" as "Mente" | "Corpo" | "Propósito",
    time: "",
    frequency: "Diário",
    icon: "⭐",
  })

  const categoryColors = {
    "Mente": "from-purple-500 to-pink-600",
    "Corpo": "from-blue-500 to-cyan-600",
    "Propósito": "from-orange-500 to-red-600",
  }

  const handleCreateHabit = () => {
    if (!formData.name || !formData.time) return

    const newHabit: Habit = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      time: formData.time,
      frequency: formData.frequency,
      icon: formData.icon,
      color: categoryColors[formData.category],
    }

    setHabits([...habits, newHabit])
    resetForm()
  }

  const handleUpdateHabit = () => {
    if (!editingHabit || !formData.name || !formData.time) return

    setHabits(habits.map(h => 
      h.id === editingHabit.id 
        ? { ...h, ...formData, color: categoryColors[formData.category] }
        : h
    ))
    resetForm()
  }

  const handleDeleteHabit = (id: number) => {
    setHabits(habits.filter(h => h.id !== id))
  }

  const startEdit = (habit: Habit) => {
    setEditingHabit(habit)
    setFormData({
      name: habit.name,
      category: habit.category,
      time: habit.time,
      frequency: habit.frequency,
      icon: habit.icon,
    })
    setShowCreateForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Mente",
      time: "",
      frequency: "Diário",
      icon: "⭐",
    })
    setShowCreateForm(false)
    setEditingHabit(null)
  }

  const emojiOptions = ["⭐", "🧘", "💪", "📚", "💧", "❤️", "🎯", "🔥", "🌱", "✨", "🏃", "🍎", "😴", "🧠", "💼"]

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
                <h1 className="text-xl font-bold text-slate-900">Criador de Hábitos</h1>
                <p className="text-xs text-slate-500">Construa sua rotina ideal</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <p className="text-2xl font-bold text-slate-900">{habits.length}</p>
            <p className="text-xs text-slate-600">Hábitos Ativos</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <p className="text-2xl font-bold text-slate-900">{habits.filter(h => h.category === "Mente").length}</p>
            <p className="text-xs text-slate-600">Mente</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60">
            <p className="text-2xl font-bold text-slate-900">{habits.filter(h => h.category === "Corpo").length}</p>
            <p className="text-xs text-slate-600">Corpo</p>
          </Card>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">
                {editingHabit ? "Editar Hábito" : "Criar Novo Hábito"}
              </h3>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome do Hábito</Label>
                <Input
                  id="name"
                  placeholder="Ex: Meditação matinal"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Categoria</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {(["Mente", "Corpo", "Propósito"] as const).map((cat) => (
                    <Button
                      key={cat}
                      type="button"
                      variant={formData.category === cat ? "default" : "outline"}
                      className={`${
                        formData.category === cat 
                          ? `bg-gradient-to-r ${categoryColors[cat]} text-white border-0` 
                          : ""
                      }`}
                      onClick={() => setFormData({ ...formData, category: cat })}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Duração</Label>
                  <Input
                    id="time"
                    placeholder="Ex: 10 min"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequência</Label>
                  <Input
                    id="frequency"
                    placeholder="Ex: Diário"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label>Ícone</Label>
                <div className="grid grid-cols-8 gap-2 mt-2">
                  {emojiOptions.map((emoji) => (
                    <Button
                      key={emoji}
                      type="button"
                      variant={formData.icon === emoji ? "default" : "outline"}
                      className={`text-2xl h-12 ${
                        formData.icon === emoji ? "bg-blue-500 hover:bg-blue-600" : ""
                      }`}
                      onClick={() => setFormData({ ...formData, icon: emoji })}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={editingHabit ? handleUpdateHabit : handleCreateHabit}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingHabit ? "Salvar Alterações" : "Criar Hábito"}
              </Button>
            </div>
          </Card>
        )}

        {/* Habits List */}
        <Tabs defaultValue="todos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 p-1 rounded-2xl">
            <TabsTrigger value="todos" className="rounded-xl">Todos</TabsTrigger>
            <TabsTrigger value="Mente" className="rounded-xl">Mente</TabsTrigger>
            <TabsTrigger value="Corpo" className="rounded-xl">Corpo</TabsTrigger>
            <TabsTrigger value="Propósito" className="rounded-xl">Propósito</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-4">
            {habits.map((habit) => (
              <Card key={habit.id} className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${habit.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {habit.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{habit.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="secondary" className="text-xs">{habit.category}</Badge>
                      <span className="text-xs text-slate-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {habit.time}
                      </span>
                      <span className="text-xs text-slate-600">{habit.frequency}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEdit(habit)}
                      className="rounded-full"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteHabit(habit.id)}
                      className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {(["Mente", "Corpo", "Propósito"] as const).map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {habits.filter(h => h.category === category).map((habit) => (
                <Card key={habit.id} className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${habit.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {habit.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{habit.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {habit.time}
                        </span>
                        <span className="text-xs text-slate-600">{habit.frequency}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEdit(habit)}
                        className="rounded-full"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {/* Motivational Card */}
        <Card className="p-6 mt-8 bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl shadow-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h4 className="font-bold text-lg mb-2">Dica para Criar Hábitos 💡</h4>
              <p className="text-sm text-blue-50 leading-relaxed">
                Comece pequeno! É melhor fazer 5 minutos todos os dias do que 1 hora uma vez por semana. 
                A consistência é mais importante que a intensidade.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
