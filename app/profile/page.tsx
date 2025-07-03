"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, MapPin, Calendar, Bike, Gauge, Camera } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { userProfile, userMotorcycles } from "@/lib/static-data"

export default function ProfilePage() {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [showAddBike, setShowAddBike] = useState(false)

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback>{userProfile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-2">
              {isEditing ? (
                <div className="space-y-3">
                  <Input defaultValue={userProfile.name} placeholder={t("fullName")} />
                  <Input defaultValue={userProfile.location} placeholder={t("location")} />
                  <Textarea defaultValue={userProfile.bio} placeholder={t("bio")} />
                  <div className="flex space-x-2">
                    <Button onClick={() => setIsEditing(false)}>{t("save")}</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      {t("cancel")}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {userProfile.location}
                  </div>
                  <p className="text-muted-foreground">{userProfile.bio}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {t("joined")} {userProfile.joinDate}
                    </div>
                    <Badge variant="secondary">
                      {userProfile.totalRides} {t("rides")}
                    </Badge>
                    <Badge variant="secondary">{userProfile.totalDistance} km</Badge>
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

          {showAddBike && (
            <Card>
              <CardHeader>
                <CardTitle>{t("addNewMotorcycle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder={t("brand")} />
                  <Input placeholder={t("model")} />
                  <Input placeholder={t("year")} type="number" />
                  <Input placeholder={t("mileage")} type="number" />
                </div>
                <Textarea placeholder={t("description")} />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddBike(false)}>
                    {t("cancel")}
                  </Button>
                  <Button>{t("addMotorcycle")}</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userMotorcycles.map((bike) => (
              <Card key={bike.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={bike.image || "/placeholder.svg"}
                      alt={`${bike.brand} ${bike.model}`}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {bike.brand} {bike.model}
                      </h3>
                      <p className="text-sm text-muted-foreground">{bike.year}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Gauge className="h-4 w-4 mr-1" />
                          {bike.mileage.toLocaleString()} km
                        </div>
                        <Badge variant="outline">{bike.condition}</Badge>
                      </div>
                      {bike.description && <p className="text-sm text-muted-foreground mt-2">{bike.description}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
