import Chips from "@/components/UI/chips";
import { getMovieDetail } from "@/lib/utils";
import Image from "next/image";

interface MoviePageParams {
    params: {
        id: string;
    };
}

export default async function MoviePage({ params }: MoviePageParams) {
    const id = await params.id;
    const movie = await getMovieDetail(id);
    console.log(movie);
    const year = new Date(movie.release_date).getFullYear();

    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <div className="flex gap-4 w-full">
                <div className="w-52 h-86 relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        className="object-cover"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                        priority
                        fill
                    />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2 justify-start items-center">
                        <h1 className="text-2xl font-bold text-start underline underline-offset-9 decoration-amber-600">
                            {movie.title} ({year})
                        </h1>
                        <h1 className="font-semibold">
                            ⭐ {movie.vote_average.toFixed(1)} (
                            {movie.vote_count} Votes)
                        </h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            {movie.adult && <Chips type="age">21+</Chips>}
                            <Chips type="lang" style="uppercase">
                                {movie.original_language}
                            </Chips>
                            <Chips type="status">{movie.status}</Chips>
                        </div>
                        <div className="flex gap-2">
                            {movie.genres.map((genre) => (
                                <Chips type="genre" key={genre.id}>
                                    {genre.name}
                                </Chips>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">
                            Production Companies
                        </h2>
                        <p className="text-neutral-300">
                            {movie.production_companies
                                .map((company) => company.name)
                                .join(", ")}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Overview</h2>
                        <p className="text-neutral-300">{movie.overview}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
