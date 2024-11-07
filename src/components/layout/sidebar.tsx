"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import {
  Bell,
  CreditCard,
  HelpCircle,
  Home,
  Images,
  Laptop,
  LogOut,
  Moon,
  MoreHorizontal,
  Sun,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

import { Icons } from "../shared/icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const user = session?.user;
  const isFreeUser = user?.subscriptionPlan === "free";
  const maxCredits = getMaxCredits(user?.subscriptionPlan);
  const creditsPercentage = (user?.credits! / maxCredits) * 100;

  function getMaxCredits(plan: string | undefined) {
    switch (plan) {
      case "basic":
        return 100;
      case "pro":
        return 300;
      case "premium":
        return 1000;
      default:
        return 6;
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="fixed flex h-full w-20 flex-col items-center border-r bg-background py-10">
        <Link href="/" className="mb-8">
          <Image
            src="/_static/logo/Mainlogo.svg"
            alt="ThumbforgeAI Logo"
            width={40}
            height={40}
          />
        </Link>
        <nav className="flex w-full flex-1 flex-col items-center space-y-4">
          <Link
            href="/generate"
            className="my-3 flex w-full flex-col items-center border-b-2 pb-3 duration-100 ease-in-out hover:scale-105"
          >
            <Images className="h-6 w-6" />
            <span className="mt-1 text-xs">Generate</span>
          </Link>
          <Link
            href="/gallery"
            className="my-3 mb-3 flex w-full flex-col items-center border-b-2 pb-3 duration-100 ease-in-out hover:scale-105"
          >
            <Home className="h-6 w-6" />
            <span className="mt-1 text-xs">Gallery</span>
          </Link>
        </nav>
        <div className="mt-auto flex flex-col items-center space-y-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <Link href={`/${user?.username}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.image || undefined}
                alt={user?.name || "User"}
              />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </Link>
          <DropdownMenu open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="right"
              className="ml-5 mr-24 w-64 bg-[#18181B]"
            >
              <div className="flex items-center space-x-2 p-2">
                <Avatar>
                  <AvatarImage
                    src={user?.image || undefined}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="p-2">
                <p className="text-sm font-medium">
                  Credits remaining: {user?.credits}/{maxCredits}
                </p>
                <Progress value={creditsPercentage} className="mt-2" />
              </div>
              <DropdownMenuItem asChild>
                <Link href="/subscription">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    {isFreeUser ? "Upgrade Plan (Free)" : "Manage Subscription"}
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </DropdownMenuItem>
              <div className="p-2">
                <p className="mb-2 text-sm font-medium">Theme</p>
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex justify-around p-2 text-xs text-muted-foreground">
                <Link href="/terms" className="hover:underline">
                  Terms
                </Link>
                {" • "}
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
                <Link
                  href="https://discord.gg/yourserver"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.discord className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/ibrahimdoba"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icons.twitter className="h-5 w-5" />
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-20 flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
