import prisma from "@/lib/prisma";
import { marked } from "marked";

export default async function SuitePage({ params }) {
    const { slug } = await params;

    console.log(slug);
    const suite = await prisma.suite.findUnique({
        where: { slug },
    });

    const HTML =  marked.parse((suite.notes ? suite.notes : ""))

    return (
        <>
            <div className="w-full h-24" />

            <article dangerouslySetInnerHTML={{__html: HTML}} className="prose prose-slate"></article>
        </>
    );
}
