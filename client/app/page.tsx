import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Search, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SkillSwap</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Exchange Skills, <span className="text-blue-600">Grow Together</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with people in your community to teach what you know and learn what you want. No money involved - just
          pure skill exchange.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="px-8">
              Start Swapping Skills
            </Button>
          </Link>
          <Link href="/browse">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Browse Skills
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Create Your Profile</CardTitle>
              <CardDescription>List the skills you can teach and what you want to learn</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Search className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Find Skill Partners</CardTitle>
              <CardDescription>Search for people who have the skills you want to learn</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Star className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Start Learning</CardTitle>
              <CardDescription>Connect, swap skills, and rate your experience</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillSwap</span>
          </div>
          <p className="text-center text-gray-400">© 2024 SkillSwap Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
