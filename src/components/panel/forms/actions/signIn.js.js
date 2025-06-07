"use server";

import { redirect } from "next/navigation";

//first arguments is the previous state of the form data
export default async function signIn(_prevState, formData) {
	const email = formData.get("email");
	const password = formData.get("password");

	console.log("formData", formData)

	const user = authenticate(email, password);

	if (!user) {
		return { success: false, error: "Credenciales inválidas" };
	}

	redirect("/admin/panel");
}

function authenticate(email, password) {
	if (email.endsWith("@gmail.com") && password === "test") {
		return { email };
	}
	return null;
}
