"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Edit, Plus, MapPin, Calendar, Bike, Gauge, Camera, Trash2, Loader2, User, Settings, LogOut, Bell, Moon, Sun, Globe, ChevronRight, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useMotorcycles } from "@/hooks/use-motorcycles"
import ProfilePictureUpload from "@/components/profile-picture-upload"
import MotorcycleImageUpload from "@/components/motorcycle-image-upload"
import { toast } from "sonner"

type SettingsSection = "profile" | "motorcycles" | "preferences" | "account"

export default function SettingsPage() {
  const { t } = useLanguage()
  const { user, profile, updateProfile, logout } = useAuth()
  const { motorcycles, loading, error, addMotorcycle, deleteMotorcycle } = useMotorcycles()
  
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile")
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  // App settings state
  const [appSettings, setAppSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
  })

  // Navigation items with descriptions
  const navItems = [
    { 
      id: "profile" as SettingsSection, 
      label: "Profile", 
      description: "Manage your personal information",
      icon: User 
    },
    { 
      id: "motorcycles" as SettingsSection, 
      label: "Motorcycles", 
      description: "Your motorcycle collection",
      icon: Bike 
    },
    { 
      id: "preferences" as SettingsSection, 
      label: "Preferences", 
      description: "App settings and preferences",
      icon: Bell 
    },
    { 
      id: "account" as SettingsSection, 
      label: "Account", 
      description: "Account management and security",
      icon: LogOut 
    },
  ]

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

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Error logging out")
      console.error(error)
    }
  }

  // Handle navigation item click
  const handleNavItemClick = (section: SettingsSection) => {
    setActiveSection(section)
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-4">
          <div className="text-center py-12">
            <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Please log in to access settings</h3>
            <p className="text-muted-foreground">Sign in to manage your profile and preferences</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Burger Button Only */}
        <div className="fixed top-4 left-4 z-50 lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-sm"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex">
          {/* Professional Sidebar */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-50 w-80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="space-y-1 mb-6">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Settings</h2>
                <p className="text-xs text-muted-foreground">Manage your account and preferences</p>
              </div>
              
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavItemClick(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 group ${
                        isActive 
                          ? "bg-orange-50 text-orange-700 border border-orange-200 shadow-sm" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-md transition-colors ${
                          isActive ? 'bg-orange-100' : 'bg-muted group-hover:bg-accent'
                        }`}>
                          <Icon className={`h-4 w-4 ${isActive ? 'text-orange-600' : ''}`} />
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-medium text-sm ${isActive ? 'text-orange-700' : ''}`}>
                            {item.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                      </div>
                      {isActive && <ChevronRight className="h-4 w-4 text-orange-600" />}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="p-4 lg:p-8 pt-16 lg:pt-8">
              {/* Profile Section */}
              {activeSection === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Profile Information</h2>
                    <p className="text-muted-foreground">Manage your personal information and profile picture</p>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Personal Details</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">Update your profile information</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setIsEditing(!isEditing)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          {isEditing ? "Cancel" : "Edit Profile"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-8">
                        {/* Profile Picture */}
                        <div className="flex-shrink-0">
                          <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Profile Picture</h3>
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100 shadow-lg">
                              <ProfilePictureUpload
                                currentImageUrl={profile?.profile_picture}
                                userId={user.id}
                                userName={profile?.name || "User"}
                                onImageUpdate={handleProfilePictureUpdate}
                                showRemoveButton={false}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground text-center">Click to upload</p>
                          </div>
                        </div>

                        <Separator orientation="vertical" className="hidden lg:block" />

                        {/* Profile Info */}
                        <div className="flex-1 space-y-6">
                          {isEditing ? (
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                  <Input 
                                    value={editForm.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter your full name"
                                    className="h-11"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                                  <Input 
                                    value={editForm.location}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="Enter your location"
                                    className="h-11"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Bio</label>
                                <Textarea 
                                  value={editForm.bio}
                                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                  placeholder="Tell us about yourself..."
                                  rows={4}
                                  className="resize-none"
                                />
                              </div>
                              <div className="flex space-x-3 pt-4">
                                <Button onClick={handleProfileSave} disabled={isSaving} className="px-6">
                                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                  Save Changes
                                </Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)} className="px-6">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-8">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-3xl font-bold text-foreground">{profile?.name || "User"}</h3>
                                  <div className="flex items-center text-muted-foreground mt-2">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span className="text-sm">{profile?.country || "Location not set"}</span>
                                  </div>
                                </div>
                                <div className="bg-muted/30 rounded-lg p-4">
                                  <p className="text-muted-foreground leading-relaxed">
                                    {profile?.bio || "No bio yet. Click edit to add your story."}
                                  </p>
                                </div>
                              </div>
                              
                              <Separator />
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                                  <div className="p-2 rounded-md bg-orange-100">
                                    <Calendar className="h-4 w-4 text-orange-600" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Member Since</p>
                                    <p className="text-sm font-medium">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                                  <div className="p-2 rounded-md bg-orange-100">
                                    <Bike className="h-4 w-4 text-orange-600" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Rides Led</p>
                                    <p className="text-sm font-medium">{profile?.total_rides_led || 0}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                                  <div className="p-2 rounded-md bg-orange-100">
                                    <span className="text-orange-600">⭐</span>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Rating</p>
                                    <p className="text-sm font-medium">{profile?.rating || 0}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Motorcycles Section */}
              {activeSection === "motorcycles" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">My Motorcycles</h2>
                    <p className="text-muted-foreground">Manage your motorcycle collection and details</p>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Motorcycle Collection</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">Add and manage your motorcycles</p>
                        </div>
                        <Button 
                          onClick={() => setShowAddBike(!showAddBike)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Motorcycle
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {error && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                          <p className="text-destructive text-sm">{error}</p>
                        </div>
                      )}

                      {showAddBike && (
                        <Card className="mb-6 border-2 border-dashed">
                          <CardHeader>
                            <CardTitle className="text-lg">Add New Motorcycle</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Brand</label>
                                <Input 
                                  placeholder="e.g., Honda, Yamaha, BMW"
                                  value={bikeForm.brand}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, brand: e.target.value }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Model</label>
                                <Input 
                                  placeholder="e.g., CBR600RR, R1, S1000RR"
                                  value={bikeForm.model}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, model: e.target.value }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Year</label>
                                <Input 
                                  placeholder="e.g., 2023" 
                                  type="number"
                                  value={bikeForm.year}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, year: e.target.value }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Mileage (km)</label>
                                <Input 
                                  placeholder="e.g., 5000" 
                                  type="number"
                                  value={bikeForm.mileage}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBikeForm(prev => ({ ...prev, mileage: e.target.value }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Condition</label>
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
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Description</label>
                              <Textarea 
                                placeholder="Tell us about your motorcycle..."
                                value={bikeForm.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBikeForm(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                              />
                            </div>
                            <div className="flex justify-end space-x-3 pt-4">
                              <Button variant="outline" onClick={() => setShowAddBike(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleAddMotorcycle} disabled={isAddingBike}>
                                {isAddingBike ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                Add Motorcycle
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {loading ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      ) : motorcycles.length === 0 ? (
                        <div className="text-center py-12">
                          <Bike className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No motorcycles yet</h3>
                          <p className="text-muted-foreground mb-6">Add your first motorcycle to get started</p>
                          <Button onClick={() => setShowAddBike(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Your First Motorcycle
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {motorcycles.map((bike) => (
                            <Card key={bike.id} className="hover:shadow-lg transition-all duration-200 border">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <MotorcycleImageUpload
                                    motorcycleId={bike.id}
                                    currentImageUrl={bike.image_url}
                                    onImageUpdate={(imageUrl) => {
                                      toast.success('Motorcycle image updated!')
                                    }}
                                  />
                                  <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="font-semibold text-lg">
                                          {bike.brand} {bike.model}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{bike.year}</p>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteMotorcycle(bike.id)}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                      <div className="flex items-center text-muted-foreground">
                                        <Gauge className="h-4 w-4 mr-1" />
                                        {bike.mileage.toLocaleString()} km
                                      </div>
                                      <Badge variant="outline" className="capitalize text-xs">
                                        {bike.condition}
                                      </Badge>
                                    </div>
                                    {bike.description && (
                                      <p className="text-sm text-muted-foreground line-clamp-2">{bike.description}</p>
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
              )}

              {/* Preferences Section */}
              {activeSection === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">App Preferences</h2>
                    <p className="text-muted-foreground">Customize your app experience and notifications</p>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Application Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-8">
                        {/* Notifications */}
                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-md bg-orange-100">
                              <Bell className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Push Notifications</h3>
                              <p className="text-sm text-muted-foreground">Receive notifications about rides and updates</p>
                            </div>
                          </div>
                          <Button
                            variant={appSettings.notifications ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAppSettings(prev => ({ ...prev, notifications: !prev.notifications }))}
                          >
                            {appSettings.notifications ? "On" : "Off"}
                          </Button>
                        </div>

                        {/* Dark Mode */}
                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-md bg-orange-100">
                              {appSettings.darkMode ? (
                                <Moon className="h-5 w-5 text-orange-600" />
                              ) : (
                                <Sun className="h-5 w-5 text-orange-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">Dark Mode</h3>
                              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                            </div>
                          </div>
                          <Button
                            variant={appSettings.darkMode ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAppSettings(prev => ({ ...prev, darkMode: !prev.darkMode }))}
                          >
                            {appSettings.darkMode ? "Dark" : "Light"}
                          </Button>
                        </div>

                        {/* Language */}
                        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-md bg-orange-100">
                              <Globe className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Language</h3>
                              <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                            </div>
                          </div>
                          <Select 
                            value={appSettings.language}
                            onValueChange={(value) => setAppSettings(prev => ({ ...prev, language: value }))}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Account Section */}
              {activeSection === "account" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Account Management</h2>
                    <p className="text-muted-foreground">Manage your account settings and security</p>
                  </div>
                  
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Account Information</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                              <p className="text-sm font-medium">{user.email}</p>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                              <p className="text-sm font-medium">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Unknown"}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-destructive/20">
                      <CardHeader>
                        <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                            <div>
                              <h3 className="font-medium text-destructive">Log Out</h3>
                              <p className="text-sm text-muted-foreground">Sign out of your account</p>
                            </div>
                            <Button 
                              variant="destructive" 
                              onClick={handleLogout}
                            >
                              <LogOut className="h-4 w-4 mr-2" />
                              Log Out
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
