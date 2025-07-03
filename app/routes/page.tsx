"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Calendar, Clock, Users, Star, X, Navigation, Route } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Mock data for routes
const routes = [
  {
    id: 1,
    title: "Pacific Coast Highway Adventure",
    description: "Scenic coastal ride through California's most beautiful landscapes",
    difficulty: "Intermediate",
    distance: "450 miles",
    duration: "2 days",
    startLocation: "San Francisco, CA",
    endLocation: "Los Angeles, CA",
    date: "2024-01-15",
    time: "08:00 AM",
    maxParticipants: 12,
    currentParticipants: 8,
    rating: 4.8,
    creator: {
      name: "Mike Rodriguez",
      avatar: "/placeholder-user.jpg",
      rating: 4.9,
      ridesLed: 23,
    },
    meetingPoint: "Golden Gate Bridge Parking Area",
    highlights: ["Big Sur coastline", "Hearst Castle", "Malibu beaches"],
    requirements: ["Valid motorcycle license", "Highway riding experience", "Full tank of gas"],
    participants: [
      { name: "Sarah Johnson", avatar: "/placeholder-user.jpg", bike: "Harley Davidson" },
      { name: "Tom Wilson", avatar: "/placeholder-user.jpg", bike: "BMW R1250GS" },
      { name: "Lisa Chen", avatar: "/placeholder-user.jpg", bike: "Yamaha MT-07" },
      { name: "David Brown", avatar: "/placeholder-user.jpg", bike: "Honda CB650R" },
      { name: "Emma Davis", avatar: "/placeholder-user.jpg", bike: "Kawasaki Ninja" },
      { name: "Alex Miller", avatar: "/placeholder-user.jpg", bike: "Ducati Monster" },
      { name: "Rachel Green", avatar: "/placeholder-user.jpg", bike: "Triumph Street Triple" },
      { name: "Chris Taylor", avatar: "/placeholder-user.jpg", bike: "Suzuki GSX-R" },
    ],
    mapImage: "/placeholder.svg?height=200&width=400&text=Route+Map",
  },
  {
    id: 2,
    title: "Mountain Pass Challenge",
    description: "Thrilling ride through winding mountain roads",
    difficulty: "Advanced",
    distance: "280 miles",
    duration: "1 day",
    startLocation: "Denver, CO",
    endLocation: "Aspen, CO",
    date: "2024-01-20",
    time: "07:00 AM",
    maxParticipants: 8,
    currentParticipants: 6,
    rating: 4.9,
    creator: {
      name: "Jessica Martinez",
      avatar: "/placeholder-user.jpg",
      rating: 4.8,
      ridesLed: 31,
    },
    meetingPoint: "REI Denver Flagship Store",
    highlights: ["Rocky Mountain views", "Independence Pass", "Alpine scenery"],
    requirements: ["Advanced riding skills", "Mountain riding experience", "Cold weather gear"],
    participants: [
      { name: "Mark Thompson", avatar: "/placeholder-user.jpg", bike: "BMW S1000RR" },
      { name: "Jennifer Lee", avatar: "/placeholder-user.jpg", bike: "Aprilia RSV4" },
      { name: "Robert Kim", avatar: "/placeholder-user.jpg", bike: "Yamaha R1" },
      { name: "Amanda White", avatar: "/placeholder-user.jpg", bike: "Ducati Panigale" },
      { name: "Steve Garcia", avatar: "/placeholder-user.jpg", bike: "Honda CBR1000RR" },
      { name: "Nicole Adams", avatar: "/placeholder-user.jpg", bike: "Kawasaki ZX-10R" },
    ],
    mapImage: "/placeholder.svg?height=200&width=400&text=Mountain+Route",
  },
  {
    id: 3,
    title: "Desert Sunset Cruise",
    description: "Relaxing evening ride through desert landscapes",
    difficulty: "Beginner",
    distance: "120 miles",
    duration: "4 hours",
    startLocation: "Phoenix, AZ",
    endLocation: "Sedona, AZ",
    date: "2024-01-25",
    time: "03:00 PM",
    maxParticipants: 15,
    currentParticipants: 12,
    rating: 4.6,
    creator: {
      name: "Carlos Mendez",
      avatar: "/placeholder-user.jpg",
      rating: 4.7,
      ridesLed: 18,
    },
    meetingPoint: "Harley-Davidson of Scottsdale",
    highlights: ["Red rock formations", "Desert sunset", "Scenic overlooks"],
    requirements: ["Basic riding skills", "Sun protection", "Water bottle"],
    participants: [
      { name: "Maria Gonzalez", avatar: "/placeholder-user.jpg", bike: "Indian Scout" },
      { name: "John Anderson", avatar: "/placeholder-user.jpg", bike: "Harley Street Glide" },
      { name: "Patricia Moore", avatar: "/placeholder-user.jpg", bike: "Honda Rebel" },
      { name: "Kevin Clark", avatar: "/placeholder-user.jpg", bike: "Yamaha Bolt" },
      { name: "Linda Rodriguez", avatar: "/placeholder-user.jpg", bike: "Kawasaki Vulcan" },
      { name: "Michael Lewis", avatar: "/placeholder-user.jpg", bike: "Suzuki Boulevard" },
      { name: "Sandra Walker", avatar: "/placeholder-user.jpg", bike: "Victory Octane" },
      { name: "Daniel Hall", avatar: "/placeholder-user.jpg", bike: "BMW R18" },
      { name: "Karen Young", avatar: "/placeholder-user.jpg", bike: "Triumph Bonneville" },
      { name: "Paul Allen", avatar: "/placeholder-user.jpg", bike: "Moto Guzzi V7" },
      { name: "Nancy King", avatar: "/placeholder-user.jpg", bike: "Royal Enfield" },
      { name: "Gary Wright", avatar: "/placeholder-user.jpg", bike: "Harley Iron 883" },
    ],
    mapImage: "/placeholder.svg?height=200&width=400&text=Desert+Route",
  },
]

