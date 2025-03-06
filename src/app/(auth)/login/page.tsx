"use client";

import Input from "@/components/UI/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setError("No user found!");
            return;
        }
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
            user.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(user));
            router.push("/");
        } else {
            setError("Invalid email or password!");
        }
    };

    return (
        <section className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-around w-1/2 xl:w-1/3 h-fit xl:h-1/2 p-4 bg-white/10 backdrop-blur-md rounded-md shadow-lg gap-2">
                <h1 className="text-3xl text-center font-bold">Welcome Back</h1>
                {error && <p className="p-2 bg-red-200 text-red-500 border-l-4 w-full rounded-r-md">{error}</p>}
                <div className="flex flex-col gap-2">
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="your.name@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="*************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <hr className="w-full" />
                    <button className="p-2 flex-11/12 bg-neutral-600 rounded-md font-bold hover:bg-neutral-700 transition-all ease-in-out duration-200 cursor-pointer" onClick={handleLogin}>
                        Login
                    </button>
                    <hr className="w-full" />
                </div>
                <div className="flex gap-1 justify-center">
                    <p>Don&apos;t have an account yet?</p>
                    <Link className="text-amber-500 underline underline-offset-2 decoration-amber-500" href={"/register"}>Register Now</Link>
                </div>
            </div>
        </section>
    );
}
