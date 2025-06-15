"use client";

//Dependencies
import { useActionState, useState } from "react";

//Actions
import contactAction from "@/src/components/web/forms/actions/contact";

export default function ContactForm() {
		const [displayTrigger, setDisplayTrigger] = useState("");	
    const [contactFormState, handleSubmit] = useActionState(contactAction, {
        success: null,
        error: null,
    });

    return (
        <>
            <div className="w-full h-24" />
            <div className="bg-red-400 max-w-screen-lg mx-auto">
                <h1 className="mt-16 mb-8 text-sky-900 text-4xl text-center md:text-6xl font-bold">
                    Contacto
                </h1>

                <h2 className="text-2xl font-semibold">
                    Escribe tu mensaje aquí:
                </h2>

                <form action={handleSubmit}>
                    <textarea
                        name="message"
                        className="mt-4 h-[40vh] w-full px-8 py-4 rounded-md bg-slate-200 border-0 outline-none"
                    ></textarea>
					<button
                type="submit"
                className={`bg-teal-700 w-2/5 mx-auto block mt-14 p-4 text-slate-200 text-2xl font-semibold rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-200`}
            >
                Enviar
            </button>
                </form>
            </div>
        </>
    );
}

