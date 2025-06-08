//Dependencies
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import appPaths from "@/src/appPaths";
import { deleteSessionCookie } from "@/lib/auth";

export default function SideNav() {

	async function sessionLogout() {
		'use server'
		await deleteSessionCookie()
		redirect('/admin')
	}

    return (
        <div className="bg-sky-900 h-full flex flex-col items-center px-6 w-80 min-w-80">
            <Link
                href="/"
                className="no-underline hover:drop-shadow-lg mx-8 my-6"
            >
                <Image
                    src="/favicon.png"
                    alt="fazb=logo"
                    width={200}
                    height={200}
                    priority={true}
                    className={`w-24 hover:scale-105`}
                />
            </Link>
            <Link
                href={"/"}
                className="text-stone-200 font-hand text-3xl text-center"
            >
                Francisco Zapata Bello
            </Link>
            <div className="text-stone-200 text-2xl font-bold text-center border-b pb-2 my-5">
                Panel Administrador
            </div>

            <div className="flex flex-col gap-y-4 w-full flex-grow">
                <Link href={appPaths.mainPanel()} className="no-underline">
                    <div className="bg-slate-700 w-full rounded-full p-4 flex flew-row justify-center text-2xl text-stone-200 hover:bg-slate-500 hover:shadow-md ">
                        {/* <FaPlus className="text-stone-200 text-3xl place-self-start w-1/5" /> */}
                        <div className="pr-4 text-2xl font-semibold">Obras</div>
                    </div>
                </Link>

                <Link href={appPaths.createSuite()} className="no-underline">
                    <div className="bg-slate-700 w-full rounded-full p-4 flex flew-row justify-center text-2xl text-stone-200 hover:bg-slate-500 hover:shadow-md">
                        {/* <FaPlus className="text-stone-200 text-3xl justify-self-auto w-1/5" /> */}
                        <div className="pr-4 text-2xl font-semibold">
                            Nueva Obra
                        </div>
                    </div>
                </Link>
            </div>

            {/* Logout */}
            <form action={sessionLogout}>
                <button
                    type="submit"
                    className={`bg-teal-700 w-fit mx-auto block mt-14 px-6 py-3 text-slate-200 text-xl font-semibold rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-200`}
                >
                    Cerrar Sesión
                </button>
            </form>

            <Link href="" className="no-underline text-stone-200 my-4 italic">
                Developed by Alejandro Zapata
            </Link>
        </div>
    );
}
