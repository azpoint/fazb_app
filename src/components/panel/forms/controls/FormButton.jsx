"use client";

import { useFormStatus } from "react-dom";
import '@/src/styles/components/spinner-animation.css'

export default function FormButton({ children }) {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className={`text-stone-200 text-2xl font-semibold py-4 mt-4 rounded-full hover:bg-sky-700 active:scale-[98%] shadow-lg w-full ${pending ? "bg-slate-600 hover:bg-slate-600 active:scale-100" : "bg-sky-900"}`}
			disabled={pending}
		>
			{pending ? <span className="loader"></span> : children}
		</button>
	);
}