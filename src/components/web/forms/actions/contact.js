"use server";

import { verifyCaptchaToken } from "@/lib/captcha";
import { sendContactEmail } from "@/lib/sendContactEmail";

export default async function contactUsAction(token, formData) {
	if (!token) {
		return {
			success: false,
			message: "token no found",
		};
	}

	//Verify captcha token
	const captchaData = await verifyCaptchaToken(token);

	if (!captchaData) {
		return {
			success: false,
			message: "El captcha fallo",
		};
	}

	if (!captchaData.success || captchaData.score < 0.6) {
		return {
			success: false,
			message: "El captcha fallo",
		};
	}

	const contactEmail = formData.get("email");
	const contactSubject = formData.get("subject");
	const contactMessage = formData.get("message");

	if (!contactEmail || !contactSubject || !contactMessage) {
		return {
			success: false,
			message: "Faltan campos obligatorios",
		};
	}

	const emailResult = await sendContactEmail(
		contactEmail,
		contactSubject,
		contactMessage
	);

	if (emailResult.success) {
		return {
			success: true,
			message: "Su mensaje ha sido enviado",
		};
	} else {
		return {
			success: false,
			message: "Su mensaje no pudo ser enviado",
		};
	}
}
