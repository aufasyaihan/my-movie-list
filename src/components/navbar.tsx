"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Search from "./UI/search";
import { getUser } from "@/lib/utils";
import { IoPersonCircle } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { User } from "@/types/user";
import { MdPerson } from "react-icons/md";
import { RxExit, RxHamburgerMenu } from "react-icons/rx";
import HamburgerMenu from "./hamburger";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [hamburger, setHamburger] = useState(false);

    useEffect(() => {
        const data = getUser();
        setUser(data);
    }, []);

    const handleLogout = () => {
        const data = { ...user, isLoggedIn: false };
        localStorage.setItem("user", JSON.stringify(data));
        setIsOpen(false);
        setUser(null);
    };

    return (
        <nav className="flex items-center justify-between py-4 px-8 bg-white/10 backdrop-blur-md rounded-full shadow-lg inset-shadow-sm inset-shadow-white/15">
            <div className="flex items-center space-x-8">
                <Link
                    href={"/"}
                    className="text-lg font-bold select-none"
                    onClick={() => setIsOpen(false)}
                >
                    <span className="text-amber-600">My</span>MovieList
                </Link>
                <Link
                    className="hidden md:block"
                    href={"/movies"}
                    onClick={() => setIsOpen(false)}
                >
                    Movies
                </Link>
                <Link
                    className="hidden md:block"
                    href={"/tv"}
                    onClick={() => setIsOpen(false)}
                >
                    TV Shows
                </Link>
            </div>
            <div className="relative flex md:hidden">
                <button className="cursor-pointer" onClick={() => setHamburger(!hamburger)}>
                    <RxHamburgerMenu className="text-3xl " />
                </button>
                {hamburger && <HamburgerMenu user={user} setIsOpen={setIsOpen} handleLogout={handleLogout} />}
            </div>
            <div className=" relative items-center gap-4 hidden md:flex">
                <Search placeholder="Search Movie..." type="text" />
                {user?.isLoggedIn ? (
                    <button
                        className="flex gap-1 items-center cursor-pointer text-3xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <IoPersonCircle />
                        <RiArrowDropDownLine />
                    </button>
                ) : (
                    <Link
                        className="px-4 py-1 bg-neutral-600 font-bold rounded-md hover:bg-neutral-700 transition-all ease-in-out duration-200"
                        href={"/login"}
                    >
                        Login
                    </Link>
                )}
                {isOpen && (
                    <div className="flex p-2 bg-neutral-800 rounded-md absolute top-10 right-0 flex-col gap-2 w-48">
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
                    </div>
                )}
            </div>
        </nav>
    );
}
