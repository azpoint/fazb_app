import "@/src/styles/components/animatedBanner.css";
import Image from "next/image";

export default function AnimatedBanner() {
    return (
        <div className="introContainer w-full h-[400px] overflow-hidden rounded-b-lg">
            <div className="introContainer" />
            <Image
                src="/assets/fazb-belezar-garcia-color-banner.jpeg"
                alt=""
                fill={true}
            />
            <Image
                src="/assets/Francisco-Zapata-upscaled.jpg"
                alt=""
                fill={true}
            />
            <Image src="/assets/Oraquesta-70s-fazb-banner.jpg" alt="" fill={true} />
            <Image src="/assets/duo-perez-diaz-banner.jpg" alt="" fill={true} />
            <Image
                src="/assets/paris-entrevoces-banner.jpg"
                alt=""
                fill={true}
            />
            {/* <h2>Become</h2>
    <h2>A Surface</h2>
    <h2>Master</h2> */}

            {/* <h2>No plug-ins <br> needed</h2> */}
        </div>
    );
}
