import Carousel from "@/components/carousel";
import Movie from "@/components/Movie/movie";
import Chips from "@/components/UI/chips";
import Video from "@/components/video";
import { getDataDetail, getYear } from "@/lib/utils";
import Image from "next/image";

interface TVPageParams {
    params: Promise<{ id: string }>;
}

export default async function TVPage({ params }: TVPageParams) {
    const { id } = await params;
    const {
        dataDetail: tv,
        video,
        images,
        similar,
    } = await getDataDetail(id, "tv");
    const year = getYear(tv.first_air_date);
    const teaser = video.results.find(
        (video) => (video.type === "Teaser" || video.type === "Trailer") && (video.name.includes("Trailer") || video.name.includes("Teaser"))
    );
    const backdrops = images.backdrops;
    const limitSimilar = similar.results.slice(0, 7);

    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <div className="flex gap-4 w-full justify-center flex-wrap md:flex-nowrap">
                <div className="w-64 h-96 relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        className="object-cover"
                        src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                        alt={tv.original_name}
                        priority
                        fill
                    />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2 justify-start items-center flex-wrap md:flex-nowrap">
                        <h1 className="text-lg md:text-2xl font-bold text-start underline underline-offset-9 decoration-amber-600">
                            {tv.name} ({year})
                        </h1>
                        <h1 className="font-semibold">
                            ⭐ {tv.vote_average.toFixed(1)} ({tv.vote_count}{" "}
                            Votes)
                        </h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            {tv.adult && <Chips type="age">21+</Chips>}
                            <Chips type="lang" style="uppercase">
                                {tv.original_language}
                            </Chips>
                            <Chips type="status">{tv.status}</Chips>
                            <Chips type="status">
                                {tv.in_production ? "Ongoing" : "Finished"}
                            </Chips>
                        </div>
                        <div className="flex gap-2">
                            {tv.genres.map((genre) => (
                                <Chips type="genre" key={genre.id}>
                                    {genre.name}
                                </Chips>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <h2 className="md:text-lg font-semibold">
                                Total Seasons
                            </h2>
                            <p className="text-sm md:text-md text-neutral-300">
                                {tv.number_of_seasons}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="md:text-lg font-semibold">
                                Total Episodes
                            </h2>
                            <p className="text-sm md:text-md text-neutral-300">
                                {tv.number_of_episodes}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="md:text-lg font-semibold">
                            Production Companies
                        </h2>
                        <p className="text-sm md:text-md text-neutral-300">
                            {tv.production_companies
                                .map((company) => company.name)
                                .join(", ")}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="md:text-lg font-semibold">Overview</h2>
                        {tv.tagline && (
                            <blockquote className="text-sm md:text-md text-neutral-200 font-medium italic">
                                &quot;{tv.tagline}&quot;
                            </blockquote>
                        )}
                        <p className="text-sm md:text-md text-neutral-300">
                            {tv.overview}
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`flex w-full flex-wrap md:flex-nowrap ${
                    !teaser ? "flex-row-reverse" : ""
                } justify-between gap-4`}
            >
                <div
                    className={`flex flex-col gap-4 w-full ${
                        !teaser ? "hidden lg:block" : ""
                    }`}
                >
                    {teaser && (
                        <>
                            <h2 className="text-xl font-semibold underline underline-offset-9 decoration-amber-600">
                                Teaser
                            </h2>

                            <Video name={teaser.name} id={teaser.key} />
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <h2 className="text-xl font-semibold underline underline-offset-9 decoration-amber-600">
                        Images
                    </h2>
                    <Carousel images={backdrops} />
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <h2 className="text-xl font-semibold underline underline-offset-9 decoration-amber-600">
                    You May Like
                </h2>
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
                    {limitSimilar.map((similar) => (
                        <Movie
                            scroll
                            key={similar.id}
                            media="tv"
                            id={similar.id}
                            image={similar.poster_path}
                            title={similar.title || similar.name}
                            releaseDate={
                                similar.release_date || similar.first_air_date
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
