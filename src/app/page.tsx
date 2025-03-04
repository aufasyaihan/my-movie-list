import MovieList from "@/components/Movie/movieList";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center">
      <MovieList title="Trending Now"/>
    </section>
  );
}
