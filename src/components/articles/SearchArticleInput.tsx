"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface SearchArticleInputProps {
  className?: string;
  /** Prefill the box (e.g. on the search results page). */
  defaultValue?: string;
}

const SearchArticleInput = ({
  className,
  defaultValue = "",
}: SearchArticleInputProps) => {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState(defaultValue);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    router.push(
      `/articles/search?searchText=${encodeURIComponent(searchText.trim())}`,
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full items-center gap-2 ${className ?? ""}`}
      role="search"
    >
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Search for an article…"
          aria-label="Search articles"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>
      <Button
        type="submit"
        aria-label="Search articles"
        title="Search"
        className="h-11 w-11 shrink-0 gap-1.5 p-0 sm:w-auto sm:px-5"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
};

export default SearchArticleInput;
