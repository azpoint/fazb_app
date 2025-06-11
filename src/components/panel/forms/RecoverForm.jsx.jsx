"use client";

//Dependencies
import Image from "next/image";
import Link from "next/link";
import {
    useActionState,
    useEffect,
    useState,
    useRef,
    useCallback,
    startTransition,
} from "react";
import { debounce } from "@/lib/debounce";
import { recoverPassZodSchema } from "@/lib/setup-options/zodSchemas/recoverPassZodSchema";

//Actions
import recoverPassAction from "@/src/components/panel/forms/actions/recoverPass";

export default function RecoverForm() {
    const [sendCodeButtonText, setSendCodeButtonText] =
        useState("Enviar Código");
    const [disabledSendCode, setDisabledSendCode] = useState(false);
    const [buttonColor, setButtonColor] = useState("bg-teal-700");
    const [submitButtonState, setSubmitButtonState] = useState(false);
    const [formValues, setFormValues] = useState({
        password: "",
        confirmPassword: "",
        confCode: "",
    });
    const [formState, formStateAction] = useActionState(recoverPassAction, {
        success: null,
        error: null,
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (formState.success === false) {
            setButtonColor("bg-rose-600");
            const timer = setTimeout(() => {
                setButtonColor("bg-teal-700");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [formState]);

    const validateForm = useCallback((currentFormValues) => {
        const result = recoverPassZodSchema.safeParse(currentFormValues);
        if (!result.success) {
            const newErrors = {};
            result.error.errors.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
        } else {
            setErrors({}); // Clear all errors if validation passes
        }
    }, []);

    const debouncedValidateForm = useRef(debounce(validateForm, 500)).current;

    const handleFormValues = (e) => {
        const { name, value } = e.target;

        // Update formValues state immediately
        setFormValues((prevData) => {
            const newData = { ...prevData, [name]: value };
            // Trigger the debounced validation with the *latest* form values
            debouncedValidateForm(newData);
            return newData;
        });

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleCodeSend = async () => {
        setSendCodeButtonText("Enviando...");
        setDisabledSendCode(true);

        try {
            const res = await fetch("/api/send-verification-email", {
                method: "POST",
            });

            const data = await res.json();

            if (data.success) {
                setSendCodeButtonText("Código Enviado");
            } else {
                console.error(data.message || "No se pudo enviar el código.");
                setSendCodeButtonText("Error al Enviar");
            }
        } catch (err) {
            console.error("Error de red:", err);
            setSendCodeButtonText("Error de Red");
        }

        // Re-enable button after 3 minutes
        setTimeout(() => {
            setSendCodeButtonText("Enviar Código");
            setDisabledSendCode(false);
        }, 20 * 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        const result = recoverPassZodSchema.safeParse(formValues);

        if (!result.success) {
            const newErrors = {};
            result.error.errors.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });

            setErrors(newErrors); // Display errors
            setButtonColor("bg-rose-600");

            const timer = setTimeout(() => {
                setButtonColor("bg-teal-700");
            }, 3000);

            setSubmitButtonState(false); // Re-enable button

            return () => clearTimeout(timer); // Cleanup timer if component unmounts quickly
        }

        const formData = new FormData();
        for (const key in result.data) {
            formData.append(key, result.data[key]);
        }

        // Dispatch the server action
        startTransition(() => {
            formStateAction(formData);
        });
        setSubmitButtonState(false);
    };

    return (
        <div className="bg-sky-900 h-fit p-8 rounded-2xl text-slate-200">
            <form onSubmit={handleSubmit}>
                <div>
                    <Link
                        href={"/"}
                        className="flex flex-row items-baseline-last no-underline"
                    >
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
                        Cambio de constraseña
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Password */}
                    <div>
                        <label htmlFor="passwordField">Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            id="passwordField"
                            className={`h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:outline-none focus:border-b-8 transition-all duration-200 ${errors.password ? "border-rose-600 focus:border-rose-600" : "focus:border-teal-500 border-transparent"}`}
                            placeholder="Ingresa tu contraseña aquí"
                            value={formValues.password}
                            onChange={handleFormValues}
                        />
                        {errors.password && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPasswordField">
                            Confirma Contraseña:
                        </label>
                        <input
                            type="password"
                            name="confirmPassword" // Ensure this matches your Zod schema
                            id="confirmPasswordField"
                            className={`h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:outline-none focus:border-b-8 transition-all duration-200 ${errors.confirmPassword ? "border-rose-600 focus:border-rose-600" : "focus:border-teal-500 border-transparent"}`}
                            placeholder="Confirma tu contraseña aquí"
                            value={formValues.confirmPassword}
                            onChange={handleFormValues}
                        />
                        {errors.confirmPassword && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confCodeField">Código:</label>
                        <input
                            type="text"
                            maxLength="6"
                            pattern="^\d{6}$"
                            inputMode="numeric"
                            name="confCode"
                            id="confCodeField"
                            placeholder="Ingresa exactamente 6 numeros"
                            className={`h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:outline-none focus:border-b-8 transition-all duration-200 ${errors.confCode ? "border-rose-600 focus:border-rose-600" : "focus:border-teal-500 border-transparent no-spinner"}`}
                            value={formValues.confCode}
                            onChange={handleFormValues}
                        />
                        {errors.confCode && (
                            <p className="text-rose-600 text-sm mt-1">
                                {errors.confCode}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitButtonState}
                    className={`${buttonColor} w-3/5 mx-auto block mt-14 p-4 text-slate-200 text-2xl font-semibold rounded-md ${buttonColor === "bg-rose-600" ? null : "hover:bg-teal-600"} cursor-pointer transition-colors duration-200`}
                >
                    Cambiar
                </button>
                <div className="mt-4 h-4">
                    {buttonColor === "bg-rose-600" ? (
                        <p className="text-rose-600 text-center">
                            {formState.error}
                        </p>
                    ) : null}
                </div>
            </form>

            <button
                onClick={handleCodeSend}
                disabled={disabledSendCode}
                className={`w-3/5 mx-auto block mt-14 p-4 text-slate-200 text-2xl font-semibold rounded-md ${disabledSendCode ? "bg-slate-700" : "bg-teal-700 hover:bg-teal-600"} cursor-pointer transition-colors duration-200 `}
            >
                {sendCodeButtonText}
            </button>
        </div>
    );
}
