
export default function Loading() {
    return (
        <section className="flex flex-col gap-4 items-center justify-start h-full">
            <div className="flex flex-col gap-4 w-full h-full">
                <h1 className="text-2xl font-bold text-start w-full underline underline-offset-9 decoration-amber-600">
                    Profile
                </h1>
                <div className="flex flex-col w-full bg-neutral-800 rounded-md p-4">
                    <div className="flex flex-col gap-2 animate-pulse">
                        <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <div className="bg-neutral-600 h-6 w-1/4 rounded-md"></div>
                                <div className="bg-neutral-600 h-12 w-full rounded-md"></div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="bg-neutral-600 h-6 w-1/4 rounded-md"></div>
                                <div className="bg-neutral-600 h-12 w-full rounded-md"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="bg-neutral-600 h-6 w-1/8 rounded-md"></div>
                            <div className="bg-neutral-600 h-12 w-full rounded-md"></div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="bg-neutral-600 h-6 w-1/8 rounded-md"></div>
                            <div className="bg-neutral-600 h-12 w-full rounded-md"></div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-neutral-600 h-8 w-16 rounded-md">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
