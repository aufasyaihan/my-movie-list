import MovieList from "@/components/Movie/movieList";

export default async function MoviesPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const params = await searchParams;
    const currentPage = params.page ? parseInt(params.page) : 1;

    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <MovieList title="All Movies" endpoint="/trending/movie/week" page={currentPage} paginate/>
        </section>
    );
}
