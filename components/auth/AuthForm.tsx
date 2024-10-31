
"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Icons } from "@/components/shared/icons";

import { Button } from "@/components/ui/button";

export function AuthForm() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isDiscordLoading, setIsDiscordLoading] = useState(false);
  
    const handleGoogleSignIn = async () => {
      setIsGoogleLoading(true);
      await signIn("google", { redirect: true, redirectTo: "/" });
      // setIsGoogleLoading(false);
    };
  
    const handleDiscordSignIn = async () => {
      setIsDiscordLoading(true);
      await signIn("discord", { redirect: true, redirectTo: "/" });
      // setIsDiscordLoading(false);
    };
    return(
<div className="grid gap-4">
          <Button
            variant="outline"
            onClick={() => handleGoogleSignIn()}
            disabled={isGoogleLoading || isDiscordLoading}
            // isLoading={isGoogleLoading}
            className="w-full"
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button
            onClick={() => handleDiscordSignIn()}
            variant="outline"
            className="w-full"
            disabled={isGoogleLoading || isDiscordLoading}
            // isLoading={isDiscordLoading}
          >
            <Icons.discord className="mr-2 h-4 w-4" />
            Continue with Discord
          </Button>
        </div>
    )
}