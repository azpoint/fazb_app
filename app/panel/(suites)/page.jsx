import prisma from "@/lib/prisma";

//Components
import SuiteCard from "@/src/components/panel/cards/SuiteCard";
import Image from "next/image";

export default async function Suites() {
	const suites = await prisma.suite.findMany();

	const firstImages = suites.map((suite) => {
		const image = JSON.parse(suite.images)?.[0]?.filePath;
		const imageDescription = JSON.parse(suite.images)?.[0]?.fileDescription;
		return image ? { image, imageDescription } : null;
	});

	// console.log(suites[0])

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="text-[60px] font-bold text-center text-sky-800">
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
						/>
					))
				) : (
					<div className="col-span-full flex justify-center">
						<Image
							src={`/desert_plant.gif`}
							width={800}
							height={600}
							alt="Empty space"
							className=""
						/>
					</div>
				)}
			</div>
		</div>
	);
}
