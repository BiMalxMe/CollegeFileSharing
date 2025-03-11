import { Button } from "@/components/ui/button";
import { Github, Twitter } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        asChild
      >
        <a
          href="https://github.com/bimalxde"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="h-4 w-4" />
          <span className="sr-only">GitHub</span>
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        asChild
      >
        <a
          href="https://twitter.com/bimalxde"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Twitter</span>
        </a>
      </Button>
    </div>
  );
} 