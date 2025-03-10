"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { FileList } from "@/components/file-list";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [isUploading, setIsUploading] = useState(false);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <UserNav />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <FileUpload
            onUploadStart={() => setIsUploading(true)}
            onUploadComplete={() => setIsUploading(false)}
          />
        </div>

        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-semibold">Your Files</h2>
            <Button variant="outline" disabled={isUploading}>
              Refresh
            </Button>
          </div>
          <FileList />
        </div>
      </main>
    </div>
  );
}