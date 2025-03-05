import Pagination from "@/components/pagination";
import { MovieType } from "@/types/Movie";
import Movie from "./movie";
import { Suspense } from "react";
import Loading from "../loading";

interface MovieProps {
    title: string;
    endpoint: string;
    limit?: number;
    page?: number;
    paginate?: boolean;
}

async function getMovies(endpoint: string, page: number = 1, limit?: number) {
    const url = `https://api.themoviedb.org/3${endpoint}?page=${page}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWJkZjZkNmQ1M2Q5ZDFkOWNmYTg4ZDk0ODUyYzU0MSIsIm5iZiI6MTc0MTEwMTgzNC43MjcsInN1YiI6IjY3YzcxYjBhYzczZjE5OWY2YTkwODkyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JG8DhrnGAIoByfEDuMWmo5mmIU2hv0E_kYcHUDz68M8",
        },
        next: { revalidate: 3600 },
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error("Failed to fetch movies");
        }
        const data: MovieType = await res.json();
        const movies = limit ? data.results.slice(0, limit) : data.results;
        return { movies, totalPages: data.total_pages || 1 };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export default async function Movies({
    title,
    endpoint,
    limit,
    paginate,
    page = 1,
}: MovieProps) {
    const { movies, totalPages } = await getMovies(endpoint, page, limit);

    return (
        <div className="flex flex-col gap-4 items-center justify-start w-full">
            <h1 className="text-2xl font-bold text-start w-full underline underline-offset-9 decoration-amber-600">
                {title}
            </h1>
            <Suspense fallback={<Loading />}>
                <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 w-full">
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            id={movie.id}
                            image={movie.poster_path}
                            title={movie.title || movie.name}
                            releaseDate={
                                movie.release_date || movie.first_air_date
                            }
                        />
                    ))}
                </div>
            </Suspense>

            {paginate && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    url="/movies"
                />
            )}
        </div>
    );
}
