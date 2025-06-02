"use client";

// import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

//Styles
import "@/src/styles/components/carousel.css";

export function EmblaCarousel({ photos }) {
    console.log(photos);
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

    return (
        <div
            className="overflow-hidden mx-auto max-w-screen-lg mt-12 "
            ref={emblaRef}
        >
            <div className="flex">
                {photos.map((image, index) => (
                    <div
                        className="flex-[0_0_80%] min-w-0 px-2"
                        key={"carousel" + index}
                    >
                        <div className="relative w-full h-[33vh] overflow-hidden rounded-2xl shadow">
                            <Image
                                src={image}
                                alt={"Suite Image"}
                                fill={true}
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
