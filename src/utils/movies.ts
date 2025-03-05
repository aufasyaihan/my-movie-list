import { MovieType } from "@/types/Movie";

export async function getMovies(
    endpoint: string,
    page: number,
    limit?: number
) {
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
