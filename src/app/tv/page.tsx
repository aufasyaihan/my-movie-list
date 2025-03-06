import Movies from "@/components/Movie/movies";

export default async function MoviesPage({
    searchParams,
}: {
    searchParams: {
        page?: Promise<string>;
    }
}) {
    const page = await searchParams.page;
    const currentPage = page ? parseInt(page) : 1;

    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <Movies title="All TV Series" endpoint="/popular" page={currentPage} paginate type="tv"/>
        </section>
    );
}
