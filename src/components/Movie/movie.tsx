import Image from "next/image";
import Link from "next/link";
import { FaRegPlayCircle } from "react-icons/fa";

interface MovieProps {
    id: number
    image: string;
    title: string;
    releaseDate: string;
}

export default function Movie({ id, image, title, releaseDate }: MovieProps) {
    const year = new Date(releaseDate).getFullYear();
    return (
        <Link href={`/movies/${id}`} className="flex flex-col items-center w-full h-86 gap-1 group cursor-pointer">
            <div className="w-full h-full relative rounded-lg overflow-hidden">
                <Image
                    className="object-cover group-hover:scale-105 transition-all ease-in-out duration-200"
                    src={`https://image.tmdb.org/t/p/w500${image}`}
                    alt={`${title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute flex items-center justify-center inset-0 opacity-0 bg-black/50 backdrop-blur-xs group-hover:opacity-100 transition-all ease-in-out duration-200">
                    <FaRegPlayCircle className="group-hover:scale-[500%] transition-all ease-in-out duration-200" />
                </div>
            </div>
            <div className="flex justify-start font-semibold capitalize gap-1 w-full px-1">
                <p className="overflow-hidden text-ellipsis text-nowrap">
                    {title}
                </p>
                <span>({year})</span>
            </div>
        </Link>
    );
}
