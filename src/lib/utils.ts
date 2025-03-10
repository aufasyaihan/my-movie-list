import { ImageType } from "@/types/image";
import { MovieDetailType } from "@/types/movie";
import { MovieType } from "@/types/movies";
import { TVType } from "@/types/serial";
import { VideoType } from "@/types/video";

export function getYear(date: string) {
    return new Date(date).getFullYear();
}

export function getUser() {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data) : null;
    }
    return null;
}


export async function getData(
    endpoint: string,
    page: number,
    type?: string,
    limit?: number,
    query?: string
) {
    const url = `https://api.themoviedb.org/3${
        type ? "/" + type : ""
    }${endpoint}?query=${query}&page=${page}`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        next: { revalidate: 3600 },
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const data: MovieType = await res.json();
        const movies = limit ? data.results.slice(0, limit) : data.results;
        const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

        return { movies, totalPages: totalPages || 1 };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
export async function getDataDetail<T extends "tv" | "movie">(
    id: string,
    type: T
): Promise<{
    dataDetail: T extends "tv" ? TVType : MovieDetailType;
    video: VideoType;
    images: ImageType;
    similar: MovieType;
}> {
    const url = `https://api.themoviedb.org/3/${type}/${id}`;
    const videoUrl = `https://api.themoviedb.org/3/${type}/${id}/videos`;
    const imageUrl = `https://api.themoviedb.org/3/${type}/${id}/images`;
    const similarUrl = `https://api.themoviedb.org/3/${type}/${id}/similar`;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        next: { revalidate: 3600 },
    };

    try {
        const dataRes = await fetch(url, options);
        if (!dataRes.ok) {
            throw new Error("Failed to fetch movies");
        }
        const dataDetail = (await dataRes.json()) as T extends "tv"
            ? TVType
            : MovieDetailType;

        const videoRes = await fetch(videoUrl, options);
        const video: VideoType = await videoRes.json();

        const imageRes = await fetch(imageUrl, options);
        const images: ImageType = await imageRes.json();

        const similarRes = await fetch(similarUrl, options);
        const similar: MovieType = await similarRes.json();

        return { dataDetail, video, images, similar };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
