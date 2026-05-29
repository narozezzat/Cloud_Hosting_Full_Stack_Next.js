"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const SearchArticleInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    router.push(`/articles/search?searchText=${encodeURIComponent(searchText)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-2"
      role="search"
    >
      <Input
        type="search"
        placeholder="Search for an article…"
        aria-label="Search articles"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        leftIcon={<Search className="h-4 w-4" />}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};

export default SearchArticleInput;
