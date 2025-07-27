import { z } from "zod";

export const createSuiteZodSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Mínimo 3 caracteres" })
		.max(60, { message: "Máximo 60 caracteres" })
		.regex(/^[a-zA-Z0-9\s\-áéíóúÁÉÍÓÚüÜñÑ()'`´]+$/u
			, {
				message: "Entre 3 y 60 caracteres con letras, números, espacios ó guión",
			}),

	composedInit: z
		.string()
		.regex(/^(19[0-9]{2}|20[0-4][0-9]|2050)$/, {
			message: "Año inválido. Debe estar entre 1900 y 2050",
		}).nullable(),

	composed: z
		.string()
		.regex(/^(19[0-9]{2}|20[0-4][0-9]|2050)$/, {
			message: "Año inválido. Debe estar entre 1900 y 2050",
		}),

	rev: z
		.string()
		.regex(/^(19[0-9]{2}|20[0-4][0-9]|2050)$/, {
			message: "Año inválido. Debe estar entre 1900 y 2050",
		}).nullable(),


	_length: z
		.string()
		.regex(/^(\d):([0-5][0-9]):([0-5][0-9])$/, {
			message: "Formato o valores inválidos. Usa el formato H:MM:SS",
		})
		.nullable(),
	edition: z.string().max(30, { message: "Máximo 30 caracteres" }).optional(),
});
