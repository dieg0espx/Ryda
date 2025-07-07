"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, MapPin, Calendar, Bike, Gauge, Camera, Trash2, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useMotorcycles } from "@/hooks/use-motorcycles"
import ProfilePictureUpload from "@/components/profile-picture-upload"
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

  // Handle profile picture removal
  const handleProfilePictureRemove = async () => {
    if (!user) return
    
    try {
      const success = await updateProfile({
        profile_picture: null,
      })
      
      if (!success) {
        toast.error("Failed to remove profile picture from database")
      }
    } catch (error) {
      console.error("Error removing profile picture:", error)
      toast.error("Error removing profile picture")
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
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center py-8">
          <Bike className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Please log in to view your profile</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <ProfilePictureUpload
                currentImageUrl={profile?.profile_picture}
                userId={user.id}
                userName={profile?.name || "User"}
                onImageUpdate={handleProfilePictureUpdate}
                onImageRemove={handleProfilePictureRemove}
              />
            </div>

            <div className="flex-1 space-y-2">
              {isEditing ? (
                <div className="space-y-3">
                  <Input 
                    value={editForm.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder={t("fullName")} 
                  />
                  <Input 
                    value={editForm.location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder={t("location")} 
                  />
                  <Textarea 
                    value={editForm.bio}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder={t("bio")} 
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleProfileSave} disabled={isSaving}>
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {t("save")}
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      {t("cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">{profile?.name || "User"}</h1>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile?.country || "Location not set"}
                  </div>
                  <p className="text-muted-foreground">{profile?.bio || "No bio yet"}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {t("joined")} {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}
                    </div>
                    <Badge variant="secondary">
                      {profile?.total_rides_led || 0} {t("rides")}
                    </Badge>
                    <Badge variant="secondary">{profile?.rating || 0} ⭐</Badge>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="motorcycles" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="motorcycles">{t("motorcycles")}</TabsTrigger>
          <TabsTrigger value="routes">{t("routes")}</TabsTrigger>
          <TabsTrigger value="groups">{t("groups")}</TabsTrigger>
          <TabsTrigger value="activity">{t("activity")}</TabsTrigger>
        </TabsList>

        <TabsContent value="motorcycles" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{t("myMotorcycles")}</h2>
            <Button onClick={() => setShowAddBike(!showAddBike)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("addMotorcycle")}
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {showAddBike && (
            <Card>
              <CardHeader>
                <CardTitle>{t("addNewMotorcycle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder={t("brand")}
                    value={bikeForm.brand}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, brand: e.target.value }))}
                  />
                  <Input 
                    placeholder={t("model")}
                    value={bikeForm.model}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, model: e.target.value }))}
                  />
                  <Input 
                    placeholder={t("year")} 
                    type="number"
                    value={bikeForm.year}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, year: e.target.value }))}
                  />
                  <Input 
                    placeholder={t("mileage")} 
                    type="number"
                    value={bikeForm.mileage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, mileage: e.target.value }))}
                  />
                  <Select 
                    value={bikeForm.condition} 
                    onValueChange={(value: "excellent" | "good" | "fair" | "poor") => 
                      setBikeForm(prev => ({ ...prev, condition: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea 
                  placeholder={t("description")}
                  value={bikeForm.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBikeForm(prev => ({ ...prev, description: e.target.value }))}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddBike(false)}>
                    {t("cancel")}
                  </Button>
                  <Button onClick={handleAddMotorcycle} disabled={isAddingBike}>
                    {isAddingBike ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {t("addMotorcycle")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : motorcycles.length === 0 ? (
            <div className="text-center py-8">
              <Bike className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No motorcycles yet</h3>
              <p className="text-muted-foreground mb-4">Add your first motorcycle to get started</p>
              <Button onClick={() => setShowAddBike(true)}>
                <Plus className="h-4 w-4 mr-2" />
                {t("addMotorcycle")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {motorcycles.map((bike) => (
                <Card key={bike.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={bike.image_url || "/placeholder.svg"}
                        alt={`${bike.brand} ${bike.model}`}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">
                              {bike.brand} {bike.model}
                            </h3>
                            <p className="text-sm text-muted-foreground">{bike.year}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteMotorcycle(bike.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Gauge className="h-4 w-4 mr-1" />
                            {bike.mileage.toLocaleString()} km
                          </div>
                          <Badge variant="outline" className="capitalize">{bike.condition}</Badge>
                        </div>
                        {bike.description && (
                          <p className="text-sm text-muted-foreground mt-2">{bike.description}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="routes">
          <div className="text-center py-8">
            <Bike className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">{t("noRoutesYet")}</h3>
            <p className="text-muted-foreground mb-4">{t("startPlanningRoutes")}</p>
            <Button>{t("createFirstRoute")}</Button>
          </div>
        </TabsContent>

        <TabsContent value="groups">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">{t("joinedGroups")}</h3>
            <p className="text-muted-foreground">{t("groupsWillAppearHere")}</p>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">{t("recentActivity")}</h3>
            <p className="text-muted-foreground">{t("activityWillAppearHere")}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
