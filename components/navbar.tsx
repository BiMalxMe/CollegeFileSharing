"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { FileText } from "lucide-react";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
        >
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">FileVault</span>
        </Link>

        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          ) : status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <UserNav />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
} 