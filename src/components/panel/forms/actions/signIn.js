"use server";

import { redirect } from "next/navigation";
import { setSessionCookie } from "@/lib/auth";
import { authenticateUser } from "@/lib/users";

//first arguments is the previous state of the form data
export default async function signIn(_prevState, formData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const user = authenticateUser(email, password);

	if (!user) {
		return { isError: true, message: "Credenciales inválidas" };
	}

	await setSessionCookie(user)
	
	redirect("/admin/panel");
}

