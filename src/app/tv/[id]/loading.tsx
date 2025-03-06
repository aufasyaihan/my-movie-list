import SkeletonCard from "@/components/skeletonCard";

export default function Loading() {
    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full animate-pulse">
            <div className="flex gap-4 w-full">
                <div className="w-52 h-86 bg-neutral-700 rounded-lg" />
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2 justify-start items-center">
                        <div className="h-8 w-3/4 bg-neutral-700 rounded-md" />
                        <div className="h-6 w-1/4 bg-neutral-700 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <div className="w-10 h-6 bg-neutral-700 rounded-md" />
                            <div className="w-10 h-6 bg-neutral-700 rounded-md" />
                            <div className="w-14 h-6 bg-neutral-700 rounded-md" />
                        </div>
                        <div className="flex gap-2">
                            <div className="w-16 h-6 bg-neutral-700 rounded-md" />
                            <div className="w-20 h-6 bg-neutral-700 rounded-md" />
                            <div className="w-24 h-6 bg-neutral-700 rounded-md" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="h-6 w-1/3 bg-neutral-700 rounded-md mb-2" />
                        <div className="h-4 w-full bg-neutral-700 rounded-md" />
                    </div>
                    <div className="flex flex-col">
                        <div className="h-6 w-1/3 bg-neutral-700 rounded-md mb-2" />
                        <div className="h-4 w-full bg-neutral-700 rounded-md" />
                        <div className="h-4 w-5/6 bg-neutral-700 rounded-md mt-1" />
                        <div className="h-4 w-3/4 bg-neutral-700 rounded-md mt-1" />
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between gap-4">
                <div className="flex flex-col gap-4 w-full">
                    <div className="h-6 w-1/4 bg-neutral-700 rounded-md" />
                    <div className="h-48 w-full bg-neutral-700 rounded-md" />
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <div className="h-6 w-1/4 bg-neutral-700 rounded-md" />
                    <div className="h-48 w-full bg-neutral-700 rounded-md" />
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <div className="h-6 w-1/4 bg-neutral-700 rounded-md" />
                <SkeletonCard limit={7} />
            </div>
        </section>
    );
}
