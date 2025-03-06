import Movies from "@/components/Movie/movies";

export default function Home() {
    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <Movies
                title="Trending Now"
                endpoint="/trending/all/week"
            />
            <Movies
                title="Popular Movies"
                endpoint="/now_playing"
                limit={10}
                type="movie"
                scroll
            />
            <Movies
                title="Popular TV Shows"
                endpoint="/popular"
                limit={10}
                type="tv"
                scroll
            />
        </section>
    );
}
