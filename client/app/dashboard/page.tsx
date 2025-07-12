"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageSquare, Star, Users, Calendar, Settings, Check, X, Clock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export default function DashboardPage() {
  const [notifications] = useState([
    { id: 1, message: "New swap request from John for Photoshop", time: "2 hours ago" },
    { id: 2, message: "Sarah accepted your cooking lesson request", time: "1 day ago" },
    { id: 3, message: "Reminder: Guitar lesson with Mike tomorrow", time: "2 days ago" },
  ])

  const [activeSwaps] = useState([
    { id: 1, partner: "John Doe", skill: "Photoshop", status: "pending", avatar: "/placeholder.svg" },
    { id: 2, partner: "Sarah Wilson", skill: "Cooking", status: "accepted", avatar: "/placeholder.svg" },
    { id: 3, partner: "Mike Johnson", skill: "Guitar", status: "scheduled", avatar: "/placeholder.svg" },
  ])

  const [pendingRequests] = useState([
    {
      id: 1,
      from: "Alex Thompson",
      avatar: "/placeholder.svg",
      skillOffered: "Guitar Lessons",
      skillWanted: "Photography",
      message: "Hi! I'd love to learn photography from you. I can teach guitar in return. I'm available weekends!",
      timestamp: "2 hours ago",
      rating: 4.8,
      totalSwaps: 12,
    },
    {
      id: 2,
      from: "Maria Garcia",
      avatar: "/placeholder.svg",
      skillOffered: "Spanish Tutoring",
      skillWanted: "Web Design",
      message:
        "Hello! I saw your web design skills. I'm a native Spanish speaker and would love to help you learn Spanish in exchange for web design lessons.",
      timestamp: "5 hours ago",
      rating: 4.9,
      totalSwaps: 18,
    },
    {
      id: 3,
      from: "David Kim",
      avatar: "/placeholder.svg",
      skillOffered: "Cooking Classes",
      skillWanted: "Photoshop",
      message:
        "Hey there! I'm a professional chef and would love to teach you cooking in exchange for Photoshop tutorials. Let me know if you're interested!",
      timestamp: "1 day ago",
      rating: 4.6,
      totalSwaps: 8,
    },
  ])

  const { logout } = useAuth();

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
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Link>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's what's happening with your skill swaps</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="swaps" className="space-y-6">
              <TabsList>
                <TabsTrigger value="swaps">Active Swaps</TabsTrigger>
                <TabsTrigger value="requests">Requests ({pendingRequests.length})</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="swaps" className="space-y-4">
                {activeSwaps.map((swap) => (
                  <Card key={swap.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={swap.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {swap.partner
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{swap.partner}</h3>
                            <p className="text-sm text-gray-600">Teaching: {swap.skill}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              swap.status === "accepted"
                                ? "default"
                                : swap.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {swap.status}
                          </Badge>
                          <Button size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="requests" className="space-y-4">
                {pendingRequests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={request.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {request.from
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{request.from}</h3>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium ml-1">{request.rating}</span>
                              </div>
                              <span className="text-sm text-gray-400">•</span>
                              <span className="text-sm text-gray-600">{request.totalSwaps} swaps</span>
                            </div>
                            <p className="text-sm text-gray-600">{request.timestamp}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Offering:</h4>
                          <Badge variant="default">{request.skillOffered}</Badge>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Wants to learn:</h4>
                          <Badge variant="outline">{request.skillWanted}</Badge>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Message:</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{request.message}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm">
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          <X className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Swap History</CardTitle>
                    <CardDescription>Your completed skill exchanges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">No completed swaps yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/browse">
                  <Button className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Browse Skills
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Skills Taught</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Skills Learned</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold ml-1">4.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
