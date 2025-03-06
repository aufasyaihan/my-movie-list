"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { getData, getYear } from "@/lib/utils";

interface Data {
    id: number;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
}

interface InputProps {
    placeholder: string;
    type: string;
    search?: boolean;
}

export default function Input({ placeholder, type, search }: InputProps) {
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
                className="dark:bg-neutral-600 dark:placeholder:text-neutral-400 dark:text-white px-2 py-1 rounded-l-md focus:outline-none w-full"
                type={type}
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {search && (
                <button className="p-2 bg-white rounded-r-md dark:bg-neutral-700 hover:dark:bg-white/20 cursor-pointer transition-all ease-in-out duration-200">
                    <FaSearch />
                </button>
            )}
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
                                    className="flex text-white hover:bg-neutral-700 p-2 rounded-md"
                                >
                                    {item.title || item.name}{" "}
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
