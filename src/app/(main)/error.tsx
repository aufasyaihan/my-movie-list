"use client"; // Error boundaries must be Client Components

export default function Error({ error }: { error: { message: string } }) {
    return (
        <section className="w-full h-full flex justify-center items-center flex-1">
            <div className="flex flex-col gap-4 justify-center items center h-1/2 w-full text-center">
                <h2 className="text-2xl text-amber-600 font-bold">Something went wrong!</h2>
                <p className="italic capitalize">{error.message}</p>
            </div>
        </section>
    );
}
