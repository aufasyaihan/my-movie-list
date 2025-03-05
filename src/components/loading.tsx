export default function Loading() {
    return (
        <div className="grid grid-cols-7 gap-4 w-fit">
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center w-48 h-86 gap-2 animate-pulse"
                >
                    <div className="w-full h-full relative rounded-lg overflow-hidden bg-neutral-600" />
                    <div className="w-full h-8 bg-neutral-600 rounded-md" />
                </div>
            ))}
        </div>
    );
}
