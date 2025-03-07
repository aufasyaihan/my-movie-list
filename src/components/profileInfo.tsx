"use client";

import { getUser } from "@/lib/utils";
import Input from "./UI/input";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export default function ProfileInfo() {
    const [user, setUser] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [originalUser, setOriginalUser] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const data = getUser();
        if (data) {
            setUser(data);
            setOriginalUser(data);
        }
    }, []);

    const isChanged = JSON.stringify(user) !== JSON.stringify(originalUser);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isChanged) {
            setError("No changes detected!");
            return;
        }
        localStorage.setItem("user", JSON.stringify(user));
        setOriginalUser(user);
        setError(null);
    };

    return (
        <div className="flex flex-col w-full bg-neutral-800 rounded-md p-4">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                {error && (
                    <p className="p-2 bg-red-200 text-red-500 border-l-4 w-full rounded-r-md">
                        {error}
                    </p>
                )}
                <div className="flex flex-wrap sm:flex-nowrap gap-2 lg:gap-4">
                    <Input
                        type="text"
                        label="First Name"
                        id="firstName"
                        value={user?.firstName}
                        onChange={(e) =>
                            setUser(
                                (prev) =>
                                    ({
                                        ...prev,
                                        firstName: e.target.value,
                                    } as User)
                            )
                        }
                    />
                    <Input
                        type="text"
                        label="Last Name"
                        id="lastName"
                        value={user?.lastName}
                        onChange={(e) =>
                            setUser(
                                (prev) =>
                                    ({
                                        ...prev,
                                        lastName: e.target.value,
                                    } as User)
                            )
                        }
                    />
                </div>
                <Input
                    type="email"
                    label="Email"
                    id="email"
                    value={user?.email}
                    onChange={(e) =>
                        setUser(
                            (prev) =>
                                ({
                                    ...prev,
                                    email: e.target.value,
                                } as User)
                        )
                    }
                />
                <Input
                    type="password"
                    label="Password"
                    id="password"
                    value={user?.password}
                    onChange={(e) =>
                        setUser(
                            (prev) =>
                                ({
                                    ...prev,
                                    password: e.target.value,
                                } as User)
                        )
                    }
                />
                <div className="flex justify-end">
                    <button className="bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-md cursor-pointer transition-colors ease-in-out duration-200" disabled={!isChanged}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}
