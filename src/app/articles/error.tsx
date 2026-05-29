"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ArticlesErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="fix-height flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive"
            aria-hidden="true"
          >
            <AlertTriangle className="h-6 w-6" />
          </span>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>
            This is the custom error page for the articles route.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Error message: {error.message}
        </CardContent>
        <CardFooter className="justify-center gap-3">
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild>
            <Link href="/">Go to home page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArticlesErrorPage;
