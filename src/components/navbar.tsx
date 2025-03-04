import Link from "next/link";
import Input from "./UI/input";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between py-4 px-8 bg-white/10 backdrop-blur-md rounded-full shadow-lg inset-shadow-sm inset-shadow-white/15">
            <div className="flex items-center space-x-8">
                <Link href={"/"} className="text-lg font-bold select-none">
                    <span className="text-amber-600">My</span>MovieList
                </Link>
                <Link href={"/"}>Home</Link>
                <Link href={"/movies"}>Movies</Link>
                <Link href={"/tv"}>TV Shows</Link>
            </div>
            <div className="flex items-center gap-6">
                <Input placeholder="Search Movie..." type="text" search />
                <Link className="px-4 py-1 bg-neutral-600 font-bold rounded-md hover:bg-neutral-700 transition-all ease-in-out duration-200" href={"/login"}>Login</Link>
            </div>
        </nav>
    );
}
