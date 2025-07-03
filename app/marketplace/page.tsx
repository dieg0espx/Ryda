"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, MapPin, Star, MessageCircle } from "lucide-react"
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

export default function MarketplacePage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCondition, setSelectedCondition] = useState("all")
  const [likedItems, setLikedItems] = useState<number[]>([])

  const categories = ["all", "Motorcycles", "Gear", "Parts"]
  const conditions = ["all", "New", "Used"]

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesCondition = selectedCondition === "all" || item.condition === selectedCondition

    return matchesSearch && matchesCategory && matchesCondition
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("marketplace")}</h1>
        <p className="text-gray-600">Buy and sell motorcycles, gear, and parts</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search motorcycles, gear, parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          </div>
        </div>
      </div>

      {/* Items Grid */}
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
                className={`absolute top-2 right-2 ${likedItems.includes(item.id) ? "text-red-500" : "text-gray-400"}`}
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
                <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                  <Button className="flex-1 bg-orange-600 hover:bg-orange-700">View Details</Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
