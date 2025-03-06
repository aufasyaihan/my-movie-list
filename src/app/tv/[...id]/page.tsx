import Carousel from "@/components/carousel";
import Movie from "@/components/Movie/movie";
import Chips from "@/components/UI/chips";
import Video from "@/components/video";
import { getDataDetail } from "@/lib/utils";
import Image from "next/image";

interface TVPageParams {
    params: {
        id: Promise<string>;
    };
}

export default async function TVPage({ params }: TVPageParams) {
    const id = await params.id;
    const {
        dataDetail: tv,
        video,
        images,
        recommendations,
    } = await getDataDetail(id, "tv");
    const year = new Date(tv.first_air_date).getFullYear();
    const teaser = video.results.find(
        (video) => video.type === "Teaser" || "Trailer"
    );
    const backdrops = images.backdrops;
    const limitRecommendations = recommendations.results.slice(0, 7);

    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <div className="flex gap-4 w-full h-full">
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
                    <div className="flex gap-2 justify-start items-center">
                        <h1 className="text-2xl font-bold text-start underline underline-offset-9 decoration-amber-600">
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
                            <h2 className="text-lg font-semibold">
                                Total Seasons
                            </h2>
                            <p className="text-neutral-300">
                                {tv.number_of_seasons}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">
                                Total Episodes
                            </h2>
                            <p className="text-neutral-300">
                                {tv.number_of_episodes}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">
                            Production Companies
                        </h2>
                        <p className="text-neutral-300">
                            {tv.production_companies
                                .map((company) => company.name)
                                .join(", ")}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Overview</h2>
                        {tv.tagline && (
                            <blockquote className="text-neutral-200 font-medium italic">
                                &quot;{tv.tagline}&quot;
                            </blockquote>
                        )}
                        <p className="text-neutral-300">{tv.overview}</p>
                    </div>
                </div>
            </div>
            <div
                className={`flex w-full ${
                    !teaser ? "flex-row-reverse" : ""
                } justify-between gap-4`}
            >
                <div className="flex flex-col gap-4 w-full">
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
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
                    {limitRecommendations.map((recommendation) => (
                        <Movie
                            key={recommendation.id}
                            media={recommendation.media_type}
                            id={recommendation.id}
                            image={recommendation.poster_path}
                            title={recommendation.title || recommendation.name}
                            releaseDate={
                                recommendation.release_date ||
                                recommendation.first_air_date
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
