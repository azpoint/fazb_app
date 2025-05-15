import Image from "next/image";
import Link from "next/link";
import appPaths from "@/src/appPaths";

//Componets
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function SuiteCard({
	image,
	imageDescription,
	title,
	createdAt,
	revAt,
	publishedAt,
	lastUpdateAt,
	published,
	slug
}) {
	const imageCard = image || "/assets/Oraquesta-70s-fazb.jpg";

	return (
		<div className="bg-slate-200 rounded-xl overflow-hidden shadow-sky-950/50 shadow-xl hover:scale-102 transition-all duration-300">
			<div className="relative aspect-[2/1.5]">
				<Link href={""}>
					<Image
						src={imageCard}
						alt={imageDescription || "Suite Text"}
						fill={true}
						className="object-cover object-center hover:brightness-125"
						// width={200}
						// height={200}
					/>
				</Link>
				<Link href={""}>
					<div
						className="absolute flex justify-start left-2 mt-2 hover:scale-125 transition-all duration-300"
						title="Poner/Quitar en linea"
					>
						{published ? (
							<FaCheckCircle className="w-8 h-8 text-green-500 ml-auto" />
						) : (
							<FaCircle className="w-8 h-8 text-red-500 ml-auto" />
						)}
					</div>
				</Link>
				<Link href={appPaths.editSuite(slug)}>
					<div
						className="absolute flex justify-end right-2 mt-2"
						title="Editar Obra"
					>
						<MdEditDocument className="w-8 h-8 text-slate-200 cursor-pointer hover:text-sky-600" />
					</div>
				</Link>
				<Link href={appPaths.editSuite(slug)}>
					<div
						className="absolute flex justify-end left-2 bottom-0 mb-2"
						title="Eliminar Obra"
					>
						<MdDelete className="w-8 h-8 text-slate-200 cursor-pointer hover:text-red-500" />
					</div>
				</Link>
			</div>

			<div className="p-4 text-sky-800 hover:text-sky-600">
				<h4 className="text-center text-2xl font-bold">{title}</h4>
			</div>

			<div>
				<div>
					<p className="w-fit py-1 px-4 font-semibold text-sky-700">
						Creada en: <strong>{createdAt}</strong>
					</p>
				</div>
				<div>
					<p className="w-fit py-1 px-4 font-semibold text-sky-700">
						Revisada en: <strong>{revAt}</strong>
					</p>
				</div>
				<div>
					<p className="w-fit py-1 px-4 font-semibold text-sky-700">
						En sistema desde: <strong>{publishedAt}</strong>
					</p>
				</div>
				<div>
					<p className="w-fit pt-1 pb-2 px-4 font-semibold text-sky-700">
						Última Actualización: <strong>{lastUpdateAt}</strong>
					</p>
				</div>

				<div className="w-full pt-0 pb-2 px-4 font-semibold flex items-center">
					<span
						className={
							published ? "text-green-500" : "text-red-500"
						}
					>
						En linea: {published ? "Si" : "No"}
					</span>
				</div>
			</div>
		</div>
	);
}
