"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, FileText, Lock, Upload } from "lucide-react";

export default function HomePage() {
  const { status } = useSession();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={status === "authenticated" ? "/dashboard" : "/auth/signup"}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
          >
            🚀 <span className="text-primary">FileVault</span> is now in public beta
            <ArrowRight className="ml-1 h-4 w-4 inline-block" />
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Secure file management for the modern web
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Upload, manage, and share your files with confidence. Built with security and ease of use in mind.
          </p>
          <div className="space-x-4">
            <Link
              href={status === "authenticated" ? "/dashboard" : "/auth/signup"}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/yourusername/filevault"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>

      <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to manage your files efficiently
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Upload className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">Easy Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop interface for quick file uploads
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FileText className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">File Management</h3>
                <p className="text-sm text-muted-foreground">
                  Organize and manage your files with ease
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Lock className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">Secure Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Your files are encrypted and stored securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Ready to get started?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Join thousands of users who trust FileVault
          </p>
          <Link
            href={status === "authenticated" ? "/dashboard" : "/auth/signup"}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}