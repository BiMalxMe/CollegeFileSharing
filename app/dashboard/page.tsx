"use client"

import { useSession } from "next-auth/react";
import { FileUpload } from "@/components/file-upload";
import { FileList } from "@/components/file-list";
import { useRef } from "react";
import { UserNav } from "@/components/user-nav";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const fileListRef = useRef<{ fetchFiles: () => Promise<void> }>(null);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground">
            Please sign in to access your dashboard
          </p>
          <div className="mt-4">
            <a href="/auth/signin" className="btn-primary">
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <UserNav />
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Upload Files</h2>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground">
              <div className="p-6">
                <FileUpload onSuccess={() => fileListRef.current?.fetchFiles()} />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Your Files</h2>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground">
              <div className="p-6">
                <FileList ref={fileListRef} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}