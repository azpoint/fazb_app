import prisma from "@/lib/prisma";
import { marked } from "marked";

//Component
import { EmblaCarousel } from "@/src/components/web/PhotoGallery";
import { redirect } from "next/navigation";
import appPaths from "@/src/appPaths";

export async function generateMetadata({ searchParams }) {
    const params = await searchParams;
    return {
        title: params.title,
    };
}

export default async function SuitePage({ params }) {
    const { slug } = await params;

    const suite = await prisma.suite.findUnique({
        where: { slug },
    });

	//Redirects if no suite or unpublished
    if (!suite || suite.published === false) redirect(appPaths.suites());

    const HTML = marked.parse(suite.notes ? suite.notes : "");

    const images = JSON.parse(suite.images).map((item) => item.filePath);

    return (
        <>
            <div className="w-full h-24" />
            <h1 className="mt-8 text-sky-900 text-4xl text-center md:text-6xl font-bold">
                {suite.title}
            </h1>

            <article
                dangerouslySetInnerHTML={{ __html: HTML }}
                className="prose prose-slate prose-xl mx-auto w-full mt-16 max-w-screen-lg"
            ></article>

            <EmblaCarousel photos={images} />
        </>
    );
}
