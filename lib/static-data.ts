// --- Social Feed Data -----------------------------------------
export const socialPosts = [
  {
    id: "1",
    user: {
      name: "Alex Rodriguez",
      username: "@alexrider",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just completed an amazing 300 km ride through the mountains! The weather was perfect and the views were incredible. Can't wait for the next adventure! 🏍️",
    timestamp: "2 h",
    likes: 24,
    comments: 8,
    shares: 3,
    liked: false,
    type: "text" as const,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "2",
    user: {
      name: "Maria Santos",
      username: "@mariabiker",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Planning a group ride for this weekend. Anyone interested in joining? We'll be exploring some scenic coastal routes.",
    timestamp: "4 h",
    likes: 15,
    comments: 12,
    shares: 5,
    liked: true,
    type: "route" as const,
    route: {
      from: "San Francisco, CA",
      to: "Monterey, CA",
      date: "Saturday, Dec 16",
      difficulty: "Medium",
    },
  },
  {
    id: "3",
    user: {
      name: "Jake Thompson",
      username: "@jakethesnake",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "New exhaust system installed! The sound is absolutely incredible. Thanks to Mike's Garage for the professional installation.",
    timestamp: "1 d",
    likes: 31,
    comments: 6,
    shares: 2,
    liked: false,
    type: "text" as const,
    image: "/placeholder.svg?height=300&width=500",
  },
]

export const routes = [
  {
    id: "1",
    creator: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    startPoint: "San Francisco, CA",
    endPoint: "Napa Valley, CA",
    date: "Sat, Nov 25",
    duration: "4 hours",
    difficulty: "Medium",
    description:
      "Beautiful scenic route through wine country with amazing views and winding roads perfect for sport bikes.",
    participants: 8,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    creator: {
      name: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    startPoint: "Los Angeles, CA",
    endPoint: "Big Sur, CA",
    date: "Sun, Nov 26",
    duration: "6 hours",
    difficulty: "Hard",
    description: "Challenging coastal ride with steep curves and breathtaking ocean views. Experienced riders only.",
    participants: 5,
    createdAt: "1 day ago",
  },
  {
    id: "3",
    creator: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    startPoint: "San Diego, CA",
    endPoint: "Joshua Tree, CA",
    date: "Sat, Dec 2",
    duration: "5 hours",
    difficulty: "Easy",
    description:
      "Desert ride through beautiful landscapes with minimal traffic. Great for beginners and cruiser bikes.",
    participants: 12,
    createdAt: "5 hours ago",
  },
]

export const userMotorcycles = [
  {
    id: "1",
    brand: "Yamaha",
    model: "MT-09",
    year: 2023,
    mileage: 2500,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    brand: "Honda",
    model: "CBR600RR",
    year: 2022,
    mileage: 5200,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    brand: "Kawasaki",
    model: "Ninja 650",
    year: 2021,
    mileage: 8900,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export const groups = [
  {
    id: "1",
    name: "Bay Area Riders",
    description: "Weekly rides around the San Francisco Bay Area",
    members: 234,
    image: "/placeholder.svg?height=60&width=60",
    isPrivate: false,
    joined: true,
  },
  {
    id: "2",
    name: "Sport Bike Club",
    description: "For sport bike enthusiasts who love track days",
    members: 156,
    image: "/placeholder.svg?height=60&width=60",
    isPrivate: false,
    joined: false,
  },
  {
    id: "3",
    name: "Cruiser Community",
    description: "Harley and cruiser riders welcome",
    members: 89,
    image: "/placeholder.svg?height=60&width=60",
    isPrivate: true,
    joined: true,
  },
]

export const marketplaceItems = [
  {
    id: "1",
    title: "Yamaha MT-09 Exhaust System",
    price: 450,
    condition: "Like New",
    seller: "Alex Rodriguez",
    image: "/placeholder.svg?height=200&width=200",
    category: "Parts",
    location: "San Francisco, CA",
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Alpinestars Leather Jacket",
    price: 280,
    condition: "Good",
    seller: "Sarah Wilson",
    image: "/placeholder.svg?height=200&width=200",
    category: "Gear",
    location: "Los Angeles, CA",
    postedAt: "1 week ago",
  },
  {
    id: "3",
    title: "GoPro Hero 11 with Mounts",
    price: 320,
    condition: "New",
    seller: "Mike Johnson",
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
    location: "San Diego, CA",
    postedAt: "3 days ago",
  },
]

export const serviceProviders = [
  {
    id: "1",
    name: "Bay Area Motorcycle Service",
    rating: 4.8,
    reviews: 127,
    services: ["Maintenance", "Repair"],
    location: "San Francisco, CA",
    phone: "+1 (415) 555-0123",
    verified: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    name: "Speed Demon Customs",
    rating: 4.9,
    reviews: 89,
    services: ["Customization", "Performance"],
    location: "Los Angeles, CA",
    phone: "+1 (323) 555-0456",
    verified: true,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "3",
    name: "Precision Motorcycle Works",
    rating: 4.7,
    reviews: 156,
    services: ["Maintenance", "Inspection"],
    location: "San Diego, CA",
    phone: "+1 (619) 555-0789",
    verified: false,
    image: "/placeholder.svg?height=60&width=60",
  },
]

// --- User Profile -------------------------------------------------
export const userProfile = {
  name: "John Doe",
  location: "Los Angeles, CA",
  bio: "Passionate motorcycle enthusiast with 10+ years of riding experience. Love exploring new routes and meeting fellow riders.",
  avatar: "/placeholder.svg?height=96&width=96",
  joinDate: "March 2020",
  totalRides: 156,
  totalDistance: 25430, // distance in miles
}

// --- Group Messages ----------------------------------------------
export const groupMessages: Record<
  string,
  Array<{
    id: string
    user: { name: string; avatar: string }
    content: string
    timestamp: string
  }>
> = {
  "1": [
    {
      id: "1",
      user: { name: "Alex Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
      content: "Hey everyone! Planning a ride to Mount Evans this weekend. Weather looks perfect!",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      user: { name: "Sarah Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      content: "Count me in! What time are we meeting?",
      timestamp: "10:35 AM",
    },
    {
      id: "3",
      user: { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      content: "I'll bring my camera for some epic shots at the summit 📸",
      timestamp: "10:42 AM",
    },
  ],
  // Other group IDs can be added here as needed
}
