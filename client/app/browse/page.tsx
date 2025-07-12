"use client"

import { useState, useEffect } from "react"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const [users, setUsers] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestTargetUser, setRequestTargetUser] = useState<any>(null);
  const [requestSkillOffered, setRequestSkillOffered] = useState("");
  const [requestSkillRequested, setRequestSkillRequested] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestFeedback, setRequestFeedback] = useState<string | null>(null);
  // Get current user id and skills from localStorage or context
  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  // Optionally, fetch current user skills from profile API if not available in context
  const [currentUserSkills, setCurrentUserSkills] = useState<string[]>([]);
  useEffect(() => {
    if (currentUserId) {
      fetch(`http://localhost:5000/api/users/${currentUserId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.user && Array.isArray(data.user.skillsOffered)) {
            setCurrentUserSkills(data.user.skillsOffered);
          }
        });
    }
  }, [currentUserId]);

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    params.append("page", String(currentPage));
    params.append("limit", String(usersPerPage));
    if (filterBy !== "all") params.append("skill", filterBy);
    if (availability !== "all") params.append("availability", availability);
    if (searchTerm) params.append("search", searchTerm);
    fetch(`http://localhost:5000/api/users/public-paginated?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.data)) {
          setUsers(data.data);
          setTotalPages(data.totalPages || 1);
        } else {
          setUsers([]);
          setTotalPages(1);
        }
      })
      .catch(() => {
        setError("Failed to fetch users.");
        setUsers([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [searchTerm, filterBy, availability, currentPage]);

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
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="Weekends">Weekends</SelectItem>
                  <SelectItem value="Weekdays">Weekdays</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* User Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">Loading users...</div>
          ) : users.length === 0 ? (
            <Card className="text-center py-12 col-span-full">
              <CardContent>
                <p className="text-gray-600">No users found matching your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            users.map((user) => (
              <Card key={user._id || user.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.profilePhoto || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
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
                      {user.skillsOffered && user.skillsOffered.length > 0 ? user.skillsOffered.map((skill: string) => (
                        <Badge key={skill} variant="default" className="text-xs">
                          {skill}
                        </Badge>
                      )) : <span className="text-xs text-gray-400">None</span>}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Wants to Learn:</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsWanted && user.skillsWanted.length > 0 ? user.skillsWanted.map((skill: string) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      )) : <span className="text-xs text-gray-400">None</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600">Available: {Array.isArray(user.availability) ? user.availability.join(", ") : user.availability}</span>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => {
                        setRequestTargetUser(user);
                        setShowRequestModal(true);
                        setRequestSkillOffered("");
                        setRequestSkillRequested("");
                        setRequestMessage("");
                        setRequestFeedback(null);
                      }}>
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Request
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
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
      </div>

      {/* Request Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Swap Request</DialogTitle>
            <DialogDescription>
              Choose a skill you can offer and one you want to learn from {requestTargetUser?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setRequestLoading(true);
            setRequestFeedback(null);
            try {
              console.log({requestSkillOffered , requestSkillRequested})
              const res = await fetch("http://localhost:5000/api/swaps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  fromUser: currentUserId,
                  toUser: requestTargetUser?._id || requestTargetUser?.id,
                  skillOffered: requestSkillOffered,
                  skillRequested: requestSkillRequested,
                  message: requestMessage,
                })
              });
              if (res.ok) {
                setRequestFeedback("Request sent successfully!");
                setTimeout(() => setShowRequestModal(false), 1200);
              } else {
                const data = await res.json();
                console.log(data)
                setRequestFeedback(data.error || "Failed to send request.");
              }
            } catch {
              setRequestFeedback("Network error. Please try again.");
            } finally {
              setRequestLoading(false);
            }
          }}>
            <div className="mb-4">
              <label className="block mb-1">Skill Offered</label>
              <Select value={requestSkillOffered} onValueChange={setRequestSkillOffered} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a skill you offer" />
                </SelectTrigger>
                <SelectContent>
                  {currentUserSkills.length > 0 ? currentUserSkills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  )) : <SelectItem value="none" disabled>No skills found</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Skill Requested</label>
              <Select value={requestSkillRequested} onValueChange={setRequestSkillRequested} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a skill you want" />
                </SelectTrigger>
                <SelectContent>
                  {requestTargetUser?.skillsWanted && requestTargetUser.skillsWanted.length > 0 ? requestTargetUser.skillsWanted.map((skill: string) => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  )) : <SelectItem value="none" disabled>No skills found</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Message</label>
              <Textarea value={requestMessage} onChange={e => setRequestMessage(e.target.value)} placeholder="Write a message..." rows={4} />
            </div>
            {requestFeedback && <div className={`mb-2 text-sm ${requestFeedback.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{requestFeedback}</div>}
            <DialogFooter>
              <Button type="submit" disabled={requestLoading || !requestSkillOffered || !requestSkillRequested}>
                {requestLoading ? "Sending..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
