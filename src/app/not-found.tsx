import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-section">
      <div className="page-container max-w-2xl text-center">
        <p className="editorial-subheading mb-6">404</p>
        <h1 className="font-display text-display-xl mb-8">
          Page not found
        </h1>
        <p className="text-sm text-foreground-muted mb-12 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
}
