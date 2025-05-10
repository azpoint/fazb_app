import Image from "next/image";
import Link from "next/link";

export default function SuiteCard({ image, imageDescription, title }) {
	const imageCard = image || "/assets/Oraquesta-70s-fazb.jpg";

	return (
		<Link href={""}>
			<div className="bg-slate-200 rounded-xl overflow-hidden shadow-cyan-950/50 shadow-xl hover:scale-102 transition-all duration-300">
				<div className="relative aspect-[2/1.5]">
					<Image
						src={imageCard}
						alt={imageDescription || "Suite Text"}
						fill={true}
						// width={200}
						// height={200}
						className="object-cover object-center"
					/>
				</div>
				<div className="p-4">
					<h4 className="text-center text-2xl font-bold">{title}</h4>
				</div>
			</div>
		</Link>
	);
}
