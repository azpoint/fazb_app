"use server";

import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/auth";

//first arguments is the previous state of the form data
export default async function signUp(_prevState, formData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const user = authenticate(email, password);

	if (!user) {
		return { success: false, error: "Credenciales inválidas" };
	}

	await setSessionCookie(user)
	
	redirect("/admin/panel");
}

function authenticate(email, password) {
	if (email.endsWith("@gmail.com") && password === "test") {
		return { email };
	}
	return null;
}
