export default function SkeletonCard({
    limit = 10,
    scroll,
}: {
    limit?: number;
    scroll?: boolean;
}) {
    return (
        <div className={`${scroll ? "flex" : "grid" } grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full overflow-hidden`}>
            {Array.from({ length: limit }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center flex-shrink-0 w-24 h-40 sm:w-48 sm:h-72 md:w-56 md:h-96 gap-1 group cursor-pointer"
                >
                    <div className="w-full h-full relative rounded-lg overflow-hidden bg-neutral-600" />
                    <div className="w-full h-8 bg-neutral-600 rounded-md" />
                </div>
            ))}
        </div>
    );
}
