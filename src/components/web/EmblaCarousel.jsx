"use client";

// import { useEffect } from "react";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

//Styles
// import "@/src/styles/components/carousel.css";
import { GrNext, GrPrevious } from "react-icons/gr";

export function EmblaCarousel({ images }) {
	
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ stopOnInteraction: false, stopOnMouseEnter: true }),
    ]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative mx-auto max-w-screen-lg mt-12">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {images.map((image, index) => (
                        <div
                            className="flex-[0_0_90%] md:flex-[0_0_80%] min-w-0 px-2"
                            key={"carousel" + index}
                        >
                            <div className="relative w-full h-[40vh] overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                                <Image
                                    src={`/api${image}`}
                                    alt={"Suite Image"}
                                    fill={true}
                                    className="object-contain object-center"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Gradient Overlay for the Left Side */}
            <div
                className="group flex items-center justify-center absolute inset-y-0 left-0 w-[6%] md:w-[10%] bg-gradient-to-r from-slate-100 to-transparent z-10 cursor-pointer "
                onClick={scrollPrev}
            >
                <GrPrevious className="size-8 md:size-12 lg:size-16 xl:size-20 text-sky-900 transform transition-transform duration-300 group-hover:scale-120 group-active:scale-80" />
            </div>

            {/* Gradient Overlay for the Right Side */}
            <div
                className="group flex items-center justify-center absolute inset-y-0 right-0 w-[6%] md:w-[10%] bg-gradient-to-l from-slate-100 to-transparent z-10 cursor-pointer "
                onClick={scrollNext}
            >
                <GrNext className="size-8 md:size-12 lg:size-16 xl:size-20 text-sky-900 transform transition-transform duration-300 group-hover:scale-120 group-active:scale-80" />
            </div>
        </div>
    );
}
