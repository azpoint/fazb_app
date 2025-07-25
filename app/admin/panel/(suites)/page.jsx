//Dependencies
import { redirect } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

//Components
import prisma from "@/lib/prisma";
import SuiteCard from "@/src/components/panel/cards/SuiteCard";
import SuitesFilter from "@/src/components/web/SuitesFilter";
import SuiteCardWebSkeleton from "@/src/components/web/cards/SuiteCardWebSkeleton";

//lib
import { getUserFromSession } from "@/lib/auth";

export const metadata = {
    title: "Panel",
    description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default async function Suites({ searchParams }) {
    const sessionPayload = await getUserFromSession();

    if (!sessionPayload) redirect("/admin");

    const resolvedSearchParams = await searchParams;
    const typeFilter = resolvedSearchParams.type;

    const distinctTypes = await prisma.suite.findMany({
        distinct: ["type"],
        select: {
            type: true,
        },
    });

    const types = distinctTypes.map((item) => item.type).filter(Boolean);

    const suites = await prisma.suite.findMany({
        where: {
            ...(typeFilter && { type: typeFilter }),
        },
        orderBy: { composed: "desc" },
    });

    const firstImages = suites.map((suite) => {
        const image = JSON.parse(suite.images)?.[0]?.filePath;
        const imageDescription = JSON.parse(suite.images)?.[0]?.fileDescription;
        return image ? { image, imageDescription } : null;
    });

    return (
        <div className="container mx-auto my-12 px-12">
            <div className="text-6xl font-bold text-center text-sky-800 my-12">
                Música
            </div>
			<SuitesFilter types={types} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <Suspense
                    fallback={suites.forEach((_item, index) => (
                        <SuiteCardWebSkeleton
                            key={"suiteCardSkeleton" + index}
                        />
                    ))}
                >
                    {suites.length !== 0 ? (
                        suites.map((suite, index) => (
                            <SuiteCard
                                key={suite.suite_id}
                                image={firstImages[index]?.image}
                                imageDescription={
                                    firstImages[index]?.imageDescription
                                }
                                title={suite.title}
								composedInit={suite.composedInit}
                                composed={suite.composed}
                                revAt={suite.rev}
                                publishedAt={suite.createdAt?.toLocaleDateString()}
                                lastUpdateAt={suite.updatedAt?.toLocaleDateString()}
                                published={suite.published}
                                suite_id={suite.suite_id}
                                slug={suite.slug}
								arrangement={suite.arrangement}
                            />
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center">
                            <Image
                                src={`/desert_plant.gif`}
                                width={800}
                                height={600}
                                alt="Empty Space"
                                unoptimized
                            />
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
}
