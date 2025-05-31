import Image from "next/image";
import Link from "next/link";

//Paths
import appPaths from "@/src/appPaths";

export default function SuiteCardWeb({
    image,
    imageDescription,
    title,
    createdAt,
    revAt,
	type,
	suite_id
}) {
    const imageCard = image || "/assets/Oraquesta-70s-fazb.jpg";

    return (
        <div className="bg-slate-200 rounded-xl overflow-hidden shadow-sky-950/50 shadow-xl hover:scale-102 transition-all duration-300">
            <div className="relative aspect-[2/1.5]">
                <Link href={appPaths.suite(suite_id)}>
                    <Image
                        src={imageCard}
                        alt={imageDescription || "Suite Text"}
                        fill={true}
                        className="object-cover object-center hover:brightness-125"
                    />
                </Link>
            </div>

            <div className="p-2 text-sky-800 hover:text-sky-600">
                <Link href={appPaths.suite(suite_id)}>
                    <h4 className="text-center text-2xl font-bold">{title}</h4>
                </Link>
            </div>

            <div>
				<div>
                    <p className="w-fit py-1 px-4 font-semibold text-sky-700">
                        Tipo: <strong>{type}</strong>
                    </p>
                </div>
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
            </div>
        </div>
    );
}