export default function RoutesPage() {
  const { t } = useLanguage()
  const [selectedRoute, setSelectedRoute] = useState<(typeof routes)[0] | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "intermediate":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">{t("routes")}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t("discover_scenic_routes")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <Card
            key={route.id}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 bg-white dark:bg-gray-900 overflow-hidden"
            onClick={() => setSelectedRoute(route)}
          >
            {/* Route Image */}
            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge className={`${getDifficultyColor(route.difficulty)} font-semibold`}>
                  {route.difficulty}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 dark:bg-gray-900/90 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                <span className="text-sm font-medium text-black dark:text-white">{route.rating}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white mb-1">{route.title}</h3>
                <p className="text-sm text-white/90 line-clamp-2">{route.description}</p>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Route Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">{route.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">{route.duration}</span>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(route.date).toLocaleDateString()}</span>
                  <span className="ml-2">{route.time}</span>
                </div>

                {/* Route Locations */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Navigation className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">From: {route.startLocation}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">To: {route.endLocation}</span>
                  </div>
                </div>

                {/* Creator and Participants */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={route.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                        {route.creator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">{route.creator.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{route.creator.ridesLed} rides led</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {route.currentParticipants}/{route.maxParticipants}
                    </span>
                  </div>
                </div>

                {/* Join Button */}
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                  disabled={route.currentParticipants >= route.maxParticipants}
                >
                  {route.currentParticipants >= route.maxParticipants ? "Route Full" : "Join Route"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Route Details Dialog - Mobile Optimized */}
      <Dialog open={!!selectedRoute} onOpenChange={() => setSelectedRoute(null)}>
        <DialogContent className="!fixed !inset-0 !w-full !h-full !max-w-none !max-h-none !rounded-none !p-0 !left-0 !top-0  !transform-none bg-white/95 dark:bg-black backdrop-blur-md border-0 md:!max-w-4xl md:!max-h-[90vh] md:!inset-auto md:!top-1/2 md:!left-1/2 md:!transform md:!-translate-x-1/2 md:!-translate-y-1/2 md:rounded-lg">
          {selectedRoute && (
            <>
              {/* Fixed Header */}
              <div className="flex-shrink-0 p-4 md:p-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 md:space-x-3 mb-2">
                      <Badge className={getDifficultyColor(selectedRoute.difficulty)}>{selectedRoute.difficulty}</Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                        <span className="font-medium text-black dark:text-white">{selectedRoute.rating}</span>
                      </div>
                    </div>
                    <h2 className="text-lg md:text-xl lg:text-2xl mb-2 text-black dark:text-white font-bold truncate">{selectedRoute.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base line-clamp-2">{selectedRoute.description}</p>
                  </div>
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 ml-2 md:ml-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setSelectedRoute(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button> */}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pt-4 pb-20 md:pb-6 mb-[130px]">
                <div className="space-y-4 md:space-y-6">
                  {/* Creator Info */}
                  <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg">
                    <Avatar className="w-10 h-10 md:w-12 md:h-12">
                      <AvatarImage src={selectedRoute.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                        {selectedRoute.creator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-black dark:text-white truncate">{selectedRoute.creator.name}</h3>
                      <div className="flex items-center space-x-2 md:space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                          <span>{selectedRoute.creator.rating}</span>
                        </div>
                        <span>{selectedRoute.creator.ridesLed} rides led</span>
                      </div>
                    </div>
                  </div>

                  {/* Route Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-sm md:text-base text-black dark:text-white">Route Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <strong>Distance:</strong> {selectedRoute.distance}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <strong>Duration:</strong> {selectedRoute.duration}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Navigation className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <strong>Start:</strong> {selectedRoute.startLocation}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <strong>End:</strong> {selectedRoute.endLocation}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-sm md:text-base text-black dark:text-white">Meeting Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <strong>Date:</strong> {new Date(selectedRoute.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <strong>Time:</strong> {selectedRoute.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <strong>Meeting Point:</strong> {selectedRoute.meetingPoint}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                              <strong>Participants:</strong> {selectedRoute.currentParticipants}/
                              {selectedRoute.maxParticipants}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2 text-sm md:text-base text-black dark:text-white">Highlights</h3>
                        <ul className="space-y-1 text-sm">
                          {selectedRoute.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 text-sm md:text-base text-black dark:text-white">Requirements</h3>
                        <ul className="space-y-1 text-sm">
                          {selectedRoute.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div>
                    <h3 className="font-semibold mb-3 text-sm md:text-base text-black dark:text-white">Route Map</h3>
                    <div className="bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden">
                      <img
                        src={selectedRoute.mapImage || "/placeholder.svg"}
                        alt="Route map"
                        className="w-full h-32 md:h-48 lg:h-64 object-cover"
                      />
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="pb-4">
                    <h3 className="font-semibold mb-3 text-sm md:text-base text-black dark:text-white">
                      Participants ({selectedRoute.currentParticipants}/{selectedRoute.maxParticipants})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {selectedRoute.participants.map((participant, index) => (
                        <div key={index} className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg">
                          <Avatar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                              {participant.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-xs md:text-sm truncate text-black dark:text-white">{participant.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{participant.bike}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="fixed bottom-0 left-0 right-0 p-4 pb-[110px] md:p-6 pt-4 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 backdrop-blur-sm md:relative md:flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                    disabled={selectedRoute.currentParticipants >= selectedRoute.maxParticipants}
                  >
                    {selectedRoute.currentParticipants >= selectedRoute.maxParticipants ? "Route Full" : "Join Route"}
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Contact Organizer
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
