import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { Icons } from "@/components/shared/icons";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            src="/_static/logo/Mainlogo.svg"
            alt="ThumbforgeAI Logo"
            width={64}
            height={64}
            className="mx-auto"
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to ThumbforgeAI
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <AuthForm />
        <div className="flex flex-col items-end justify-end space-y-2 text-center text-sm">
          <p className="text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link
            href="https://twitter.com/thumbforgeai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://discord.gg/thumbforgeai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.discord className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/company/thumbforgeai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
