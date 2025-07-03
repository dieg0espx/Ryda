export interface Route {
  id: number
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  distance: string
  duration: string
  startLocation: string
  endLocation: string
  date: string
  time: string
  maxParticipants: number
  currentParticipants: number
  rating: number
  creator: {
    name: string
    avatar: string
    rating: number
    ridesLed: number
  }
  meetingPoint: string
  highlights: string[]
  requirements: string[]
  participants: Array<{
    name: string
    avatar: string
    bike: string
  }>
  mapImage: string
}

// Initial mock data
const initialRoutes: Route[] = [
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

const STORAGE_KEY = 'ryda_routes'

// Helper functions for localStorage
const getRoutesFromStorage = (): Route[] => {
  if (typeof window === 'undefined') return initialRoutes
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : initialRoutes
  } catch (error) {
    console.error('Error reading routes from localStorage:', error)
    return initialRoutes
  }
}

const saveRoutesToStorage = (routes: Route[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes))
  } catch (error) {
    console.error('Error saving routes to localStorage:', error)
  }
}

// Routes management functions
export const getRoutes = (): Route[] => {
  return getRoutesFromStorage()
}

export const getRouteById = (id: number): Route | undefined => {
  const routes = getRoutesFromStorage()
  return routes.find(route => route.id === id)
}

export const createRoute = (routeData: Omit<Route, 'id'>): Route => {
  const routes = getRoutesFromStorage()
  const newRoute: Route = {
    ...routeData,
    id: Math.max(...routes.map(r => r.id), 0) + 1
  }
  
  const updatedRoutes = [...routes, newRoute]
  saveRoutesToStorage(updatedRoutes)
  return newRoute
}

export const updateRoute = (id: number, updates: Partial<Route>): Route | null => {
  const routes = getRoutesFromStorage()
  const routeIndex = routes.findIndex(route => route.id === id)
  
  if (routeIndex === -1) return null
  
  const updatedRoute = { ...routes[routeIndex], ...updates }
  routes[routeIndex] = updatedRoute
  saveRoutesToStorage(routes)
  return updatedRoute
}

export const deleteRoute = (id: number): boolean => {
  const routes = getRoutesFromStorage()
  const filteredRoutes = routes.filter(route => route.id !== id)
  
  if (filteredRoutes.length === routes.length) return false
  
  saveRoutesToStorage(filteredRoutes)
  return true
}

export const joinRoute = (routeId: number, participant: { name: string; avatar: string; bike: string }): boolean => {
  const route = getRouteById(routeId)
  if (!route || route.currentParticipants >= route.maxParticipants) return false
  
  const updatedRoute = updateRoute(routeId, {
    currentParticipants: route.currentParticipants + 1,
    participants: [...route.participants, participant]
  })
  
  return updatedRoute !== null
}

export const leaveRoute = (routeId: number, participantName: string): boolean => {
  const route = getRouteById(routeId)
  if (!route || route.currentParticipants <= 0) return false
  
  const updatedRoute = updateRoute(routeId, {
    currentParticipants: route.currentParticipants - 1,
    participants: route.participants.filter(p => p.name !== participantName)
  })
  
  return updatedRoute !== null
}

export const resetRoutes = (): void => {
  saveRoutesToStorage(initialRoutes)
} 