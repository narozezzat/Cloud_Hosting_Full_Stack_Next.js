import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GradientBlob } from "@/components/ui/GradientBlob";

const NotFoundPage = () => {
  return (
    <div className="fix-height relative flex items-center justify-center overflow-hidden bg-background px-4">
      <GradientBlob position="top-right" size="lg" />
      <GradientBlob position="bottom-left" size="md" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Image
          src="/not-found.svg"
          alt="The page you are looking for could not be found"
          width={423}
          height={341}
          priority
          unoptimized
          className="mb-6 h-auto w-full max-w-[320px]"
        />

        <h1 className="font-display text-display-md font-extrabold leading-none tracking-tight text-gradient-brand sm:text-display-lg">
          404
        </h1>

        <p className="mt-4 text-base text-muted-foreground text-balance sm:text-lg">
          Sorry, the page you visited does not exist.
        </p>

        <Button asChild size="lg" className="mt-8">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
