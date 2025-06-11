"use client";

//Dependencies
import Image from "next/image";
import Link from "next/link";

//Actions
import { useActionState, useEffect, useState } from "react";
import signInAction from "@/src/components/panel/forms/actions/signIn.js";

export default function SignInForm() {
    const [displayTrigger, setDisplayTrigger] = useState("bg-teal-700");
    const [formState, handleSubmit] = useActionState(signInAction, {
        success: null,
        error: null,
    });

    useEffect(() => {
        if (formState.success === false) {
            setDisplayTrigger("bg-rose-600");
            const timer = setTimeout(() => {
                setDisplayTrigger("bg-teal-700");
            }, 3000);

            // This return statement is not about calling clearTimeout directly
            // It returns a function that React will call during cleanup
            return () => clearTimeout(timer); // cleanup to avoid memory leaks
        }
    }, [formState]);

    return (
        <form
            action={handleSubmit}
            className="bg-sky-900 h-fit p-8 rounded-2xl text-slate-200"
        >
            <div>
                <Link href={"/"} className="flex flex-row items-baseline-last no-underline">
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
                </Link>

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
                        className="h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:border-b-8 transition-all duration-200"
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
                        className="h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:border-b-8 transition-all duration-200"
                        placeholder="Ingresa tu contraseña aquí"
                    />
                </div>

				<Link href={"/recover"} className="text-slate-200 text-xl italic">
				Olvidé la clave...
				</Link>

				<div>
					<label htmlFor="confCodeField">
						
					</label>
				</div>
            </div>
            <button
                type="submit"
                className={`${displayTrigger} w-3/5 mx-auto block mt-14 p-4 text-slate-200 text-2xl font-semibold rounded-md ${displayTrigger === "bg-rose-600" ? null : "hover:bg-teal-600"} cursor-pointer transition-colors duration-200`}
            >
                Ingresar
            </button>
            <div className="mt-4 h-4">
                {displayTrigger === "bg-rose-600" ? (
                    <p className="text-rose-600 text-center">
                        {formState.error}
                    </p>
                ) : null}
            </div>
        </form>
    );
}
