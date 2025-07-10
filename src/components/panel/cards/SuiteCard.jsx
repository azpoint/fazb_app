"use client";

import Image from "next/image";
import Link from "next/link";
import appPaths from "@/src/appPaths";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

//Components
import { FaCircle } from "react-icons/fa";
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
    suite_id,
    slug,
}) {
    const imageCard = image ? `/api${image}` : "/assets/Oraquesta-70s-fazb.jpg";
    const [deleteModal, setDeleteModal] = useState(false);
    const [portalElement, setPortalElement] = useState(null);
    const router = useRouter();

    // useEffect to get the portal root element once the component mounts
    useEffect(() => {
        setPortalElement(document.getElementById("portal-root"));
    }, []);

    const handlePublishedStatus = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/suites/${suite_id}/publish`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ published: published }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            router.refresh();
        } catch (error) {
            console.error("Error al publicar en web", error);
        }
    };

    const handleDeleteSuite = async () => {
        setDeleteModal(false);

        try {
            const response = await fetch(`/api/suites/${suite_id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            router.refresh();
        } catch (error) {
            console.error("Error al eliminar la obra", error);
        }
    };

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

                <div
                    role="button"
                    onClick={handlePublishedStatus}
                    className="cursor-pointer"
                >
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
                </div>

                <div role="button" onClick={() => setDeleteModal(true)}>
                    <div className="relative" title="Eliminar Obra">
                        <MdDelete className="w-8 h-8 text-sky-700 cursor-pointer hover:text-rose-700 hover:scale-125 transition-all duration-300" />
                    </div>
                </div>
            </div>

            <div className="p-2 text-sky-800 hover:text-sky-600">
                <Link href={published ? appPaths.suite(slug, title) : ""}>
                    <h4 className="text-center text-2xl font-bold">{title}</h4>
                </Link>
            </div>

            <div>
                <div>
                    <p className="w-fit py-1 px-4 font-semibold text-sky-700">
                        Compuesta en: <strong>{createdAt}</strong>
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

            {/* Render the modal using a Portal if deleteModal is true AND portalElement is available */}
            {deleteModal &&
                portalElement &&
                createPortal(
                    <div
                        className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
                        onClick={() => setDeleteModal(false)}
                    >
                        <div
                            className="bg-slate-100 p-6 rounded-lg shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold mb-4">
                                Confirmar Eliminación
                            </h3>
                            <p className="mb-6">
                                ¿Estás seguro de que quieres eliminar esta obra?
                                Esta acción no se puede deshacer.
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setDeleteModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDeleteSuite}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>,
                    portalElement // This is the DOM node where the modal will be rendered
                )}
        </div>
    );
}
