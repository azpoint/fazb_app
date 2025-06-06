"use client";

//Dependencies
import Image from "next/image";

//Actions
import { useActionState } from "react";
import signInAction from "@/src/components/panel/forms/actions/signIn.js";

export default function SignInForm() {
    const [formState, handleSubmit] = useActionState(signInAction, {
        success: null,
        error: null,
    });

	console.log("formState", formState)


    return (
        <form
			//Call handleSubmit in useActionState Hook
            action={handleSubmit}
            className="bg-sky-900 h-fit p-8 rounded-2xl text-slate-200"
        >
            <div>
                <div className="flex flex-row items-baseline-last">
                    <Image
                        src="/favicon.png"
                        alt="fazb=logo"
                        width={200}
                        height={200}
                        priority={true}
                        className="size-24"
                    />
                    <div className="text-slate-200 text-4xl font-semibold italic ml-4">
                        Francisco Zapata Bello
                    </div>
                </div>

                <div className="text-slate-200 text-2xl font-semibold text-center my-6">
                    Panel Administrador
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="emailField" className="">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="emailField"
                        className="mt-2 px-4 py-2 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:border-b-8 transition-all duration-200"
                        placeholder="tuemail@eldominio.com"
                    />
                </div>

                <div className="">
                    <label htmlFor="passwordField" className="">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="passwordField"
                        className="mt-2 px-4 py-2 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:border-b-8 transition-all duration-200"
                        placeholder="Ingresa tu contraseña aquí"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="bg-teal-700 w-3/5 mx-auto block mt-8 p-4 text-slate-200 text-2xl font-semibold rounded-md hover:bg-teal-600 cursor-pointer"
            >
                Ingresar
            </button>
        </form>
    );
}
