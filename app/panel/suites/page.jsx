import React from "react";
import { PrismaClient } from "@/generated/prisma";
import Image from "next/image";

const prisma = new PrismaClient();

//Components
import SuiteCard from "@/src/components/panel/cards/SuiteCard";

export default async function Suites() {
	const suites = await prisma.suite.findMany();

	const firstImages = suites.map( suite => {
		const image = JSON.parse(suite.images)?.[0]?.filePath
		if(image)
		return image ?? null
	})

	console.log(firstImages)

	return (
		<>
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
