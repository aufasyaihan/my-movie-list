import axios from "axios";
import Movie from "./movie";
import { Suspense } from "react";
import { MovieType, Result } from "@/types/Movie";

async function Movies() {
    const url = "https://api.themoviedb.org/3/trending/all/week?language=en-US";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZWJkZjZkNmQ1M2Q5ZDFkOWNmYTg4ZDk0ODUyYzU0MSIsIm5iZiI6MTc0MTEwMTgzNC43MjcsInN1YiI6IjY3YzcxYjBhYzczZjE5OWY2YTkwODkyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JG8DhrnGAIoByfEDuMWmo5mmIU2hv0E_kYcHUDz68M8",
        },
    };
    const res: MovieType = await axios.get(url, options);
    const data: Result[] = res.data.results;

    return data.map((movie) => (
        <Movie
            key={movie.id}
            id={movie.id}
            image={movie.poster_path}
            title={movie.title || movie.name}
            releaseDate={movie.release_date || movie.first_air_date}
        />
    ));
}

export default function MovieList({ title }: { title: string }) {
    return (
        <>
            <h1 className="text-2xl font-bold text-start w-full px-6 mb-4 underline underline-offset-9 decoration-amber-600">{title}</h1>
            <div className="grid grid-cols-7 gap-4 w-fit">
                <Suspense fallback={<p>Loading...</p>}>
                    <Movies />
                </Suspense>
            </div>
        </>
    );
}
