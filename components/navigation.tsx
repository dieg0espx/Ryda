"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Users, MapPin, ShoppingBag, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/groups", icon: Users, label: "Groups" },
  { href: "/routes", icon: MapPin, label: "Routes" },
  { href: "/marketplace", icon: ShoppingBag, label: "Market" },
]

export default function Navigation() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { t } = useLanguage()

  return (
    <>
      {/* Desktop Navigation - Fixed Top */}
      <nav className="hidden md:flex items-center justify-between p-4 border-b bg-background fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-xl">Ryda</span>
          </Link>

          <div className="flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t(item.label.toLowerCase())}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user && (
            <Link href="/settings">
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Navigation - Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t pb-safe">
        <nav className="w-full">
          <div className="flex justify-around items-center py-3 px-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                    isActive 
                      ? "text-orange-600" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform duration-200`} />
                  <span className="text-xs font-medium truncate w-full text-center">{t(item.label.toLowerCase())}</span>
                </Link>
              )
            })}
            {user && (
              <Link href="/settings">
                <Button 
                  variant="ghost" 
                  className={`flex flex-col items-center space-y-1 p-2 h-auto min-w-0 flex-1 rounded-lg transition-all duration-200 ${
                    pathname === '/settings' 
                      ? "text-orange-600" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={user.profilePicture || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-xs">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium truncate w-full text-center">Settings</span>
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
