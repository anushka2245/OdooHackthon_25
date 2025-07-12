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
    fetch(`http://localhost:5000/api/swaps?userId=${currentUserId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRequests(data);
          setRequestsTotalPages(1); // No pagination in this response, so just 1 page
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
  }, [currentUserId]);

  const handleRequestAction = async (id: string, action: 'accepted' | 'rejected') => {
    if (action === 'rejected') {
      // DELETE the swap request
      try {
        const res = await fetch(`http://localhost:5000/api/swaps/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setRequests((prev) => prev.filter(r => r._id !== id));
        }
      } catch {}
    } else if (action === 'accepted') {
      // PATCH to accept, then fetch the updated request
      try {
        const res = await fetch(`http://localhost:5000/api/swaps/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'accepted' })
        });
        if (res.ok) {
          // Fetch the updated request
          const updatedRes = await fetch(`http://localhost:5000/api/swaps/${id}`);
          if (updatedRes.ok) {
            const updatedRequest = await updatedRes.json();
            setRequests((prev) => prev.map(r => r._id === id ? updatedRequest : r));
          }
        }
      } catch {}
    }
  };

  const handleRequestDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/swaps/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRequests((prev) => prev.filter(r => r._id !== id));
      }
    } catch {}
  };

  const { logout, user } = useAuth();

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
            Welcome back, {user?.name || "there"}!
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
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">From:</span>
                              <span>{request.fromUser?.email || "Unknown"}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="font-semibold">To:</span>
                              <span>{request.toUser?.email || "Unknown"}</span>
                            </div>
                          </div>
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {request.status}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-2">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Skill Offered:</h4>
                            <Badge variant="default">{request.skillOffered}</Badge>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Skill Requested:</h4>
                            <Badge variant="outline">{request.skillRequested}</Badge>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">Requested at: {new Date(request.createdAt).toLocaleString()}</div>
                        {request.message && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Message:</h4>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{request.message}</p>
                          </div>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="default" disabled={request.status === 'accepted'} onClick={() => handleRequestAction(request._id, 'accepted')}>
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" disabled={request.status === 'rejected'} onClick={() => handleRequestAction(request._id, 'rejected')}>
                            Reject
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRequestDelete(request._id)}>
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
                {/* No pagination controls since API does not provide pagination info */}
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
