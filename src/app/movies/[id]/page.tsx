import Carousel from "@/components/carousel";
import Movie from "@/components/Movie/movie";
import Chips from "@/components/UI/chips";
import Video from "@/components/video";
import { getDataDetail, getYear } from "@/lib/utils";
import Image from "next/image";

interface MoviePageParams {
    params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageParams) {
    const { id } = await params;
    const { dataDetail, video, images, recommendations } = await getDataDetail(
        id,
        "movie"
    );
    const year = getYear(dataDetail.release_date);
    const teaser = video.results.find(
        (video) => video.type === "Teaser" || "Trailer"
    );
    const backdrops = images.backdrops;
    const limitRecommendations = recommendations.results.slice(0, 7);

    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <div className="flex gap-4 w-full">
                <div className="w-64 h-96 relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                        className="object-cover"
                        src={`https://image.tmdb.org/t/p/w500${dataDetail.poster_path}`}
                        alt={dataDetail.original_title}
                        priority
                        fill
                    />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2 justify-start items-center">
                        <h1 className="text-2xl font-bold text-start underline underline-offset-9 decoration-amber-600">
                            {dataDetail.title} ({year})
                        </h1>
                        <h1 className="font-semibold">
                            ⭐ {dataDetail.vote_average.toFixed(1)} (
                            {dataDetail.vote_count} Votes)
                        </h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            {dataDetail.adult && <Chips type="age">21+</Chips>}
                            <Chips type="lang" style="uppercase">
                                {dataDetail.original_language}
                            </Chips>
                            <Chips type="status">{dataDetail.status}</Chips>
                        </div>
                        <div className="flex gap-2">
                            {dataDetail.genres.map((genre) => (
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
                            {dataDetail.production_companies
                                .map((company) => company.name)
                                .join(", ")}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Overview</h2>
                        {dataDetail.tagline && (
                            <blockquote className="text-neutral-200 font-medium italic">
                                &quot;{dataDetail.tagline}&quot;
                            </blockquote>
                        )}
                        <p className="text-neutral-300">
                            {dataDetail.overview}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between gap-4">
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
