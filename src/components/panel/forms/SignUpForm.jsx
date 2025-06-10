"use client";

// Dependencies
import Image from "next/image";
import Link from "next/link";
import {
    useActionState,
    useEffect,
    useState,
    useRef,
    useCallback,
	startTransition
} from "react"; 
import { signUpZodSchema } from "@/lib/setup-options/zodSchemas/signUpSchema";
import { debounce } from "@/lib/debounce"; 

// Actions
import signUpAction from "@/src/components/panel/forms/actions/signUp";

export default function SignUpForm() {
    const [buttonColor, setButtonColor] = useState("bg-teal-700");
    const [submitButtonState, setSubmitButtonState] = useState(false);
    const [formValues, setFormValues] = useState({
		email: "",
        name: "",
        surname: "",
        password: "",
        confirmPassword: "",
		role: "mainUser",
    });

    const [errors, setErrors] = useState({}); // Stores client-side validation errors

    const [formState, formStateAction] = useActionState(signUpAction, {
        success: null,
        error: null,
    });

	console.log("__forState", formState)

    // Effect for server action feedback (button color change)
    useEffect(() => {
        if (formState.success === false) {
            setButtonColor("bg-rose-600");
            const timer = setTimeout(() => {
                setButtonColor("bg-teal-700");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [formState]);

    // Validation logic to be debounced
    const validateForm = useCallback((currentFormValues) => {
        const result = signUpZodSchema.safeParse(currentFormValues);
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

    // Create a debounced version of the validation function using useRef
    // This ensures the debounced function instance is stable across renders
    const debouncedValidateForm = useRef(debounce(validateForm, 500)).current; // 500ms delay

    // Handle form value changes
    const handleFormValues = (e) => {
        const { name, value } = e.target;

        // Update formValues state immediately
        setFormValues((prevData) => {
            const newData = { ...prevData, [name]: value };
            // Trigger the debounced validation with the *latest* form values
            debouncedValidateForm(newData);
            return newData;
        });

        // Immediately clear the error for the *specific* field being typed into
        // This gives immediate visual feedback that the user is fixing an error,
        // even before the debounced validation runs.
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Handle form submission (this should perform immediate, non-debounced validation)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default browser form submission

        // Clear previous errors and disable button immediately
        setErrors({});
        setSubmitButtonState(true);

        // Perform IMMEDIATE client-side validation with Zod for submission
        const result = signUpZodSchema.safeParse(formValues);

        if (!result.success) {
            // Validation failed (client-side)
            const newErrors = {};
            result.error.errors.forEach((err) => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors); // Display errors
            setButtonColor("bg-rose-600"); // Indicate error state
            const timer = setTimeout(() => {
                setButtonColor("bg-teal-700");
            }, 3000);
            setSubmitButtonState(false); // Re-enable button
            return () => clearTimeout(timer); // Cleanup timer if component unmounts quickly
        }

        // If client-side validation passes, proceed with the server action
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
        <form
            onSubmit={handleSubmit} // Use onSubmit for custom submission logic
            className="bg-sky-900 h-fit p-8 rounded-2xl text-slate-200 mt-[-10vh]"
        >
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
                    Registro Usuario Principal
                </div>
            </div>

            <div className="space-y-4">
                {/* email */}
                <div>
                    <label htmlFor="emailField">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="emailField"
                        className={`h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:outline-none focus:border-b-8 transition-all duration-200 ${errors.email ? "border-rose-600 focus:border-rose-600" : "focus:border-teal-500 border-transparent"}`}
                        placeholder="tuemail@eldominio.com"
                        value={formValues.email}
                        onChange={handleFormValues}
                    />
                    {errors.email && (
                        <p className="text-rose-600 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Role (hidden field - Note: Not part of Zod schema) */}
                <div>
                    <input
                        type="hidden"
                        name="role"
                        id="roleField"
                        value={"mainUser"}
                    />
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="nameField">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        id="nameField"
                        className={`h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:outline-none focus:border-b-8 transition-all duration-200 ${errors.name ? "border-rose-600 focus:border-rose-600" : "focus:border-teal-500 border-transparent"}`}
                        placeholder="Ingresa tu nombre aquí"
                        value={formValues.name}
                        onChange={handleFormValues}
                    />
                    {errors.name && (
                        <p className="text-rose-600 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Surname */}
                <div>
                    <label htmlFor="surnameField">Apellido:</label>
                    <input
                        type="text"
                        name="surname"
                        id="surnameField"
                        className={`h-[calc(2.5rem+8px)] mt-2 px-4 rounded w-full bg-slate-100 text-gray-800 placeholder:text-slate-400 focus:outline-none focus:border-b-8 transition-all duration-200 ${errors.surname ? "border-rose-600 focus:border-rose-600" : "focus:border-teal-500 border-transparent"}`}
                        placeholder="Ingresa tu apellido aquí"
                        value={formValues.surname}
                        onChange={handleFormValues}
                    />
                    {errors.surname && (
                        <p className="text-rose-600 text-sm mt-1">
                            {errors.surname}
                        </p>
                    )}
                </div>

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
            </div>

            <button
                type="submit"
                disabled={submitButtonState}
                className={`${buttonColor} w-3/5 mx-auto block mt-14 p-4 text-slate-200 text-2xl font-semibold rounded-md ${buttonColor === "bg-rose-600" ? null : "hover:bg-teal-600"} cursor-pointer transition-colors duration-200`}
            >
                Registrarse
            </button>
            <div className="mt-4 h-4">
                {buttonColor === "bg-rose-600" ? (
                    <p className="text-rose-600 text-center">
                        {formState.error}{" "}
                        {/* This error comes from the server action */}
                    </p>
                ) : null}
            </div>
        </form>
    );
}
