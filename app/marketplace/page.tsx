"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, MapPin, Star, MessageCircle, Wrench, Phone, Clock, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Mock data for marketplace items
const marketplaceItems = [
  {
    id: 1,
    title: "2019 Yamaha MT-07",
    description: "Excellent condition, low mileage, perfect for city and highway riding",
    price: 6500,
    category: "Motorcycles",
    condition: "Used",
    location: "Los Angeles, CA",
    images: ["/placeholder.svg?height=200&width=300&text=Yamaha+MT-07"],
    seller: {
      name: "John Smith",
      avatar: "/placeholder-user.jpg",
      rating: 4.8,
      verified: true,
    },
    specs: {
      year: 2019,
      mileage: "12,500 miles",
      engine: "689cc",
      type: "Naked",
    },
    postedDate: "2024-01-10",
    featured: true,
  },
  {
    id: 2,
    title: "Shoei RF-1400 Helmet",
    description: "Brand new, never worn. Size Large. Premium safety and comfort",
    price: 450,
    category: "Gear",
    condition: "New",
    location: "San Francisco, CA",
    images: ["/placeholder.svg?height=200&width=300&text=Shoei+Helmet"],
    seller: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      rating: 4.9,
      verified: true,
    },
    specs: {
      size: "Large",
      color: "Matte Black",
      certification: "DOT/SNELL",
    },
    postedDate: "2024-01-12",
    featured: false,
  },
  {
    id: 3,
    title: "Kawasaki Ninja 650 Parts",
    description: "Various OEM parts for 2017-2020 Ninja 650. Excellent condition",
    price: 200,
    category: "Parts",
    condition: "Used",
    location: "Phoenix, AZ",
    images: ["/placeholder.svg?height=200&width=300&text=Ninja+Parts"],
    seller: {
      name: "Mike Rodriguez",
      avatar: "/placeholder-user.jpg",
      rating: 4.7,
      verified: false,
    },
    specs: {
      compatibility: "2017-2020 Ninja 650",
      parts: "Fairings, mirrors, levers",
    },
    postedDate: "2024-01-08",
    featured: false,
  },
  {
    id: 4,
    title: "Dainese Racing Suit",
    description: "Professional grade leather racing suit. Size 52. Minimal track use",
    price: 800,
    category: "Gear",
    condition: "Used",
    location: "Miami, FL",
    images: ["/placeholder.svg?height=200&width=300&text=Racing+Suit"],
    seller: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      rating: 4.6,
      verified: true,
    },
    specs: {
      size: "52",
      material: "Leather",
      protection: "CE certified",
    },
    postedDate: "2024-01-05",
    featured: true,
  },
  {
    id: 5,
    title: "BMW R1250GS Adventure",
    description: "2021 model with all the adventure packages. Ready for any journey",
    price: 18500,
    category: "Motorcycles",
    condition: "Used",
    location: "Denver, CO",
    images: ["/placeholder.svg?height=200&width=300&text=BMW+R1250GS"],
    seller: {
      name: "Lisa Chen",
      avatar: "/placeholder-user.jpg",
      rating: 4.9,
      verified: true,
    },
    specs: {
      year: 2021,
      mileage: "8,200 miles",
      engine: "1254cc",
      type: "Adventure",
    },
    postedDate: "2024-01-15",
    featured: true,
  },
  {
    id: 6,
    title: "Akrapovic Exhaust System",
    description: "Full titanium system for Ducati Panigale V4. Incredible sound and performance",
    price: 2200,
    category: "Parts",
    condition: "New",
    location: "Las Vegas, NV",
    images: ["/placeholder.svg?height=200&width=300&text=Akrapovic+Exhaust"],
    seller: {
      name: "David Wilson",
      avatar: "/placeholder-user.jpg",
      rating: 4.8,
      verified: true,
    },
    specs: {
      compatibility: "Ducati Panigale V4",
      material: "Titanium",
      weight: "50% lighter than stock",
    },
    postedDate: "2024-01-13",
    featured: false,
  },
]

