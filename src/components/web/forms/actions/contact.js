'use server'

import { verifyCaptchaToken } from "@/lib/captcha"


export default async function contactUsAction(token, formData) {

	if(!token){
		return {
			success: false,
			message: "token no found"
		}
	}

	console.log(formData)

	//Verify captcha token
	const captchaData = await verifyCaptchaToken(token)

	if(!captchaData) {
		return {
			success: false,
			message: "El captcha fallo"
		}
	}

	if(!captchaData.success || captchaData.score < 0.5) {
		return {
			success: false,
			message: "El captcha fallo"
		}
	}

	return {
		success: true,
		message: "Message sent successful"
	}

}
