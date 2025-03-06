import SkeletonCard from "@/components/skeletonCard";

export default function Loading() {
    return (
        <div className="flex flex-col gap-4 items-center justify-start w-full animate-pulse">
            <div className="flex w-full">
                <div className="w-64 bg-neutral-600 h-10 rounded-md"></div>
            </div>
            <SkeletonCard />
        </div>
    );
}
