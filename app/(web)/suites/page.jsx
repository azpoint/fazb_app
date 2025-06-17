import prisma from "@/lib/prisma";
import { Suspense } from "react";

//Components
import AnimatedBanner from "@/src/components/web/AnimatedBanner";
import SuiteCardWeb from "@/src/components/web/cards/SuiteCardWeb";
import SuiteCardWebSkeleton from "@/src/components/web/cards/SuiteCardWebSkeleton";
import SuitesFilter from "@/src/components/web/SuitesFilter";

export const metadata = {
    title: "Obras",
    description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default async function SuitesPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const typeFilter = resolvedSearchParams.type;

    // Fetch all distinct types for the filter dropdown
    const distinctTypes = await prisma.suite.findMany({
        distinct: ["type"],
        select: {
            type: true,
        },
        where: { published: true },
    });

    const types = distinctTypes.map((item) => item.type).filter(Boolean);

    const suites = await prisma.suite.findMany({
        where: {
            published: true,
            ...(typeFilter && { type: typeFilter }),
        },
        orderBy: { created: "asc" },
    });

    const firstImages = suites.map((suite) => {
        const image = JSON.parse(suite.images)?.[0]?.filePath;
        const imageDescription = JSON.parse(suite.images)?.[0]?.fileDescription;
        return image ? { image, imageDescription } : null;
    });

    return (
        <>
            <div className="w-full h-24" />
            <AnimatedBanner />
            <h2 className="my-12 text-sky-900 text-4xl text-center md:text-6xl font-bold underline">
                Música
            </h2>
            <div className="container mx-auto my-12">
                <SuitesFilter types={types} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <Suspense
                        fallback={suites.forEach((_item, index) => (
                            <SuiteCardWebSkeleton
                                key={"suiteCardSkeleton" + index}
                            />
                        ))}
                    >
                        {suites.map((suite, index) => (
                            <SuiteCardWeb
                                key={suite.suite_id}
                                image={firstImages[index]?.image}
                                imageDescription={
                                    firstImages[index]?.imageDescription
                                }
                                title={suite.title}
                                createdAt={suite.created?.toLocaleDateString(
                                    "es-ES",
                                    { year: "numeric" }
                                )}
                                revAt={suite.rev?.toLocaleDateString("es-ES", {
                                    year: "numeric",
                                })}
                                slug={suite.slug}
                                type={suite.type
                                    .split("-")
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(" ")}
                            />
                        ))}
                    </Suspense>
                </div>
            </div>
        </>
    );
}
