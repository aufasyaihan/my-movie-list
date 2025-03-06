import SkeletonCard from "@/components/skeletonCard";

export default function Loading() {
    return (
        <div className="flex flex-col gap-4 items-center justify-start w-full">
            <h1 className="text-2xl font-bold text-start w-full underline underline-offset-9 decoration-amber-600">
                All Movies
            </h1>
            <SkeletonCard />
        </div>
    );
}
