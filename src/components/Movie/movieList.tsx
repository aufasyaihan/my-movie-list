import Pagination from "@/components/pagination";
import Movie from "./movie";
import { getMovies } from "@/lib/utils";

interface MovieProps {
    title: string;
    endpoint: string;
    limit?: number;
    page?: number;
    paginate?: boolean;
    media?: string;
}

export default async function Movies({
    title,
    endpoint,
    limit,
    paginate,
    page = 1,
    media,
}: MovieProps) {
    const { movies, totalPages } = await getMovies(endpoint, page, limit);

    return (
        <div className="flex flex-col gap-4 items-center justify-start w-full">
            <h1 className="text-2xl font-bold text-start w-full underline underline-offset-9 decoration-amber-600">
                {title}
            </h1>
                <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 w-full">
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            media={movie.media_type || media}
                            id={movie.id}
                            image={movie.poster_path}
                            title={movie.title || movie.name}
                            releaseDate={
                                movie.release_date || movie.first_air_date
                            }
                        />
                    ))}
                </div>

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
