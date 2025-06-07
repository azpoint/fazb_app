import prisma from "@/lib/prisma";

//Components
import SuiteCard from "@/src/components/panel/cards/SuiteCard";
import Image from "next/image";

//lib
import { getUserFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Panel",
    description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default async function Suites() {
    const sessionPayload = await getUserFromSession();
    console.log("__SESSION", sessionPayload);

	if(!sessionPayload) redirect('/admin')

    const suites = await prisma.suite.findMany({
        orderBy: { created: "asc" },
    });

    const firstImages = suites.map((suite) => {
        const image = JSON.parse(suite.images)?.[0]?.filePath;
        const imageDescription = JSON.parse(suite.images)?.[0]?.fileDescription;
        return image ? { image, imageDescription } : null;
    });

    return (
        <div className="container mx-auto my-12 px-4">
            <div className="text-6xl font-bold text-center text-sky-800">
                Obras/Suites
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {suites.length !== 0 ? (
                    suites.map((suite, index) => (
                        <SuiteCard
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
                            slug={suite.slug}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex justify-center">
                        <Image
                            src={`/desert_plant.gif`}
                            width={800}
                            height={600}
                            alt="Empty Space"
                            className=""
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
