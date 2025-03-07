"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { getData, getYear } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

interface Data {
    id: number;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
}

interface SearchProps {
    placeholder: string;
    type: string;
}

export default function Search({ placeholder, type }: SearchProps) {
    const [query, setQuery] = useState("");
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length < 2) {
            setData([]);
            return;
        }

        setLoading(true);
        const fetchMovies = async () => {
            try {
                const resMovie = await getData(
                    `/search/movie`,
                    1,
                    undefined,
                    undefined,
                    query
                );
                const resTV = await getData(
                    `/search/tv`,
                    1,
                    undefined,
                    undefined,
                    query
                );
                setData([...resMovie.movies, ...resTV.movies]);
            } catch (error) {
                throw new Error(`Failed to fetch data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchMovies, 500);
        return () => clearTimeout(debounce);
    }, [query]);

    return (
        <div className="flex items-center relative w-full">
            <input
                className="bg-neutral-600 placeholder:text-neutral-400 text-white px-2 py-1 rounded-l-md focus:outline-none w-full"
                type={type}
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <button
                    className="absolute right-8 p-2 cursor-pointer"
                    onClick={() => setQuery("")}
                >
                    <IoClose />
                </button>
            )}
            <button className="p-2 rounded-r-md bg-neutral-600">
                <FaSearch />
            </button>
            {query && (
                <div className="absolute top-10 max-h-96 overflow-y-auto w-full bg-neutral-800 rounded-md shadow-lg p-2">
                    {loading ? (
                        <p className="text-white">Loading...</p>
                    ) : data.length > 0 ? (
                        data.map((item) => {
                            const year = getYear(
                                item.release_date || item.first_air_date || ""
                            );
                            return (
                                <Link
                                    key={item.id}
                                    href={`/${item.name ? "tv" : "movies"}/${
                                        item.id
                                    }`}
                                    onClick={() => setQuery("")}
                                    className="flex text-white hover:bg-neutral-700 p-2 rounded-sm"
                                >
                                    {item.title || item.name}{item.name ? " - Series " : " "}
                                    {!isNaN(year) && `(${year})`}
                                </Link>
                            );
                        })
                    ) : (
                        <p className="text-white">No results found</p>
                    )}
                </div>
            )}
        </div>
    );
}
