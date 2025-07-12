"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Check, X, Clock, Star } from "lucide-react"
import Link from "next/link"

export default function RequestsPage() {
  const [pendingRequests] = useState([
    {
      id: 1,
      from: "Sarah Wilson",
      avatar: "/placeholder.svg",
      skillOffered: "Cooking",
      skillWanted: "Photography",
      message: "Hi! I'd love to teach you cooking in exchange for photography lessons. I'm available weekends.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      from: "Mike Johnson",
      avatar: "/placeholder.svg",
      skillOffered: "Guitar",
      skillWanted: "Web Design",
      message: "Hey! I saw you offer web design. I can teach guitar in return. Let me know if you're interested!",
      timestamp: "1 day ago",
    },
  ])

  const [sentRequests] = useState([
    {
      id: 3,
      to: "Emily Chen",
      avatar: "/placeholder.svg",
      skillOffered: "Photography",
      skillWanted: "React",
      status: "pending",
      timestamp: "3 days ago",
    },
    {
      id: 4,
      to: "David Rodriguez",
      avatar: "/placeholder.svg",
      skillOffered: "Photography",
      skillWanted: "Spanish",
      status: "accepted",
      timestamp: "1 week ago",
    },
  ])

  const [completedSwaps] = useState([
    {
      id: 5,
      partner: "Lisa Park",
      avatar: "/placeholder.svg",
      skill: "Yoga",
      rating: 5,
      feedback: "Amazing teacher! Very patient and knowledgeable.",
      timestamp: "2 weeks ago",
    },
  ])

  const handleAcceptRequest = (requestId: number) => {
    console.log("Accepting request:", requestId)
  }

  const handleRejectRequest = (requestId: number) => {
    console.log("Rejecting request:", requestId)
  }

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Requests</h1>
            <p className="text-gray-600">Manage your skill exchange requests</p>
          </div>

          <Tabs defaultValue="received" className="space-y-6">
            <TabsList>
              <TabsTrigger value="received">Received ({pendingRequests.length})</TabsTrigger>
              <TabsTrigger value="sent">Sent ({sentRequests.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedSwaps.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="received" className="space-y-4">
              {pendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
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
                          <CardTitle className="text-lg">{request.from}</CardTitle>
                          <CardDescription>{request.timestamp}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">Offering:</h4>
                        <Badge variant="default">{request.skillOffered}</Badge>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">Wants:</h4>
                        <Badge variant="outline">{request.skillWanted}</Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Message:</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{request.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleAcceptRequest(request.id)}>
                        <Check className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button variant="outline" onClick={() => handleRejectRequest(request.id)}>
                        <X className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {pendingRequests.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-600">No pending requests at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="sent" className="space-y-4">
              {sentRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={request.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {request.to
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{request.to}</h3>
                          <p className="text-sm text-gray-600">{request.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex gap-2 mb-2">
                            <Badge variant="default" className="text-xs">
                              {request.skillOffered}
                            </Badge>
                            <span className="text-xs text-gray-400">for</span>
                            <Badge variant="outline" className="text-xs">
                              {request.skillWanted}
                            </Badge>
                          </div>
                          <Badge variant={request.status === "accepted" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                        </div>
                        {request.status === "pending" && (
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedSwaps.map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
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
                          <p className="text-sm text-gray-600">Skill: {swap.skill}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < swap.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">{swap.feedback}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{swap.timestamp}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
