import Image from "next/image";
import Link from "next/link";
import appPaths from "@/src/appPaths";
import { revalidatePath } from "next/cache";
import { rm } from "fs/promises";
import path from "path";

//Componets
import { FaCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import prisma from "@/lib/prisma";

export default function SuiteCard({
    image,
    imageDescription,
    title,
    createdAt,
    revAt,
    publishedAt,
    lastUpdateAt,
    published,
    suite_id,
    slug,
}) {
    const imageCard = image || "/assets/Oraquesta-70s-fazb.jpg";

    async function handlePublishedStatus() {
        "use server";

        try {
            await prisma.suite.update({
                where: { suite_id },
                data: { published: !published },
            });
        } catch (error) {
            throw new Error("Hubo un problema poniendo la obra en linea");
        }

        revalidatePath("/admin/panel");
        revalidatePath("/suites");
        revalidatePath(appPaths.suite(slug, title));
    }

    async function handleDeleteSuite() {
        "use server";

        const suiteFilePath = path.join("public", "suites", suite_id);

        try {
            rm(suiteFilePath, { recursive: true, force: true });

            await prisma.suite.delete({
                where: { suite_id },
            });
        } catch (error) {
            throw new Error("Hubo un problema eliminando la obra");
        }
        revalidatePath("/admin/panel");
        revalidatePath("/suites");
        revalidatePath(appPaths.suite(slug, title));
    }

    return (
        <div className="bg-slate-200 rounded-xl overflow-hidden shadow-sky-950/50 shadow-xl hover:scale-102 transition-all duration-300">
            <div className="relative aspect-[2/1.5]">
                <Link href={published ? appPaths.suite(slug, title) : ""}>
                    <Image
                        src={imageCard}
                        alt={imageDescription || "Suite Text"}
                        fill={true}
                        className="object-cover object-center hover:brightness-125"
                    />
                </Link>
            </div>
            <div className="flex justify-evenly w-full my-5">
                <Link href={appPaths.editSuite(suite_id)}>
                    <div className="relative" title="Editar Obra">
                        <MdEditDocument className="w-8 h-8 text-sky-700 cursor-pointer hover:text-sky-500 hover:scale-125 transition-all duration-300" />
                    </div>
                </Link>

                <Link href={""} onClick={handlePublishedStatus}>
                    <div
                        className="relative hover:scale-125 transition-all duration-300"
                        title="Poner/Quitar en linea"
                    >
                        {published ? (
                            <FaCircle className="w-8 h-8 text-emerald-700 ml-auto" />
                        ) : (
                            <FaCircle className="w-8 h-8 text-rose-700 ml-auto" />
                        )}
                    </div>
                </Link>

                <Link href={""} onClick={handleDeleteSuite}>
                    <div className="relative" title="Eliminar Obra">
                        <MdDelete className="w-8 h-8 text-sky-700 cursor-pointer hover:text-rose-700 hover:scale-125 transition-all duration-300" />
                    </div>
                </Link>
            </div>

            <div className="p-2 text-sky-800 hover:text-sky-600">
                <Link href={published ? appPaths.suite(slug, title) : ""}>
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
							${published ? "text-green-500" : "text-rose-700"}
						`}
                    >
                        En linea: {published ? "Si" : "No"}
                    </span>
                </div>
            </div>
        </div>
    );
}
