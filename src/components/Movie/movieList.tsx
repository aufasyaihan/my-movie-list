import axios from "axios";
import { Suspense } from "react";
import { MovieType } from "@/types/movie";
import Loading from "../loading";
import Movie from "./movie";

async function Movies({
    endpoint,
    limit,
}: {
    endpoint: string;
    limit?: number;
}) {
    const url = `https://api.themoviedb.org/3${endpoint}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWJkZjZkNmQ1M2Q5ZDFkOWNmYTg4ZDk0ODUyYzU0MSIsIm5iZiI6MTc0MTEwMTgzNC43MjcsInN1YiI6IjY3YzcxYjBhYzczZjE5OWY2YTkwODkyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JG8DhrnGAIoByfEDuMWmo5mmIU2hv0E_kYcHUDz68M8",
        },
    };
    try {
        const { data }: MovieType = await axios.get(url, options);
        const movies = limit ? data.results.slice(0, limit) : data.results;

        return (
            <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 justify-between items-center gap-4 w-full">
                {movies.map((movie) => (
                    <Movie
                        key={movie.id}
                        id={movie.id}
                        image={movie.poster_path}
                        title={movie.title || movie.name}
                        releaseDate={movie.release_date || movie.first_air_date}
                    />
                ))}
            </div>
        );
    } catch (error) {
        return (
            <div className="flex w-full">
                <p className="bg-red-200 p-2 text-red-500 rounded-sm border-l-4">
                    Error Fetching data : {(error as Error).message}
                </p>
            </div>
        );
    }
}

export default function MovieList({
    title,
    endpoint,
    limit,
}: {
    title: string;
    endpoint: string;
    limit?: number;
}) {
    return (
        <div className="flex flex-col gap-4 items-center justify-start w-full">
            <h1 className="text-2xl font-bold text-start w-full underline underline-offset-9 decoration-amber-600">
                {title}
            </h1>
            <Suspense fallback={<Loading />}>
                <Movies endpoint={endpoint} limit={limit} />
            </Suspense>
        </div>
    );
}
