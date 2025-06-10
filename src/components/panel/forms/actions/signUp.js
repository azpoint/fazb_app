"use server";

import { redirect } from "next/navigation";
import { createUser } from "@/lib/users";

//first arguments is the previous state of the form data
export default async function signUp(_prevState, formData) {
    const result = await createUser(
        formData.get("email"),
        formData.get("password"),
        formData.get("role"),
        formData.get("name"),
        formData.get("surname")
    );

    if (result?.errors) {
        return { success: false, error: result.errors._form[0] }; // Return error to client
    }

    redirect("/admin/panel"); // Only redirect on success
}
