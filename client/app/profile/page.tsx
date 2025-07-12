"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
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
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    isPublic: true,
    availability: "weekends",
  });
  
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Get userId from localStorage or user context
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const id = userId || user?.id;
    if (!id) return;
    console.log({userId})
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        data = data.user;
        if (data) {
          setProfile(prev => ({
            ...prev,
            name: data.name || prev.name,
            email: data.email || prev.email,
            location: data.location || "",
            bio: data.bio || "",
            isPublic: data.isPublic !== undefined ? data.isPublic : true,
            availability: data.availability || "weekends",
          }));
          setSkillsOffered(Array.isArray(data.skillsOffered) ? data.skillsOffered : []);
          setSkillsWanted(Array.isArray(data.skillsWanted) ? data.skillsWanted : []);
        }
      });
  }, [user]);

  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  const addSkill = (type: "offered" | "wanted") => {
    if (type === "offered") {
      if (newSkillOffered.trim()) {
        setSkillsOffered([...skillsOffered, newSkillOffered.trim()]);
        setNewSkillOffered("");
      }
    } else {
      if (newSkillWanted.trim()) {
        setSkillsWanted([...skillsWanted, newSkillWanted.trim()]);
        setNewSkillWanted("");
      }
    }
  }

  const removeSkill = (skill: string, type: "offered" | "wanted") => {
    if (type === "offered") {
      setSkillsOffered(skillsOffered.filter((s) => s !== skill))
    } else {
      setSkillsWanted(skillsWanted.filter((s) => s !== skill))
    }
  }

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage(null);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const id = userId || user?.id;
    if (!id) {
      setSaveMessage('User ID not found.');
      setSaving(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          location: profile.location,
          bio: profile.bio,
          isPublic: profile.isPublic,
          skillsOffered,
          skillsWanted,
          availability: Array.isArray(profile.availability) ? profile.availability : [profile.availability],
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSaveMessage('Profile updated successfully!');
      } else {
        setSaveMessage(data.error || 'Failed to update profile.');
      }
    } catch (err) {
      setSaveMessage('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/browse" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillSwap</span>
          </Link>
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
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {profile.name
                          ? profile.name.split(" ").map((n) => n[0]).join("")
                          : "U"}
                      </AvatarFallback>
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

                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  {saveMessage && (
                    <div className={`mt-2 text-sm ${saveMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{saveMessage}</div>
                  )}
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
                        value={newSkillOffered}
                        onChange={(e) => setNewSkillOffered(e.target.value)}
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
                        value={newSkillWanted}
                        onChange={(e) => setNewSkillWanted(e.target.value)}
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
