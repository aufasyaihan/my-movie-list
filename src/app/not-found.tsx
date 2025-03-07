import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex flex-col items-center justify-center h-[100dvh]">
            <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold">Not Found</h2>
                <p className="italic">Could not find requested resource</p>
                <Link href="/" className="mt-4 hover:bg-amber-700 bg-amber-600 px-4 py-2 text-white rounded-md transition-colors ease-in-out duration-200">
                    Return Home
                </Link>
            </div>
        </section>
    );
}
