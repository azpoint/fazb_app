import { z } from "zod";

export const recoverPassZodSchema = z
	.object({
		password: z
			.string()
			.min(1, "Contraseña es requerida") // Password required
			.min(6, "Contraseña debe tener al menos 6 caracteres")
			.regex(/[A-Z]/, "Contraseña debe contener al menos una mayúscula")
			.regex(/[a-z]/, "Contraseña debe contener al menos una minúscula")
			.regex(/[0-9]/, "Contraseña debe contener al menos un número")
			.regex(/[^a-zA-Z0-9]/, "Contraseña debe contener al menos un caracter especial"),

		confirmPassword: z
			.string()
			.min(1, "Confirmar contraseña es requerida")
			.min(6, "Confirmación de contraseña debe tener al menos 6 caracteres"),

		confCode: z.string().regex(/^\d{6}$/, "Debe tener exactamente 6 dígitos"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Las contraseñas no coinciden",
		path: ["confirmPassword"],
	});
