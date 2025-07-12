"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Shield, Ban, CheckCircle, AlertTriangle } from "lucide-react"

export default function AdminPage() {
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", joinDate: "2024-01-15", swaps: 12 },
    { id: 2, name: "Sarah Wilson", email: "sarah@example.com", status: "active", joinDate: "2024-02-20", swaps: 8 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "banned", joinDate: "2024-01-10", swaps: 3 },
    { id: 4, name: "Emily Chen", email: "emily@example.com", status: "active", joinDate: "2024-03-05", swaps: 15 }
  ])

  const [swaps] = useState([
    { id: 1, user1: "John Doe", user2: "Sarah Wilson", skill1: "Photography", skill2: "Cooking", status: "completed", date: "2024-03-10" },
    { id: 2, user1: "Mike Johnson", user2: "Emily Chen", skill1: "Guitar", skill2: "Web Design", status: "pending", date: "2024-03-12" },
    { id: 3, user1: "Sarah Wilson", user2: "Emily Chen", skill1: "Cooking", skill2: "React", status: "active", date: "2024-03-08" }
  ])

  const [reports] = useState([
    { id: 1, reporter: "John Doe", reported: "Mike Johnson", reason: "Inappropriate behavior", status: "pending", date: "2024-03-11" },
    { id: 2, reporter: "Sarah Wilson", reported: "Unknown User", reason: "Spam messages", status: "resolved", date: "2024-03-09" }
  ])

  const [globalMessage, setGlobalMessage] = useState("")

  const handleBanUser = (userId: number) => {
    console.log("Banning user:", userId)
  }

  const handleUnbanUser = (userId: number) => {
    console.log("Unbanning user:", userId)
  }

  const handleSendGlobalMessage = () => {
    console.log("Sending global message:", globalMessage)
    setGlobalMessage("")
  }

  const handleDownloadReport = (type: string) => {
    console.log("Downloading report:", type)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <Badge variant="destructive">Admin Access</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, monitor swaps, and oversee platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Swaps</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reports</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Banned Users</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Ban className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="swaps">Swap Monitoring</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="messages">Global Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input placeholder="Search users..." className="max-w-sm" />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Swaps</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.swaps}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {user.status === 'active' ? (
                              <Button size="sm" variant="destructive" onClick={() => handleBanUser(user.id)}>
                                Ban
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => handleUnbanUser(user.id)}>
                                Unban
                              </Button>
                            )}
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="swaps">
            <Card>
              <CardHeader>
                <CardTitle>Swap Monitoring</CardTitle>
                <CardDescription>Monitor all skill exchange activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participants</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {swaps.map((swap) => (
                      <TableRow key={swap.id}>
                        <TableCell>{swap.user1} ↔ {swap.user2}</TableCell>
                        <TableCell>{swap.skill1} ↔ {swap.skill2}</TableCell>
                        <TableCell>
                          <Badge variant={
                            swap.status === 'completed' ? 'default' : 
                            swap.status === 'active' ? 'secondary' : 'outline'
                          }>
                            {swap.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{swap.date}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>User Reports</CardTitle>
                <CardDescription>Review and handle user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.reporter}</TableCell>
                        <TableCell>{report.reported}</TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === 'resolved' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Review</Button>
                            {report.status === 'pending' && (
                              <Button size="sm">Resolve</Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            \
