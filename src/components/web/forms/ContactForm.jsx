"use client";

//Dependencies
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

//Actions
import contactUsAction from "@/src/components/web/forms/actions/contact";
import { getCaptchaToken } from "@/lib/captcha";

export default function ContactForm() {
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState("Enviar");

    useEffect(() => {
        const redirect = () => {
            if (successMessage === "Su mensaje ha sido enviado") {
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
        };

        redirect();
    }, [successMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const token = await getCaptchaToken();

        const res = await contactUsAction(token, formData);

        if (res.success) {
            setSuccessMessage(res.message);
        } else {
            setSuccessMessage(res.message);
        }
    };

    return (
        <>
            <div className="w-full h-24" />

            <div className="max-w-screen-lg mx-auto px-2 md:px-0">
                <h1 className="mt-16 mb-8 text-sky-900 text-4xl text-center md:text-6xl font-bold">
                    Contacto
                </h1>

                {/* <h2 className="text-2xl font-semibold text-sky-900">
                    Escribe tu mensaje aquí:
                </h2> */}

                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label
                            htmlFor="emailField"
                            className="text-xl font-semibold text-sky-900"
                        >
                            Tú email para responderte:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="emailField"
                            className="h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-200 text-gray-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:border-b-8 transition-all duration-200"
                            placeholder="tuemail@eldominio.com"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="subjectField"
                            className="text-xl font-semibold text-sky-900"
                        >
                            Asunto:
                        </label>
                        <input
                            type="text"
                            name="subject"
                            id="subjectField"
                            className="h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-200 text-gray-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:border-b-8 transition-all duration-200"
                            placeholder="Motivo de tu contacto"
                            minLength={5}
                            maxLength={30}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label
                            htmlFor="emailField"
                            className="text-xl font-semibold text-sky-900 "
                        >
                            Escribe tu mensaje aquí:
                        </label>
                        <textarea
                            name="message"
                            className="mt-4 h-[40vh] w-full px-8 py-4 rounded-md bg-slate-200 border-0 outline-none text-sky-950 caret-sky-700 focus:border-teal-500 focus:outline-none focus:border-b-8 transition-all duration-200"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className={`bg-teal-700 w-2/5 mx-auto block mt-14 p-4 text-slate-200 text-2xl font-semibold rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-200`}
                    >
                        {successMessage}
                    </button>
                </form>

                {/* <div>
					<p className="text-2xl text-center text-red-400">{successMessage}</p>
				</div> */}
            </div>
            <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                strategy="beforeInteractive"
            />
        </>
    );
}
