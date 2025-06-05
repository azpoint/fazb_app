import Footer from "@/src/components/web/Footer";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
    return (
        <>
            <div className="flex-1 bg-slate-100 flex items-center justify-center">
                <Link
                    href="/"
                    className="text-6xl text-slate-700 font-bold space-y-8 text-center"
                >
                    <p>Nada que ver aquí.</p>
                    <Image
					src={"/404-racoon.jpg"}
                        alt="Not Found"
                        width={800}
						height={800}
                        className="rounded-lg"
                    ></Image>
                    <p>Click para volver</p>
                </Link>
            </div>
            <Footer />
        </>
    );
}
