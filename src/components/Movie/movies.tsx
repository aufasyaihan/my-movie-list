import Pagination from "@/components/pagination";
import Movie from "./movie";
import { getData } from "@/lib/utils";

interface MovieProps {
    title: string;
    endpoint: string;
    limit?: number;
    page?: number;
    paginate?: boolean;
    type?: string;
    scroll?: boolean;
}

export default async function Movies({
    type,
    title,
    endpoint,
    limit,
    paginate,
    page = 1,
    scroll,
}: MovieProps) {
    const { movies, totalPages } = await getData(endpoint, page, type, limit);

    return (
        <div className="flex flex-col gap-4 items-center justify-start w-full">
            <h1 className="text-2xl font-bold text-start w-full underline underline-offset-9 decoration-amber-600">
                {title}
            </h1>
            <div className="flex flex-col gap-4 w-full">
                <div
                    className={
                        !scroll
                            ? `grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full`
                            : "flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar"
                    }
                >
                    {movies.map((movie) => (
                        <Movie
                            key={movie.id}
                            media={movie.media_type || type}
                            id={movie.id}
                            image={movie.poster_path}
                            title={movie.title || movie.name}
                            releaseDate={
                                movie.release_date || movie.first_air_date
                            }
                        />
                    ))}
                </div>
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
