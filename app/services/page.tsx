"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wrench, MapPin, Star, Phone, Clock, Search, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

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

export default function ServicesPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Repair", "Parts", "Gear", "Customization", "Performance"]

  const filteredProviders = serviceProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const formatPriceRange = (priceRange: { min: number; max: number } | undefined) => {
    if (!priceRange || typeof priceRange.min !== "number" || typeof priceRange.max !== "number") {
      return "Contact for pricing"
    }
    return `$${priceRange.min} - $${priceRange.max}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("services")}</h1>
        <p className="text-gray-600">Find trusted motorcycle service providers in your area</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search services, providers, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Service Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Services" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Service Providers Grid */}
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
                  <span className="text-sm text-gray-500">({provider.reviewCount})</span>
                </div>
              </div>
              <CardTitle className="text-lg">{provider.name}</CardTitle>
              <div className="text-lg font-semibold text-orange-600">{formatPriceRange(provider.priceRange)}</div>
            </CardHeader>

            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">{provider.description}</CardDescription>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{provider.location}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                    <span className="text-gray-500 ml-2">{provider.owner?.experience}</span>
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
                  <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
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

      {filteredProviders.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No service providers found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  )
}
