"use client";

import { Backdrop } from "@/types/image";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export default function Carousel({ images }: { images: Backdrop[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const img = images.slice(0, 10);
    const totalImages = img.length;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, [totalImages]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [currentIndex, nextSlide]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalImages - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full md:h-[350px] overflow-hidden">
            <div
                className="flex transition-transform duration-500 ease-in-out md:h-full w-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {img.map((img, index) => (
                    <Image
                        key={index}
                        src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                        alt={`Slide ${index}`}
                        width={img.width}
                        height={img.height}
                        className="w-full h-full flex-shrink-0 object-cover rounded-lg shadow-lg"
                    />
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
            >
                <MdArrowBackIosNew className="text-xs md:text-md" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
            >
                <MdArrowForwardIos className="text-xs md:text-md" />
            </button>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {img.map((_, index) => (
                    <span
                        key={index}
                        className={`w-1 h-1 md:w-3 md:h-3 rounded-full ${
                            index === currentIndex ? "bg-white" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
