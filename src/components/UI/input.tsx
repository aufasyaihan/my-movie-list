import { FaSearch } from "react-icons/fa";

interface InputProps {
    placeholder: string;
    type: string;
    search?: boolean;
}

export default function Input({ placeholder, type, search }: InputProps) {
    return (
        <div className="flex items-center">
            <input
                className="dark:bg-white dark:placeholder:text-gray-400 dark:text-black px-2 py-1 rounded-l-md"
                type={type}
                placeholder={placeholder}
            />
            {search && (
                <button className="p-2 bg-white rounded-r-md dark:bg-white/10 hover:dark:bg-white/20 cursor-pointer transition-all ease-in-out duration-200">
                    <FaSearch />
                </button>
            )}
        </div>
    );
}
