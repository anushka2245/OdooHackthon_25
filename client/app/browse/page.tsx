"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, MapPin, Star, MessageSquare } from "lucide-react"
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6

  const [users] = useState([
    {
      id: 1,
      name: "Sarah Wilson",
      location: "San Francisco, CA",
      avatar: "/placeholder.svg",
      rating: 4.9,
      skillsOffered: ["Cooking", "Baking", "Nutrition"],
      skillsWanted: ["Photography", "Guitar"],
      availability: "Weekends",
      bio: "Professional chef with 10 years experience. Love teaching cooking!",
    },
    {
      id: 2,
      name: "Mike Johnson",
      location: "Austin, TX",
      avatar: "/placeholder.svg",
      rating: 4.7,
      skillsOffered: ["Guitar", "Music Theory", "Songwriting"],
      skillsWanted: ["Web Design", "Spanish"],
      availability: "Evenings",
      bio: "Musician and guitar instructor. Happy to share my passion for music.",
    },
    {
      id: 3,
      name: "Emily Chen",
      location: "Seattle, WA",
      avatar: "/placeholder.svg",
      rating: 4.8,
      skillsOffered: ["Web Design", "React", "UI/UX"],
      skillsWanted: ["Photography", "Yoga"],
      availability: "Flexible",
      bio: "Frontend developer and designer. Love creating beautiful user experiences.",
    },
    {
      id: 4,
      name: "David Rodriguez",
      location: "Miami, FL",
      avatar: "/placeholder.svg",
      rating: 4.6,
      skillsOffered: ["Spanish", "Salsa Dancing", "Travel Planning"],
      skillsWanted: ["Cooking", "Photography"],
      availability: "Weekends",
      bio: "Native Spanish speaker and travel enthusiast. Let's explore cultures together!",
    },
    {
      id: 5,
      name: "David Rodriguez",
      location: "Miami, FL",
      avatar: "/placeholder.svg",
      rating: 4.6,
      skillsOffered: ["Spanish", "Salsa Dancing", "Travel Planning"],
      skillsWanted: ["Cooking", "Photography"],
      availability: "Weekends",
      bio: "Native Spanish speaker and travel enthusiast. Let's explore cultures together!",
    },
    {
      id: 6,
      name: "David Rodriguez",
      location: "Miami, FL",
      avatar: "/placeholder.svg",
      rating: 4.6,
      skillsOffered: ["Spanish", "Salsa Dancing", "Travel Planning"],
      skillsWanted: ["Cooking", "Photography"],
      availability: "Weekends",
      bio: "Native Spanish speaker and travel enthusiast. Let's explore cultures together!",
    },
    {
      id: 7,
      name: "David Rodriguez",
      location: "Miami, FL",
      avatar: "/placeholder.svg",
      rating: 4.6,
      skillsOffered: ["Spanish", "Salsa Dancing", "Travel Planning"],
      skillsWanted: ["Cooking", "Photography"],
      availability: "Weekends",
      bio: "Native Spanish speaker and travel enthusiast. Let's explore cultures together!",
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.skillsWanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filterBy === "all") return matchesSearch
    return matchesSearch && user.skillsOffered.some((skill) => skill.toLowerCase().includes(filterBy.toLowerCase()))
  })

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillSwap</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Skills</h1>
          <p className="text-gray-600">Find people to learn from and teach</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="cooking">Cooking</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="guitar">Guitar</SelectItem>
                  <SelectItem value="web design">Web Design</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* User Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {user.location}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{user.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{user.bio}</p>

                <div>
                  <h4 className="text-sm font-medium mb-2">Can Teach:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Wants to Learn:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Available: {user.availability}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                    <Button size="sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    setCurrentPage(p => Math.max(1, p - 1));
                  }}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={e => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                  }}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {filteredUsers.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-600">No users found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
