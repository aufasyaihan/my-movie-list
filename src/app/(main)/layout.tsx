import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-4 min-h-screen">
            <header className="m-4 sticky top-5 z-10">
                <Navbar />
            </header>
            <main className="px-12 flex-grow">{children}</main>
            <footer className="bg-neutral-950 p-4">
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} My Movie List
                </p>
            </footer>
        </section>
    );
}
