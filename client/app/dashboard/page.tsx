"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  MessageSquare,
  Star,
  Users,
  Calendar,
  Settings,
  Check,
  X,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const [notifications] = useState([
    {
      id: 1,
      message: "New swap request from John for Photoshop",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Sarah accepted your cooking lesson request",
      time: "1 day ago",
    },
    {
      id: 3,
      message: "Reminder: Guitar lesson with Mike tomorrow",
      time: "2 days ago",
    },
  ]);

  // Swaps (requests) state
  const [requests, setRequests] = useState<any[]>([]);
  const [requestsPage, setRequestsPage] = useState(1);
  const [requestsTotalPages, setRequestsTotalPages] = useState(1);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [requestsError, setRequestsError] = useState("");
  // Get current user id
  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  useEffect(() => {
    if (!currentUserId) return;
    setRequestsLoading(true);
    setRequestsError("");
    fetch(`http://localhost:5000/api/swaps/from/${currentUserId}?page=${requestsPage}&limit=5`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.data)) {
          setRequests(data.data);
          setRequestsTotalPages(data.totalPages || 1);
        } else {
          setRequests([]);
          setRequestsTotalPages(1);
        }
      })
      .catch(() => {
        setRequestsError("Failed to fetch requests.");
        setRequests([]);
        setRequestsTotalPages(1);
      })
      .finally(() => setRequestsLoading(false));
  }, [currentUserId, requestsPage]);

  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {" "}
          <Link
            href="/browse"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillSwap</span>
          </Link>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your skill swaps
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="requests" className="space-y-6">
              <TabsList>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="requests" className="space-y-4">
                {requestsLoading ? (
                  <div className="text-center py-8">Loading requests...</div>
                ) : requestsError ? (
                  <div className="text-center text-red-600 py-8">{requestsError}</div>
                ) : requests.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <p className="text-gray-600">No requests found.</p>
                    </CardContent>
                  </Card>
                ) : (
                  requests.map((request) => (
                    <Card key={request._id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={request.fromUser?.profilePhoto || "/placeholder.svg"} />
                              <AvatarFallback>
                                {request.fromUser?.name
                                  ? request.fromUser.name.split(" ").map((n: string) => n[0]).join("")
                                  : "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{request.fromUser?.name || "Unknown"}</h3>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium ml-1">{request.fromUser?.rating ?? "-"}</span>
                                </div>
                                <span className="text-sm text-gray-400">•</span>
                                <span className="text-sm text-gray-600">{request.fromUser?.email}</span>
                              </div>
                              <p className="text-sm text-gray-600">{new Date(request.createdAt).toLocaleString()}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {request.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Skill Offered:</h4>
                            <Badge variant="default">{request.skillOffered}</Badge>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Skill Requested:</h4>
                            <Badge variant="outline">{request.skillRequested}</Badge>
                          </div>
                        </div>

                        {request.message && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Message:</h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{request.message}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
                {/* Pagination Controls */}
                {requestsTotalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRequestsPage((p) => Math.max(1, p - 1))}
                      disabled={requestsPage === 1}
                      className="mr-2"
                    >
                      Previous
                    </Button>
                    <span className="px-2 py-1 text-sm">Page {requestsPage} of {requestsTotalPages}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setRequestsPage((p) => Math.min(requestsTotalPages, p + 1))}
                      disabled={requestsPage === requestsTotalPages}
                      className="ml-2"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle>Swap History</CardTitle>
                    <CardDescription>
                      Your completed skill exchanges
                    </CardDescription>
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
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
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
                  <div
                    key={notification.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
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
  );
}
