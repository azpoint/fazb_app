import prisma from "@/lib/prisma";
import { marked } from "marked";

export default async function SuitePage({ params }) {
    const { suite_id } = await params;
    const suite = await prisma.suite.findUnique({
        where: { suite_id: suite_id },
    });

	const suiteDescription = marked.parse(suite.notes)

    return (
        <>
            <div className="w-full h-24" />

            <article dangerouslySetInnerHTML={{__html: suiteDescription}}></article>
        </>
    );
}
