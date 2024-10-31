'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Bell, Images, MoreVertical, HelpCircle, LogOut, Sun, Moon, Laptop, Home, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-background border-r flex flex-col justify-center items-center py-10">
        <Link href="/" className="mb-8">
          <Image src="/_static/logo/Mainlogo.svg" alt="ThumbforgeAI Logo" width={40} height={40} />
        </Link>
        <nav className="flex-1 flex flex-col w-full items-center space-y-4">
          <Link href="/gallery" className="flex flex-col items-center mb-3 my-3 pb-3 w-full border-b-2 hover:scale-105 duration-100 ease-in-out">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Gallery</span>
          </Link>
          <Link href="/generate" className="flex flex-col items-center my-3 pb-3 w-full border-b-2 hover:scale-105 duration-100 ease-in-out">
            <Images className="h-6 w-6" />
            <span className="text-xs mt-1">Generate</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col items-center space-y-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <Avatar>
            {/* <AvatarImage src="/placeholder-avatar.jpg" alt="User" /> */}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <DropdownMenu open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-6 w-6 bg-slate-900" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="flex items-center space-x-2 p-2">
                <Avatar>
                  {/* <AvatarImage src="/placeholder-avatar.jpg" alt="User" /> */}
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Username</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
              </div>
              <div className="p-2">
                <p className="text-sm font-medium">Credits remaining: 50/100</p>
                <Progress value={50} className="mt-2" />
              </div>
              <DropdownMenuItem asChild>
                <Button variant="outline" className="w-full justify-start">
                  Upgrade Plan
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Theme</p>
                <div className="flex justify-between">
                  <Button variant="ghost" size="icon" onClick={() => setTheme('light')}>
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setTheme('dark')}>
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setTheme('system')}>
                    <Laptop className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-2 text-xs text-muted-foreground">
                <Link href="/terms" className="hover:underline">Terms</Link>
                {' • '}
                <Link href="/privacy" className="hover:underline">Privacy</Link>
              </div>
              <div className="p-2 flex justify-center space-x-2">
                <Link href="https://discord.gg/yourserver" target="_blank" rel="noopener noreferrer">
                  <Image src="/discord-icon.png" alt="Discord" width={20} height={20} />
                </Link>
                <Link href="https://twitter.com/ibrahimdoba" target="_blank" rel="noopener noreferrer">
                  <Image src="/twitter-icon.png" alt="Twitter" width={20} height={20} />
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}