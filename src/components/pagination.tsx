import Link from "next/link";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  url: string;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  url,
  siblingCount = 1,
}: PaginationProps) {
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  let pages: (number | string)[] = [];
  const leftSibling = Math.max(2, currentPage - siblingCount);
  const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);

  if (leftSibling > 2) pages.push(1, "...");
  else pages.push(1);

  pages = [...pages, ...range(leftSibling, rightSibling)];

  if (rightSibling < totalPages - 1) pages.push("...", totalPages);
  else if (rightSibling < totalPages) pages.push(totalPages);

  return (
    <div className="flex justify-center items-center gap-2">
      <Link
        href={`${url}?page=${currentPage - 1}`}
        className={`p-2 rounded ${
          currentPage === 1
            ? "bg-neutral-300 text-neutral-500 pointer-events-none"
            : "bg-amber-600 text-white hover:bg-amber-700 transition"
        }`}
      >
        <MdArrowBackIosNew />
      </Link>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <Link
            key={index}
            href={`${url}?page=${page}`}
            className={`px-4 py-1 rounded ${
              page === currentPage
                ? "bg-amber-500 text-white font-bold pointer-events-none"
                : "bg-amber-700 text-white hover:bg-amber-900 transition"
            }`}
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            {page}
          </span>
        )
      )}

      <Link
        href={`${url}?page=${currentPage + 1}`}
        className={`p-2 rounded ${
          currentPage === totalPages
            ? "bg-neutral-300 text-neutral-500 pointer-events-none"
            : "bg-amber-600 text-white hover:bg-amber-700 transition"
        }`}
      >
        <MdArrowForwardIos />
      </Link>
    </div>
  );
}
