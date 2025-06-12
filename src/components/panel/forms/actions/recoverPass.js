"use server";
import prisma from "@/lib/prisma";
import { updateUser } from "@/lib/users";
import { redirect } from "next/navigation";

export default async function recoverPass(_prevState, formData) {
    const code = formData.get("confCode");
    const newPassword = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!code || !newPassword || !confirmPassword) {
        return { success: false, error: "Todos los campos son obligatorios" };
    }

    if (newPassword !== confirmPassword) {
        return { success: false, error: "Las contraseñas no coinciden" };
    }

    const checkCode = await prisma.confcode.findUnique({
        where: { code },
    });

    if (!checkCode) {
        return { success: false, error: "Código Inválido" };
    }

    const timePassed = Math.floor(
        (Date.now() - new Date(checkCode.createdAt).getTime()) / 60000
    );

    if (timePassed > 15) {
        const params = new URLSearchParams({
            error: true,
            message: "Codigo Expirado",
        });
        redirect(`/recover?${params.toString()}`);
        return;
    }

    const result = await updateUser(checkCode.email, newPassword);

    if (result?.errors) {
        const params = new URLSearchParams({
            error: true,
            message: "Hubo un error, intentalo de nuevo",
        });
        redirect(`/recover?${params.toString()}`);
        return;
    }

    await prisma.confcode.delete({
        where: { code },
    });

    redirect("/admin");
}
