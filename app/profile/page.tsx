"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, Calendar, Bike, Settings, Edit } from "lucide-react"

interface UserData {
  name: string
  email: string
  avatar: string
  location: string
  joinDate: string
  bio: string
  stats: {
    rides: number
    routes: number
    distance: string
  }
  badges: string[]
}

export default function ProfilePage() {
  const [user] = useState<UserData>({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/api/placeholder/150/150",
    location: "San Francisco, CA",
    joinDate: "March 2024",
    bio: "Passionate motorcyclist and adventure seeker. Love exploring new routes and meeting fellow riders.",
    stats: {
      rides: 47,
      routes: 12,
      distance: "2,847 km"
    },
    badges: ["Early Adopter", "Route Creator", "Community Leader"]
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your account and view your riding statistics
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card className="sticky top-6">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100 shadow-lg mx-auto">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="text-sm">{user.email}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {user.joinDate}</span>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Bio</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {user.bio}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Badges</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.badges.map((badge: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bike className="h-5 w-5" />
                  Riding Statistics
                </CardTitle>
                <CardDescription>
                  Your riding activity and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {user.stats.rides}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Total Rides
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {user.stats.routes}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Routes Created
                    </div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {user.stats.distance}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Distance Ridden
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest rides and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Bike className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Completed Route: Pacific Coast Highway</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        2 days ago • 450 km
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Joined New Group: Bay Area Riders</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        1 week ago
                      </div>
                    </div>
                    <Badge variant="outline">New Member</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Created Route: Mountain Pass Adventure</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        2 weeks ago • 320 km
                      </div>
                    </div>
                    <Badge variant="secondary">Route Creator</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Bike className="h-5 w-5" />
                    <span>Start New Ride</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>Create Route</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <User className="h-5 w-5" />
                    <span>Find Riders</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
