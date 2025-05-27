import prisma from "@/lib/prisma";

//Components
import AnimatedBanner from "@/src/components/web/AnimatedBanner";
import SuiteCardWeb from "@/src/components/panel/cards/SuiteCardWeb";

export default async function SuitesPage() {
    const suites = await prisma.suite.findMany({
		where: { published: true},
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
            <h2 className="mt-8">Obras</h2>
            <div className="container mx-auto mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {suites
                        .map((suite, index) => (
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
                                publishedAt={suite.createdAt?.toLocaleDateString()}
                                lastUpdateAt={suite.updatedAt?.toLocaleDateString()}
                                published={suite.published}
                                suite_id={suite.suite_id}
								type={suite.type}
                            />
                        ))}
                </div>
            </div>
        </>
    );
}
