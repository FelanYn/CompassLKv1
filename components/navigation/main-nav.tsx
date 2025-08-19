"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Menu,
  Home,
  Compass,
  Calendar,
  Cloud,
  Star,
  User,
  MessageCircle,
  Bell,
  MessageSquare,
} from "lucide-react"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Destinations", href: "/destinations", icon: Compass },
  { name: "Itineraries", href: "/itineraries", icon: Calendar },
  { name: "Map", href: "/map", icon: MapPin },
  { name: "Weather", href: "/weather", icon: Cloud },
  { name: "Events", href: "/events", icon: Star },
  { name: "Reviews", href: "/reviews", icon: MessageSquare },
]

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <MapPin className="h-8 w-8" />
          <span className="text-xl font-bold">Compass LK</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4" />
            <span className="ml-2">Help</span>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/profile">
              <User className="h-4 w-4" />
              <span className="ml-2">Profile</span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 mt-6">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-6 w-6" />
                <span className="text-lg font-bold">Compass LK</span>
              </div>

              <nav className="flex flex-col gap-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-6 border-t">
                <Button variant="ghost" className="justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  <Badge variant="destructive" className="ml-auto h-5 w-5 rounded-full p-0 text-xs">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" className="justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
                <Button variant="outline" className="justify-start bg-transparent" asChild>
                  <Link href="/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/login">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="/auth/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
