"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MapPin, Calendar, Camera } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { socialPosts } from "@/lib/static-data"

export default function SocialFeed() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState(socialPosts)
  const [newPost, setNewPost] = useState("")

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
          : post,
      ),
    )
  }

  const handleNewPost = () => {
    if (!newPost.trim()) return

    const post = {
      id: Date.now().toString(),
      user: {
        name: "You",
        username: "@you",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      type: "text" as const,
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Create Post */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={t("whatsOnYourMind")}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none border-0 p-0 focus-visible:ring-0"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                {t("photo")}
              </Button>
              <Button variant="ghost" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                {t("location")}
              </Button>
            </div>
            <Button onClick={handleNewPost} disabled={!newPost.trim()}>
              {t("post")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{post.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{post.user.name}</h4>
                    <span className="text-muted-foreground text-sm">{post.user.username}</span>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="mb-4">{post.content}</p>

              {post.type === "route" && post.route && (
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{t("plannedRoute")}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>
                        {t("from")}: {post.route.from}
                      </div>
                      <div>
                        {t("to")}: {post.route.to}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.route.date}
                        </span>
                        <Badge variant="secondary">{post.route.difficulty}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {post.image && (
                <div className="mb-4">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post content"
                    className="w-full rounded-lg max-h-96 object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={post.liked ? "text-red-500" : ""}
                >
                  <Heart className={`h-4 w-4 mr-2 ${post.liked ? "fill-current" : ""}`} />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  {post.shares}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
