import { z } from "zod";

export const signUpZodSchema = z.object({
	email: z.string()
		.min(1, "Email es requerido") // Added: Email cannot be empty
		.email("Email Inválido"),

	role: z.string().default("mainUser"),

	name: z.string()
		.min(1, "Nombre es requerido") // Added: Name cannot be empty
		.min(2, "Nombre debe tener al menos 2 caracteres"),

	surname: z.string()
		.min(1, "Apellido es requerido") // Added: Surname cannot be empty
		.min(2, "Apellido debe tener al menos 2 caracteres"),

	password: z.string()
		.min(1, "Contraseña es requerida") // Added: Password cannot be empty
		.min(6, "Contraseña debe tener al menos 6 caracteres")
		.regex(/[A-Z]/, "Contraseña debe contener al menos una mayúscula")
		.regex(/[a-z]/, "Contraseña debe contener al menos una minúscula")
		.regex(/[0-9]/, "Contraseña debe contener al menos un número")
		.regex(/[^a-zA-Z0-9]/, "Contraseña debe contener al menos un caracter especial"),

	confirmPassword: z.string()
		.min(1, "Confirmar contraseña es requerida")
		.min(6, "Confirmación de contraseña debe tener al menos 6 caracteres"),
})
	// Add a refinement for cross-field validation: passwords must match
	.refine((data) => data.password === data.confirmPassword, {
		message: "Las contraseñas no coinciden",
		path: ["confirmPassword"],
	});