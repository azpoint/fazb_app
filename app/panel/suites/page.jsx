
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

//Components
import SuiteCard from "@/src/components/panel/cards/SuiteCard";

export default async function Suites() {
	const suites = await prisma.suite.findMany();

	const firstImages = suites.map((suite) => {
		const image = JSON.parse(suite.images)?.[0]?.filePath;
		const imageDescription = JSON.parse(suite.images)?.[0]?.fileDescription;
		return image ? { image, imageDescription } : null;
	});


	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{suites.map((suite, index) => (
					<SuiteCard
						key={suite.suite_id}
						image={firstImages[index]?.image}
						imageDescription={firstImages[index]?.imageDescription}
						title={suite.title}
					/>
				))}
			</div>
		</div>
	);
}
