import Image from "next/image";
import Link from "next/link";
import appPaths from "@/src/appPaths";

//Componets
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
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
	slug,
	suite_id,
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
			</div>
			<div className="flex justify-evenly w-full my-5">
				<Link href={appPaths.editSuite(slug)}>
					<div className="relative" title="Editar Obra">
						<MdEditDocument className="w-8 h-8 text-sky-700 cursor-pointer hover:text-sky-500 hover:scale-125 transition-all duration-300" />
					</div>
				</Link>

				<Link href={""}>
					<div
						className="relative hover:scale-125 transition-all duration-300"
						title="Poner/Quitar en linea"
					>
						{published ? (
							<FaCheckCircle className="w-8 h-8 text-emerald-700 ml-auto" />
						) : (
							<FaTimesCircle className="w-8 h-8 text-rose-700 ml-auto" />
						)}
					</div>
				</Link>

				<Link href={appPaths.editSuite(slug)}>
					<div className="relative" title="Eliminar Obra">
						<MdDelete className="w-8 h-8 text-sky-700 cursor-pointer hover:text-rose-700 hover:scale-125 transition-all duration-300" />
					</div>
				</Link>
			</div>

			<div className="pb-2 text-sky-800 hover:text-sky-600">
				<Link href={appPaths.editSuite(slug)}>
					<h4 className="text-center text-2xl font-bold">{title}</h4>
				</Link>
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

				<div className="w-full pb-2 font-semibold flex items-center">
					<span
						className={`mx-auto 
							${published ? "text-green-500" : "text-red-500"}
						`}
					>
						En linea: {published ? "Si" : "No"}
					</span>
				</div>
			</div>
		</div>
	);
}
