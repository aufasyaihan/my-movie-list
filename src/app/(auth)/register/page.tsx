import Input from "@/components/UI/input";
import Link from "next/link";

export default function LoginPage() {
    return (
        <section className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-around w-1/3 h-1/2 p-4 bg-white/10 backdrop-blur-md rounded-md shadow-lg inset-shadow-sm inset-shadow-white/15">
                <h1 className="text-3xl text-center w-full font-bold">
                    Let&apos;s Register Yourself
                </h1>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <Input
                            label="First Name"
                            id="first_name"
                            type="text"
                            placeholder="John"
                        />
                        <Input
                            label="Last Name"
                            id="last_name"
                            type="text"
                            placeholder="Doe"
                        />
                    </div>
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="your.name@email.com"
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="*************"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <hr className="w-full" />
                    <button className="p-2 flex-11/12 bg-neutral-600 rounded-md font-bold hover:bg-neutral-700 transition-all ease-in-out duration-200 cursor-pointer">
                        Register
                    </button>
                    <hr className="w-full" />
                </div>
                <div className="flex gap-1 justify-center">
                    <p>Already have an account?</p>
                    <Link
                        className="text-amber-500 underline underline-offset-2 decoration-amber-500"
                        href={"/login"}
                    >
                        Login Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
