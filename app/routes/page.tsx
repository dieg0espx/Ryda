"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Calendar, Clock, Users, Star, X, Navigation, Route as RouteIcon } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getRoutes, joinRoute, leaveRoute, type Route } from "@/lib/routes-storage"
import { toast } from "sonner"
import CreateRouteForm from "@/components/create-route-form"
import JoinRouteDialog from "@/components/join-route-dialog"

export default function RoutesPage() {
  const { t } = useLanguage()
  const [routes, setRoutes] = useState<Route[]>([])
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [loading, setLoading] = useState(true)
  const [joinDialogOpen, setJoinDialogOpen] = useState(false)
  const [joiningRouteId, setJoiningRouteId] = useState<number | null>(null)
  const [joinLoading, setJoinLoading] = useState(false)
  const [filterType, setFilterType] = useState<"all" | "my">("all")

  // Load routes on component mount
  useEffect(() => {
    loadRoutes()
  }, [])

  const loadRoutes = () => {
    try {
      const loadedRoutes = getRoutes()
      setRoutes(loadedRoutes)
    } catch (error) {
      console.error('Error loading routes:', error)
      toast.error('Failed to load routes')
    } finally {
      setLoading(false)
    }
  }

  // Refresh routes when selected route changes
  useEffect(() => {
    if (selectedRoute) {
      const updatedRoute = routes.find(r => r.id === selectedRoute.id)
      if (updatedRoute) {
        setSelectedRoute(updatedRoute)
      }
    }
  }, [routes, selectedRoute])

  // Filter routes based on selection
  const filteredRoutes = routes.filter(route => {
    if (filterType === "all") return true
    if (filterType === "my") return isUserInRoute(route)
    return true
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "intermediate":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleJoinClick = (routeId: number) => {
    setJoiningRouteId(routeId)
    setJoinDialogOpen(true)
  }

  const handleJoinSubmit = async (data: { bike: string; hasPassenger: boolean; passengerName?: string }) => {
    if (!joiningRouteId) return

    setJoinLoading(true)
    try {
      // Mock user data - in a real app, this would come from authentication
      const mockUser = {
        name: "Test User",
        avatar: "/placeholder-user.jpg",
        bike: data.bike,
        hasPassenger: data.hasPassenger,
        passengerName: data.passengerName
      }

      const success = joinRoute(joiningRouteId, mockUser)
      if (success) {
        // Refresh routes
        const updatedRoutes = getRoutes()
        setRoutes(updatedRoutes)
        toast.success('Successfully joined the route!')
        setJoinDialogOpen(false)
      } else {
        toast.error('Failed to join route. Route might be full.')
      }
    } catch (error) {
      console.error('Error joining route:', error)
      toast.error('Failed to join route')
    } finally {
      setJoinLoading(false)
    }
  }

  const handleLeaveRoute = (routeId: number) => {
    try {
      const success = leaveRoute(routeId, "Test User")
      if (success) {
        // Refresh routes
        const updatedRoutes = getRoutes()
        setRoutes(updatedRoutes)
        toast.success('Successfully left the route!')
      } else {
        toast.error('Failed to leave route.')
      }
    } catch (error) {
      console.error('Error leaving route:', error)
      toast.error('Failed to leave route')
    }
  }

  const isUserInRoute = (route: Route) => {
    return route.participants.some(p => p.name === "Test User")
  }

  const getUserParticipantInfo = (route: Route) => {
    return route.participants.find(p => p.name === "Test User")
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading routes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">{t("routes")}</h1>
              <p className="text-gray-600 dark:text-gray-400">{t("discover_scenic_routes")}</p>
            </div>
            <CreateRouteForm onRouteCreated={loadRoutes} />
          </div>
        </div>

        {/* Route Filter Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-full max-w-xs">
              <button
                onClick={() => setFilterType("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 ${
                  filterType === "all"
                    ? "bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                All Routes
              </button>
              <button
                onClick={() => setFilterType("my")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 ${
                  filterType === "my"
                    ? "bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                My Routes
              </button>
            </div>
          </div>
        </div>

        {filteredRoutes.length === 0 ? (
          <div className="text-center py-12">
            <RouteIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {filterType === "all" ? "No routes available" : "No routes joined"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filterType === "all" 
                ? "Check back later for new routes!" 
                : "Join some routes to see them here!"
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRoutes.map((route) => {
              const userParticipant = getUserParticipantInfo(route)
              const isInRoute = isUserInRoute(route)
              
              return (
                <Card
                  key={route.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600  overflow-hidden"
                  onClick={() => setSelectedRoute(route)}
                >
                  {/* Route Image */}
                  <div className="relative h-48 ">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent border-b border-gray-200 dark:border-gray-800" />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getDifficultyColor(route.difficulty)} font-semibold`}>
                        {route.difficulty}
                      </Badge>
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

                      {/* User's bike info if joined */}
                      {isInRoute && userParticipant && (
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                          <p className="text-xs text-orange-800 dark:text-orange-300 font-medium">
                            Your bike: {userParticipant.bike}
                          </p>
                          {userParticipant.hasPassenger && userParticipant.passengerName && (
                            <p className="text-xs text-orange-700 dark:text-orange-400">
                              Passenger: {userParticipant.passengerName}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Join/Leave Button */}
                      <Button
                        className={`w-full font-semibold ${
                          isInRoute
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : route.currentParticipants >= route.maxParticipants
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                        }`}
                        disabled={route.currentParticipants >= route.maxParticipants && !isInRoute}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (isInRoute) {
                            handleLeaveRoute(route.id)
                          } else {
                            handleJoinClick(route.id)
                          }
                        }}
                      >
                        {route.currentParticipants >= route.maxParticipants && !isInRoute
                          ? "Route Full"
                          : isInRoute
                          ? "Leave Route"
                          : "Join Route"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Join Route Dialog */}
      <JoinRouteDialog
        open={joinDialogOpen}
        onOpenChange={setJoinDialogOpen}
        onJoin={handleJoinSubmit}
        loading={joinLoading}
      />

      {/* Route Details Dialog - Mobile Optimized */}
      {selectedRoute && (
        <Dialog open={!!selectedRoute} onOpenChange={() => setSelectedRoute(null)}>
          <DialogContent className="!fixed !inset-0 !w-full !h-full !max-w-none !max-h-none !rounded-none !p-0 !left-0 !top-0  !transform-none bg-white/95 dark:bg-black backdrop-blur-md border-0 md:!max-w-4xl md:!max-h-[90vh] md:!inset-auto md:!top-1/2 md:!left-1/2 md:!transform md:!-translate-x-1/2 md:!-translate-y-1/2 md:rounded-lg">
            {/* Fixed Header */}
            <div className="flex-shrink-0 p-4 md:p-6 pb-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 md:space-x-3 mb-2">
                    <Badge className={getDifficultyColor(selectedRoute.difficulty)}>{selectedRoute.difficulty}</Badge>
                  </div>
                  <h2 className="text-lg md:text-xl lg:text-2xl mb-2 text-black dark:text-white font-bold truncate">{selectedRoute.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base line-clamp-2">{selectedRoute.description}</p>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pt-4 pb-20 md:pb-6 mb-[130px]">
              <div className="space-y-4 md:space-y-6">
                {/* Creator Info */}
                <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 border border-gray-200 dark:border-gray-800 backdrop-blur-sm rounded-lg">
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
                      <div key={index} className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 border border-gray-200 dark:border-gray-800 backdrop-blur-sm rounded-lg">
                        <Avatar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                            {participant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-xs md:text-sm truncate text-black dark:text-white">{participant.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{participant.bike}</p>
                          {participant.hasPassenger && participant.passengerName && (
                            <p className="text-xs text-orange-600 dark:text-orange-400 truncate">
                              + {participant.passengerName}
                            </p>
                          )}
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
                  className={`flex-1 font-semibold ${
                    isUserInRoute(selectedRoute)
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : selectedRoute.currentParticipants >= selectedRoute.maxParticipants
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                  disabled={selectedRoute.currentParticipants >= selectedRoute.maxParticipants && !isUserInRoute(selectedRoute)}
                  onClick={() => {
                    if (isUserInRoute(selectedRoute)) {
                      handleLeaveRoute(selectedRoute.id)
                      setSelectedRoute(null)
                    } else {
                      handleJoinClick(selectedRoute.id)
                      setSelectedRoute(null)
                    }
                  }}
                >
                  {selectedRoute.currentParticipants >= selectedRoute.maxParticipants && !isUserInRoute(selectedRoute)
                    ? "Route Full"
                    : isUserInRoute(selectedRoute)
                    ? "Leave Route"
                    : "Join Route"}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Contact Organizer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
