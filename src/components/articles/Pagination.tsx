"use client";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route?: string;
  className?: string;
}
const Pagination = ({
  pages,
  pageNumber,
  className,
  route,
}: PaginationProps) => {
  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className={`flex items-center justify-center mt-6 pb-20 ${className}`}>
      <Link
        href={pageNumber !== 1 ? `${route}?pageNumber=${prev}` : "#"}
        className={`py-2 px-3 font-bold text-xl ${
          pageNumber === 1
            ? "border border-gray-400 bg-gray-200 text-gray-400 cursor-not-allowed"
            : "border border-gray-700 text-gray-700 cursor-pointer hover:bg-gray-200 transition"
        }`}
        onClick={(e) => pageNumber === 1 && e.preventDefault()}
      >
        <IoIosArrowBack />
      </Link>
      {pagesArray.map((page) => (
        <Link
          href={`${route}?pageNumber=${page}`}
          className={`${pageNumber === page ? "bg-gray-400" : ""} border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
          key={page}
        >
          {page}
        </Link>
      ))}
      <Link
        href={pageNumber !== pages ? `${route}?pageNumber=${next}` : "#"}
        className={`py-2 px-3 font-bold text-xl ${
          pageNumber === pages
            ? "border border-gray-400 bg-gray-200 text-gray-400 cursor-not-allowed"
            : "border border-gray-700 text-gray-700 cursor-pointer hover:bg-gray-200 transition"
        }`}
        onClick={(e) => pageNumber === pages && e.preventDefault()}
      >
        <IoIosArrowForward />
      </Link>
    </div>
  );
};

export default Pagination;
