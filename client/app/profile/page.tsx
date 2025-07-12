"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Camera, Users } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York, NY",
    bio: "Passionate about learning and teaching new skills. Love photography and cooking!",
    isPublic: true,
    availability: "weekends",
  })

  const [skillsOffered, setSkillsOffered] = useState(["Photography", "Photoshop", "Web Design", "Cooking"])

  const [skillsWanted, setSkillsWanted] = useState(["Guitar", "Spanish", "Yoga", "Woodworking"])

  const [newSkill, setNewSkill] = useState("")

  const addSkill = (type: "offered" | "wanted") => {
    if (newSkill.trim()) {
      if (type === "offered") {
        setSkillsOffered([...skillsOffered, newSkill.trim()])
      } else {
        setSkillsWanted([...skillsWanted, newSkill.trim()])
      }
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string, type: "offered" | "wanted") => {
    if (type === "offered") {
      setSkillsOffered(skillsOffered.filter((s) => s !== skill))
    } else {
      setSkillsWanted(skillsWanted.filter((s) => s !== skill))
    }
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
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your profile and skill preferences</p>
          </div>

          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell others about yourself..."
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Skills Offered */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills I Can Teach</CardTitle>
                    <CardDescription>What skills can you offer to others?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {skillsOffered.map((skill) => (
                        <Badge key={skill} variant="default" className="flex items-center gap-1">
                          {skill}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill, "offered")} />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill("offered")}
                      />
                      <Button onClick={() => addSkill("offered")}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Wanted */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills I Want to Learn</CardTitle>
                    <CardDescription>What skills are you looking to learn?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {skillsWanted.map((skill) => (
                        <Badge key={skill} variant="outline" className="flex items-center gap-1">
                          {skill}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(skill, "wanted")} />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill("wanted")}
                      />
                      <Button onClick={() => addSkill("wanted")}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Configure your availability and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={profile.availability}
                      onValueChange={(value) => setProfile({ ...profile, availability: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="evenings">Evenings</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Profile</Label>
                      <p className="text-sm text-gray-600">Allow others to find and view your profile</p>
                    </div>
                    <Switch
                      checked={profile.isPublic}
                      onCheckedChange={(checked) => setProfile({ ...profile, isPublic: checked })}
                    />
                  </div>

                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
