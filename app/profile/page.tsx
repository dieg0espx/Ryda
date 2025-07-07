"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, MapPin, Calendar, Bike, Gauge, Camera, Trash2, Loader2, User, Settings } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useMotorcycles } from "@/hooks/use-motorcycles"
import ProfilePictureUpload from "@/components/profile-picture-upload"
import MotorcycleImageUpload from "@/components/motorcycle-image-upload"
import { toast } from "sonner"

export default function ProfilePage() {
  const { t } = useLanguage()
  const { user, profile, updateProfile } = useAuth()
  const { motorcycles, loading, error, addMotorcycle, deleteMotorcycle } = useMotorcycles()
  
  const [isEditing, setIsEditing] = useState(false)
  const [showAddBike, setShowAddBike] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isAddingBike, setIsAddingBike] = useState(false)
  
  // Form states for profile editing
  const [editForm, setEditForm] = useState({
    name: profile?.name || "",
    location: profile?.country || "",
    bio: profile?.bio || "",
  })
  
  // Form states for adding motorcycle
  const [bikeForm, setBikeForm] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    condition: "good" as "excellent" | "good" | "fair" | "poor",
    description: "",
  })

  // Handle profile save
  const handleProfileSave = async () => {
    if (!user) return
    
    setIsSaving(true)
    try {
      const success = await updateProfile({
        name: editForm.name,
        country: editForm.location,
        bio: editForm.bio,
      })
      
      if (success) {
        toast.success("Profile updated successfully!")
        setIsEditing(false)
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      toast.error("Error updating profile")
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  // Handle profile picture update
  const handleProfilePictureUpdate = async (imageUrl: string) => {
    if (!user) return
    
    try {
      const success = await updateProfile({
        profile_picture: imageUrl,
      })
      
      if (!success) {
        toast.error("Failed to update profile picture in database")
      }
    } catch (error) {
      console.error("Error updating profile picture:", error)
      toast.error("Error updating profile picture")
    }
  }

  // Handle adding motorcycle
  const handleAddMotorcycle = async () => {
    if (!user) return
    
    setIsAddingBike(true)
    try {
      await addMotorcycle({
        brand: bikeForm.brand,
        model: bikeForm.model,
        year: parseInt(bikeForm.year),
        mileage: parseInt(bikeForm.mileage),
        condition: bikeForm.condition,
        description: bikeForm.description || undefined,
      })
      
      toast.success("Motorcycle added successfully!")
      setShowAddBike(false)
      setBikeForm({
        brand: "",
        model: "",
        year: "",
        mileage: "",
        condition: "good",
        description: "",
      })
    } catch (error) {
      toast.error("Failed to add motorcycle")
      console.error(error)
    } finally {
      setIsAddingBike(false)
    }
  }

  // Handle deleting motorcycle
  const handleDeleteMotorcycle = async (id: string) => {
    try {
      await deleteMotorcycle(id)
      toast.success("Motorcycle deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete motorcycle")
      console.error(error)
    }
  }

  // Update edit form when profile changes
  useEffect(() => {
    if (profile) {
      setEditForm({
        name: profile.name,
        location: profile.country || "",
        bio: profile.bio || "",
      })
    }
  }, [profile])

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center py-12">
          <Bike className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Please log in to view your profile</h3>
          <p className="text-muted-foreground">Sign in to access your profile and manage your motorcycles</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Profile Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Profile</CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
              className="hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <ProfilePictureUpload
                currentImageUrl={profile?.profile_picture}
                userId={user.id}
                userName={profile?.name || "User"}
                onImageUpdate={handleProfilePictureUpdate}
                showRemoveButton={false}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Full Name</label>
                    <Input 
                      value={editForm.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Location</label>
                    <Input 
                      value={editForm.location}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter your location"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Bio</label>
                    <Textarea 
                      value={editForm.bio}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={handleProfileSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{profile?.name || "User"}</h2>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mt-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {profile?.country || "Location not set"}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {profile?.bio || "No bio yet. Click edit to add your story."}
                    </p>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {profile?.total_rides_led || 0} rides led
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {profile?.rating || 0} ⭐ rating
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motorcycles Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bike className="h-6 w-6 text-green-600" />
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">My Motorcycles</CardTitle>
            </div>
            <Button 
              onClick={() => setShowAddBike(!showAddBike)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Motorcycle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {showAddBike && (
            <Card className="mb-6 border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-lg">Add New Motorcycle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Brand</label>
                    <Input 
                      placeholder="e.g., Honda, Yamaha, BMW"
                      value={bikeForm.brand}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, brand: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Model</label>
                    <Input 
                      placeholder="e.g., CBR600RR, R1, S1000RR"
                      value={bikeForm.model}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, model: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Year</label>
                    <Input 
                      placeholder="e.g., 2023" 
                      type="number"
                      value={bikeForm.year}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, year: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Mileage (km)</label>
                    <Input 
                      placeholder="e.g., 5000" 
                      type="number"
                      value={bikeForm.mileage}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, mileage: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Condition</label>
                    <Select 
                      value={bikeForm.condition} 
                      onValueChange={(value: "excellent" | "good" | "fair" | "poor") => 
                        setBikeForm(prev => ({ ...prev, condition: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Description</label>
                  <Textarea 
                    placeholder="Tell us about your motorcycle..."
                    value={bikeForm.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBikeForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowAddBike(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMotorcycle} disabled={isAddingBike} className="bg-green-600 hover:bg-green-700">
                    {isAddingBike ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Add Motorcycle
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : motorcycles.length === 0 ? (
            <div className="text-center py-12">
              <Bike className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No motorcycles yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Add your first motorcycle to get started</p>
              <Button onClick={() => setShowAddBike(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Motorcycle
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {motorcycles.map((bike) => (
                <Card key={bike.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <MotorcycleImageUpload
                        motorcycleId={bike.id}
                        currentImageUrl={bike.image_url}
                        onImageUpdate={(imageUrl) => {
                          // Update the motorcycle with the new image URL
                          // This would need to be implemented in the useMotorcycles hook
                          toast.success('Motorcycle image updated!')
                        }}
                      />
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                              {bike.brand} {bike.model}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{bike.year}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMotorcycle(bike.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Gauge className="h-4 w-4 mr-1" />
                            {bike.mileage.toLocaleString()} km
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`capitalize ${
                              bike.condition === 'excellent' ? 'border-green-200 text-green-800 bg-green-50' :
                              bike.condition === 'good' ? 'border-blue-200 text-blue-800 bg-blue-50' :
                              bike.condition === 'fair' ? 'border-yellow-200 text-yellow-800 bg-yellow-50' :
                              'border-red-200 text-red-800 bg-red-50'
                            }`}
                          >
                            {bike.condition}
                          </Badge>
                        </div>
                        {bike.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{bike.description}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
