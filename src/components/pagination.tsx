import Link from "next/link";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    url: string;
}

export default function Pagination({
    currentPage,
    totalPages,
    url,
}: PaginationProps) {
    return (
        <div className="flex justify-between items-center gap-2 mt-6 w-full">
            <span className="font-semibold">
                Page {currentPage} of {totalPages}
            </span>
            <div className="select-none flex gap-2">
                <Link
                    href={`${url}?page=${currentPage - 1}`}
                    className={`px-4 py-2 rounded ${
                        currentPage === 1
                            ? "bg-gray-400 text-gray-200 pointer-events-none"
                            : "bg-amber-700 hover:bg-amber-800 transition-colors ease-in-out duration-300"
                    }`}
                >
                    <MdArrowBackIosNew />
                </Link>

                <Link
                    href={`${url}?page=${currentPage + 1}`}
                    className={`px-4 py-2 rounded ${
                        currentPage === totalPages
                            ? "bg-gray-400 text-gray-200 pointer-events-none"
                            : "bg-amber-700 hover:bg-amber-800 transition-colors ease-in-out duration-300"
                    }`}
                >
                    <MdArrowForwardIos />
                </Link>
            </div>
        </div>
    );
}
