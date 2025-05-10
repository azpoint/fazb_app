"use server"

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

//Components
import SuiteCard from "@/src/components/panel/cards/SuiteCard";

export default async function Suites() {
	const suites = await prisma.suite.findMany();

	const firstImages = suites.map( suite => {
		const image = JSON.parse(suite.images)?.[0]?.filePath
		const imageDescription = JSON.parse(suite.images)?.[0]?.fileDescription
		if(image)
			return {image, imageDescription}
		return ""
	})

	console.log(firstImages)

	return (
		<>
		<SuiteCard image={firstImages[1].image} imageDescription={firstImages[1].imageDescription}/>
			{/* <div>Suites</div>
			<Image
				src={images[0].filePath}
				alt={JSON.parse(suites[0].images)[0].fileDescription}
				width={500}
				height={400}
				priority={false}
				className= {"rounded-2xl mx-auto"}
			/> */}
			{/* <SuiteCard image={suites[0].images[0].filepath}/> */}
			{/* {formValues.youtube_l.map((_, index) => (
											<YoutubeLinkField
												key={index}
												_index={index}
												formState={formState}
											/>
										))} */}
		</>
	);
}
