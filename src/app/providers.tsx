"use client";

import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/components/modals/providers";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <EdgeStoreProvider>
          <ModalProvider>{children}</ModalProvider>
          <Analytics />
          <Toaster richColors closeButton />
        </EdgeStoreProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Providers;
