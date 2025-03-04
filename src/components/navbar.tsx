import Link from "next/link";
import Input from "./UI/input";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between py-4 px-8 bg-white/10 backdrop-blur-lg rounded-full shadow-sm inset-shadow-sm inset-shadow-white/15">
            <div className="flex items-center space-x-8">
                <Link href={"/"} className="text-lg font-bold select-none">
                    MyMovieList
                </Link>
                <Link href={"/"}>Home</Link>
                <Link href={"/movies"}>Movies</Link>
                <Link href={"/tv"}>TV Shows</Link>
            </div>
            <Input placeholder="Search Movie..." type="text" search />
        </nav>
    );
}
