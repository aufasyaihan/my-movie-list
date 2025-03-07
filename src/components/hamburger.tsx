import Link from "next/link";
import { RxExit } from "react-icons/rx";
import Search from "./UI/search";
import { MdPerson } from "react-icons/md";
import { User } from "@/types/user";

interface HamburgerMenuProps {
    user: User | null;
    setIsOpen: (isOpen: boolean) => void;
    handleLogout: () => void;
}

export default function HamburgerMenu({
    user,
    setIsOpen,
    handleLogout,
}: HamburgerMenuProps) {
    return (
        <div className="flex p-2 bg-neutral-800 rounded-md absolute top-10 right-0 flex-col gap-2 w-72 md:hidden">
            <Search placeholder="Search Movie..." type="text" />
            <Link
                className="p-2 hover:bg-neutral-700 rounded-sm"
                href={"/movies"}
                onClick={() => setIsOpen(false)}
            >
                Movies
            </Link>
            <Link
                className="p-2 hover:bg-neutral-700 rounded-sm"
                href={"/tv"}
                onClick={() => setIsOpen(false)}
            >
                TV Shows
            </Link>
            {user?.isLoggedIn ? (
                <>
                    <Link
                        className="flex gap-2 items-center p-2 hover:bg-neutral-700 rounded-sm"
                        href={"/profile"}
                        onClick={() => setIsOpen(false)}
                    >
                        <span>
                            <MdPerson />
                        </span>{" "}
                        Profile
                    </Link>
                    <button
                        className=" flex gap-2 items-center p-2 hover:bg-neutral-700 rounded-sm cursor-pointer text-start"
                        onClick={handleLogout}
                    >
                        <span>
                            <RxExit />
                        </span>{" "}
                        Logout
                    </button>
                </>
            ) : (
                <Link
                    className="px-4 py-1 bg-neutral-600 font-bold rounded-md hover:bg-neutral-700 transition-all ease-in-out duration-200"
                    href={"/login"}
                >
                    Login
                </Link>
            )}
        </div>
    );
}
