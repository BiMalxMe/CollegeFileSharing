import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="flex items-center space-x-4">
            <GraduationCap className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              College File Share
            </h1>
          </div>
          
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            A secure platform for students and faculty to share academic resources,
            collaborate on projects, and access course materials.
          </p>

          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Link href="/auth/signin">
              <Button size="lg" className="w-full min-[400px]:w-auto">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <svg
                className=" h-12 w-12 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                <path d="M18 8h4v4" />
                <path d="m22 8-5 5" />
              </svg>
              <h2 className="text-xl font-bold">Easy Sharing</h2>
              <p className="text-center text-muted-foreground">
                Share files securely with your classmates and professors
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <svg
                className=" h-12 w-12 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <h2 className="text-xl font-bold">Secure Storage</h2>
              <p className="text-center text-muted-foreground">
                Your files are encrypted and stored securely
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <svg
                className=" h-12 w-12 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 12h-6.5" />
                <path d="m13 15 3-3-3-3" />
                <path d="M8 12h.01" />
              </svg>
              <h2 className="text-xl font-bold">Real-time Access</h2>
              <p className="text-center text-muted-foreground">
                Access your files from anywhere, anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}