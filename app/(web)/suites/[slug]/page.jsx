import prisma from "@/lib/prisma";
import { marked } from "marked";


export async function generateMetadata({ searchParams }) {
	const params = await searchParams
    return {
        title: params.title,
    };
}

export default async function SuitePage({ params }) {
    const { slug } = await params;

    const suite = await prisma.suite.findUnique({
        where: { slug },
    });
	
        const HTML = marked.parse(suite.notes ? suite.notes : "");

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
            </>
        );
}