// Mock data for service providers
const serviceProviders = [
  {
    id: 1,
    name: "Mike's Motorcycle Repair",
    description: "Expert motorcycle maintenance and repair services with over 15 years of experience",
    category: "Repair",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviewCount: 127,
    priceRange: { min: 50, max: 150 },
    image: "/placeholder.svg?height=200&width=300&text=Motorcycle+Shop",
    owner: {
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      experience: "15+ years",
    },
    services: ["Oil Changes", "Brake Service", "Engine Repair", "Tire Installation"],
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    phone: "(555) 123-4567",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Speed Demon Parts",
    description: "Premium motorcycle parts and accessories. OEM and aftermarket options available",
    category: "Parts",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewCount: 89,
    priceRange: { min: 25, max: 500 },
    image: "/placeholder.svg?height=200&width=300&text=Parts+Store",
    owner: {
      name: "Sarah Martinez",
      avatar: "/placeholder-user.jpg",
      experience: "10+ years",
    },
    services: ["OEM Parts", "Performance Upgrades", "Custom Accessories", "Installation"],
    hours: "Mon-Sat: 9AM-7PM, Sun: 10AM-5PM",
    phone: "(555) 987-6543",
    verified: true,
    featured: false,
  },
  {
    id: 3,
    name: "Rider's Gear Hub",
    description: "Complete motorcycle gear and apparel store. Safety first, style always",
    category: "Gear",
    location: "Phoenix, AZ",
    rating: 4.7,
    reviewCount: 156,
    priceRange: { min: 30, max: 800 },
    image: "/placeholder.svg?height=200&width=300&text=Gear+Store",
    owner: {
      name: "Alex Rodriguez",
      avatar: "/placeholder-user.jpg",
      experience: "8+ years",
    },
    services: ["Helmets", "Protective Gear", "Riding Apparel", "Custom Fitting"],
    hours: "Daily: 10AM-8PM",
    phone: "(555) 456-7890",
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: "Custom Chrome Works",
    description: "Specialized in custom motorcycle modifications and chrome work",
    category: "Customization",
    location: "Miami, FL",
    rating: 4.6,
    reviewCount: 73,
    priceRange: { min: 100, max: 2000 },
    image: "/placeholder.svg?height=200&width=300&text=Custom+Shop",
    owner: {
      name: "Tony Williams",
      avatar: "/placeholder-user.jpg",
      experience: "20+ years",
    },
    services: ["Chrome Plating", "Custom Paint", "Performance Mods", "Restoration"],
    hours: "Tue-Sat: 9AM-6PM",
    phone: "(555) 321-0987",
    verified: false,
    featured: false,
  },
  {
    id: 5,
    name: "Mountain Bike Service",
    description: "Adventure motorcycle specialists. Prep your bike for any terrain",
    category: "Repair",
    location: "Denver, CO",
    rating: 4.9,
    reviewCount: 94,
    priceRange: { min: 75, max: 300 },
    image: "/placeholder.svg?height=200&width=300&text=Adventure+Service",
    owner: {
      name: "Jessica Chen",
      avatar: "/placeholder-user.jpg",
      experience: "12+ years",
    },
    services: ["Adventure Prep", "Suspension Tuning", "Off-road Setup", "Maintenance"],
    hours: "Mon-Fri: 7AM-5PM, Sat: 8AM-3PM",
    phone: "(555) 654-3210",
    verified: true,
    featured: true,
  },
  {
    id: 6,
    name: "Track Day Specialists",
    description: "Race preparation and track day services. Get your bike track-ready",
    category: "Performance",
    location: "Las Vegas, NV",
    rating: 4.8,
    reviewCount: 67,
    priceRange: { min: 150, max: 1000 },
    image: "/placeholder.svg?height=200&width=300&text=Track+Service",
    owner: {
      name: "Mark Thompson",
      avatar: "/placeholder-user.jpg",
      experience: "18+ years",
    },
    services: ["Track Prep", "Performance Tuning", "Safety Inspection", "Race Setup"],
    hours: "Wed-Sun: 8AM-6PM",
    phone: "(555) 789-0123",
    verified: true,
    featured: false,
  },
]

