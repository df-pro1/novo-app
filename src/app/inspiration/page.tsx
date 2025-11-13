"use client"

import { useState } from "react"
import { ChevronLeft, Heart, Share2, Bookmark, Plus, Sparkles, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface Post {
  id: number
  author: string
  avatar: string
  content: string
  category: "Motivação" | "Conquista" | "Reflexão" | "Dica"
  likes: number
  isLiked: boolean
  isSaved: boolean
  timestamp: string
}

export default function InspirationPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Maria Silva",
      avatar: "👩",
      content: "Completei 30 dias de meditação consecutivos! A diferença na minha ansiedade é incrível. Se você está pensando em começar, esse é o sinal que esperava. 🧘‍♀️",
      category: "Conquista",
      likes: 127,
      isLiked: false,
      isSaved: false,
      timestamp: "há 2 horas"
    },
    {
      id: 2,
      author: "João Santos",
      avatar: "👨",
      content: "Lembre-se: você não precisa ser perfeito, você precisa ser consistente. Cada pequeno passo conta. 💪",
      category: "Motivação",
      likes: 89,
      isLiked: true,
      isSaved: true,
      timestamp: "há 5 horas"
    },
    {
      id: 3,
      author: "Ana Costa",
      avatar: "👩‍🦰",
      content: "Dica: comece seu dia bebendo um copo de água antes do café. Seu corpo vai agradecer! Faço isso há 3 meses e sinto muita diferença. 💧",
      category: "Dica",
      likes: 156,
      isLiked: false,
      isSaved: false,
      timestamp: "há 1 dia"
    },
    {
      id: 4,
      author: "Pedro Lima",
      avatar: "👨‍🦱",
      content: "Hoje percebi que não é sobre ter tempo, é sobre fazer do tempo uma prioridade. Acordei 30 minutos mais cedo e consegui meditar, ler e me exercitar. Melhor decisão! ⏰",
      category: "Reflexão",
      likes: 203,
      isLiked: true,
      isSaved: false,
      timestamp: "há 2 dias"
    },
    {
      id: 5,
      author: "Carla Mendes",
      avatar: "👩‍🦳",
      content: "Celebrando 100 dias de exercícios! Não foi fácil, teve dias que só consegui 10 minutos, mas o importante é não desistir. Você consegue! 🎉",
      category: "Conquista",
      likes: 342,
      isLiked: false,
      isSaved: true,
      timestamp: "há 3 dias"
    },
  ])

  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState("")

  const toggleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const toggleSave = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ))
  }

  const categoryColors = {
    "Motivação": "bg-blue-100 text-blue-700 border-blue-200",
    "Conquista": "bg-green-100 text-green-700 border-green-200",
    "Reflexão": "bg-purple-100 text-purple-700 border-purple-200",
    "Dica": "bg-amber-100 text-amber-700 border-amber-200",
  }

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
                <h1 className="text-xl font-bold text-slate-900">Mural de Inspiração</h1>
                <p className="text-xs text-slate-500">Compartilhe sua jornada</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowCreatePost(!showCreatePost)}
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              Postar
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Create Post */}
        {showCreatePost && (
          <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Compartilhe sua história</h3>
            <Textarea
              placeholder="O que você quer compartilhar com a comunidade?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-4 min-h-[120px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {(["Motivação", "Conquista", "Reflexão", "Dica"] as const).map((cat) => (
                  <Button
                    key={cat}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Publicar
              </Button>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 text-center">
            <Users className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">2.4k</p>
            <p className="text-xs text-slate-600">Membros</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 text-center">
            <Sparkles className="w-5 h-5 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">156</p>
            <p className="text-xs text-slate-600">Posts Hoje</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-slate-200/60 text-center">
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-slate-900">89%</p>
            <p className="text-xs text-slate-600">Engajamento</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="todos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 p-1 rounded-2xl">
            <TabsTrigger value="todos" className="rounded-xl">Todos</TabsTrigger>
            <TabsTrigger value="seguindo" className="rounded-xl">Seguindo</TabsTrigger>
            <TabsTrigger value="salvos" className="rounded-xl">Salvos</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-900">{post.author}</h4>
                      <span className="text-xs text-slate-500">{post.timestamp}</span>
                    </div>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full border ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed mb-4">{post.content}</p>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                    className={`gap-2 ${post.isLiked ? 'text-red-500' : 'text-slate-600'}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSave(post.id)}
                    className={`gap-2 ml-auto ${post.isSaved ? 'text-blue-500' : 'text-slate-600'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="seguindo" className="space-y-4">
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-slate-200/60">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Nenhum post ainda</h3>
              <p className="text-sm text-slate-600">Comece a seguir pessoas para ver posts aqui</p>
            </Card>
          </TabsContent>

          <TabsContent value="salvos" className="space-y-4">
            {posts.filter(p => p.isSaved).length > 0 ? (
              posts.filter(p => p.isSaved).map((post) => (
                <Card key={post.id} className="p-6 bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900">{post.author}</h4>
                        <span className="text-xs text-slate-500">{post.timestamp}</span>
                      </div>
                      <span className={`inline-block text-xs px-2 py-1 rounded-full border ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed mb-4">{post.content}</p>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className={`gap-2 ${post.isLiked ? 'text-red-500' : 'text-slate-600'}`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
                      <Share2 className="w-4 h-4" />
                      Compartilhar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSave(post.id)}
                      className="gap-2 ml-auto text-blue-500"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-slate-200/60">
                <Bookmark className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">Nenhum post salvo</h3>
                <p className="text-sm text-slate-600">Salve posts interessantes para ler depois</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Community Card */}
        <Card className="p-6 mt-8 bg-gradient-to-br from-blue-500 to-purple-600 border-0 shadow-2xl shadow-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-white">
              <h4 className="font-bold text-lg mb-2">Comunidade Evolve 💙</h4>
              <p className="text-sm text-blue-50 leading-relaxed">
                Compartilhe suas conquistas, inspire outros e seja inspirado. Juntos, somos mais fortes!
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
