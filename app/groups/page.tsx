"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, Lock, Globe, Search, Plus } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { groups, groupMessages } from "@/lib/static-data"

export default function GroupsPage() {
  const { t } = useLanguage()
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedGroupData = groups.find((g) => g.id === selectedGroup)
  const messages = selectedGroup ? groupMessages[selectedGroup] || [] : []

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedGroup) return
    // In a real app, this would send the message to the backend
    setNewMessage("")
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
        {/* Groups List */}
        <div className="lg:w-1/3 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t("groups")}</h1>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t("create")}
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchGroups")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">{t("all")}</TabsTrigger>
              <TabsTrigger value="joined">{t("joined")}</TabsTrigger>
              <TabsTrigger value="discover">{t("discover")}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-2 max-h-96 overflow-y-auto">
              {filteredGroups.map((group) => (
                <Card
                  key={group.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedGroup === group.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={group.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{group.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold truncate">{group.name}</h3>
                          {group.isPrivate ? (
                            <Lock className="h-3 w-3 text-muted-foreground" />
                          ) : (
                            <Globe className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{group.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {group.members}
                          </Badge>
                          {group.category && (
                            <Badge variant="outline" className="text-xs">
                              {group.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="joined">
              <p className="text-center text-muted-foreground py-8">{t("joinedGroupsWillAppearHere")}</p>
            </TabsContent>

            <TabsContent value="discover">
              <p className="text-center text-muted-foreground py-8">{t("discoverNewGroups")}</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        <div className="lg:w-2/3">
          {selectedGroupData ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedGroupData.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedGroupData.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{selectedGroupData.name}</span>
                      {selectedGroupData.isPrivate ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedGroupData.members} {t("members")} • {selectedGroupData.category}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{message.user.name}</span>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <p className="text-sm mt-1">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder={t("typeMessage")}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent>
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t("selectGroup")}</h3>
                  <p className="text-muted-foreground">{t("chooseGroupToStartChatting")}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
