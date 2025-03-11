import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';
import { SocialLinks } from "@/components/social-links";
import { AnimatedTitle } from "@/components/animated-title";
import { ModeToggle } from "@/components/mode-toggle";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FileVault - Secure File Management',
  description: 'A modern file management system for your documents',
};

// Configure Cloudinary globally
if (typeof window !== 'undefined') {
  (window as any).cloudinary = {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="min-h-screen flex flex-col">
              <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
                <div className="container py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 animate-fade-in">
                      <AnimatedTitle />
                    </div>
                    <div className="flex items-center gap-4">
                      <SocialLinks />
                      <div className="h-6 w-px bg-border" />
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              </header>

              <main className="flex-1 container py-8 animate-slide-up">
                {children}
              </main>

              <footer className="border-t py-6 bg-muted/50">
                <div className="container text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} BiMalxMe. All rights reserved.
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}