import MovieList from "@/components/Movie/movieList";

export default function Home() {
    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <MovieList
                title="Trending Now"
                endpoint="/trending/all/week"
            />
            <MovieList
                title="Popular Movies"
                endpoint="/movie/now_playing"
                limit={7}
            />
            <MovieList
                title="Popular TV Shows"
                endpoint="/tv/popular"
                limit={7}
            />
        </section>
    );
}