export default function MarketplacePage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"marketplace" | "services">("marketplace")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [likedItems, setLikedItems] = useState<number[]>([])

  const marketplaceCategories = ["all", "Motorcycles", "Gear", "Parts"]
  const serviceCategories = ["all", "Repair", "Parts", "Gear", "Customization", "Performance"]
  const conditions = ["all", "New", "Used"]

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesCondition = selectedCondition === "all" || item.condition === selectedCondition

    return matchesSearch && matchesCategory && matchesCondition
  })

  const filteredProviders = serviceProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatPriceRange = (priceRange: { min: number; max: number } | undefined) => {
    if (!priceRange || typeof priceRange.min !== "number" || typeof priceRange.max !== "number") {
      return "Contact for pricing"
    }
    return `$${priceRange.min} - $${priceRange.max}`
  }

  const resetFilters = () => {
    setSelectedCategory("all")
    setSelectedCondition("all")
    setSearchTerm("")
  }

  const handleTabChange = (tab: "marketplace" | "services") => {
    setActiveTab(tab)
    resetFilters()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Marketplace & Services</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          {activeTab === "marketplace" 
            ? "Buy and sell motorcycles, gear, and parts" 
            : "Find trusted motorcycle service providers in your area"}
        </p>
      </div>

      {/* Tab Toggle */}
      <div className="mb-6">
        <div className="w-full">
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1 w-full">
            <button
              onClick={() => handleTabChange("marketplace")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-1/2 ${
                activeTab === "marketplace"
                  ? "bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => handleTabChange("services")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors w-1/2 ${
                activeTab === "services"
                  ? "bg-white dark:bg-neutral-700 text-black dark:text-white shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              }`}
            >
              Services
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              placeholder={activeTab === "marketplace" 
                ? "Search motorcycles, gear, parts..." 
                : "Search services, providers, locations..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {(activeTab === "marketplace" ? marketplaceCategories : serviceCategories).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {activeTab === "marketplace" && (
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition === "all" ? "All" : condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      {activeTab === "marketplace" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.images?.[0] || "/placeholder.svg?height=200&width=300&text=No+Image"}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                {item.featured && <Badge className="absolute top-2 left-2 bg-orange-600">Featured</Badge>}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-2 right-2 ${likedItems.includes(item.id) ? "text-red-500" : "text-neutral-400"}`}
                  onClick={() => toggleLike(item.id)}
                >
                  <Heart className={`w-4 h-4 ${likedItems.includes(item.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{item.category}</Badge>
                  <Badge variant={item.condition === "New" ? "default" : "secondary"}>{item.condition}</Badge>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <div className="text-2xl font-bold text-orange-600">{formatPrice(item.price)}</div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">{item.description}</CardDescription>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={item.seller?.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{item.seller?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm font-medium">{item.seller?.name}</span>
                        {item.seller?.verified && (
                          <Badge variant="outline" className="ml-1 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.seller?.rating}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                      View Details
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map((provider) => (
            <Card key={provider.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={provider.image || "/placeholder.svg"}
                  alt={provider.name}
                  className="w-full h-48 object-cover"
                />
                {provider.featured && <Badge className="absolute top-2 left-2 bg-orange-600">Featured</Badge>}
                {provider.verified && <Badge className="absolute top-2 right-2 bg-green-600">Verified</Badge>}
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{provider.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{provider.rating}</span>
                    <span className="text-sm text-neutral-500">({provider.reviewCount})</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <div className="text-lg font-semibold text-orange-600">{formatPriceRange(provider.priceRange)}</div>
              </CardHeader>

              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">{provider.description}</CardDescription>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <MapPin className="w-4 h-4" />
                    <span>{provider.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Clock className="w-4 h-4" />
                    <span>{provider.hours}</span>
                  </div>

                  {/* Owner Info */}
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={provider.owner?.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{provider.owner?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <span className="font-medium">{provider.owner?.name}</span>
                      <span className="text-neutral-500 ml-2">{provider.owner?.experience}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-sm font-medium mb-1">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.services.slice(0, 3).map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {provider.services.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{provider.services.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button variant="outline" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === "marketplace" && filteredItems.length === 0) || 
        (activeTab === "services" && filteredProviders.length === 0)) && (
        <div className="text-center py-12">
          {activeTab === "marketplace" ? (
            <Heart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          ) : (
            <Wrench className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          )}
          <p className="text-neutral-500 text-lg">
            {activeTab === "marketplace" 
              ? "No items found matching your criteria" 
              : "No service providers found"}
          </p>
          <p className="text-neutral-400 text-sm mt-2">
            Try adjusting your search or {activeTab === "marketplace" ? "filters" : "category filter"}
          </p>
        </div>
      )}
    </div>
  )
}
