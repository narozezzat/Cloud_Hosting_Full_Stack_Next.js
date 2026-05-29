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

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
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
          <CardTitle>{error.message || "Something went wrong"}</CardTitle>
          <CardDescription>
            Sorry, something went wrong. Please try again later.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          You can retry the action, or head back to the home page.
        </CardContent>
        <CardFooter className="justify-center gap-3">
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild>
            <Link href="/">Back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
