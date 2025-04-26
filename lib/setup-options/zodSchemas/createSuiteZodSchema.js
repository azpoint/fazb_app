import { z } from "zod";

export const createSuiteZodSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Mínimo 3 caracteres" })
		.max(30, { message: "Máximo 30 caracteres" })
		.regex(/^[a-zA-Z0-9\s\-áéíóúÁÉÍÓÚüÜñÑ]+$/u
		, {
			message: "Entre 3 y 30 caracteres con letras, números, espacios ó guión",
		}),
	created: z.coerce
		.date({
			message: "Fecha Inválida, usa el ícono de calendario",
		})
		.min(new Date("1948-09-10"), {
			message: "No puedes poner una fecha de antes de nacer!",
		})
		.max(new Date(), {
			message: "No puedes poner una fecha a la que no hemos llegado!",
		}),
	rev: z.coerce
		.date({
			message: "Fecha Inválida, usa el ícono de calendario",
		})
		.min(new Date("1948-09-10"), {
			message: "No puedes poner una fecha de antes de nacer!",
		})
		.max(new Date(), {
			message: "No puedes poner una fecha a la que no hemos llegado!",
		})
		.optional(),
	_length: z
		.string()
		.regex(/^(\d):([0-5][0-9]):([0-5][0-9])$/, {
			message: "Formato o valores inválidos. Usa el formato H:MM:SS",
		})
		.nullable(),
	edition: z.string().max(30, { message: "Máximo 30 caracteres" }).optional(),
});


/*
	_length: z
		.string()
		.transform((value) => (value === "" ? null : value))
		.nullable()
		.refine(
			(value) =>
				value === null || /^(\d+)-([0-5][0-9])-([0-5][0-9])$/.test(value),
			{
				message: "Formato de longitud inválido. Use el formato H-MM-SS",
			}
		)
		.optional(),
*/