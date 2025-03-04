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
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-950 dark:text-white`}
            >
                <header className="m-4 sticky top-5 z-10">
                    <Navbar />
                </header>
                <main>{children}</main>
                <footer></footer>
            </body>
        </html>
    );
}
