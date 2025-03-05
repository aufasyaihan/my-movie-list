export default function SkeletonCard() {
    return (
        <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 w-full justify-between">
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center w-full h-86 gap-2"
                >
                    <div className="w-full h-full relative rounded-lg overflow-hidden bg-neutral-600" />
                    <div className="w-full h-8 bg-neutral-600 rounded-md" />
                </div>
            ))}
        </div>
    );
}
