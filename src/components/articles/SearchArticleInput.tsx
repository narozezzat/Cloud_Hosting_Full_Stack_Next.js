"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchArticleInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ searchText });
    router.push(`/articles/search?searchText=${searchText}`);
  };

  return (
    <form onSubmit={formSubmitHandler} className="my-5 w-full md:w-2/3 m-auto">
      <div className="relative">
        <input
          className="w-full p-3 rounded text-xl border-none text-gray-900 pr-12"
          type="search"
          placeholder="Search for article"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <FaSearch size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchArticleInput;
