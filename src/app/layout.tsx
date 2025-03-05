import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "My Movie List",
    description: "The best movie list on the internet",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-neutral-900 dark:text-white flex flex-col gap-2 min-h-screen`}
            >
                <header className="m-4 sticky top-5 z-10">
                    <Navbar />
                </header>
                <main className="px-4 flex-grow">{children}</main>
                <footer className="mt-8 bg-neutral-950 p-4">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} My Movie List
                    </p>
                </footer>
            </body>
        </html>
    );
}
