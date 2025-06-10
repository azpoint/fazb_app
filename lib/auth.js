import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const JWT_COOKIE = process.env.JWT_COOKIE
const JWT_DURATION = Number(process.env.JWT_DURATION || 1000 * 60 * 60 * 6)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserFromSession() {
	//Await for cookies()
	const sessionTokkenCookie = (await cookies()).get(JWT_COOKIE)?.value;

	if (!sessionTokkenCookie) return null;

	try {
		const { payload } = await jwtVerify(sessionTokkenCookie, JWT_SECRET);
		return payload;
	} catch (error) {
		console.warn("Invalid JWT:", error);
		return null;
	}
}

export async function setSessionCookie(user) {
	const expirationTime = new Date(Date.now() + JWT_DURATION)

	const sessionToken = await new SignJWT({ user: user.email })
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime(expirationTime)
		.sign(JWT_SECRET);

	//Use parentheses to await for cookies()
	(await cookies()).set(JWT_COOKIE, sessionToken, {
		httpOnly: true,
		sameSite: "lax",
		expires: expirationTime,
	});
}

export async function deleteSessionCookie() {
	//Use parentheses to await for cookies()
	(await cookies()).delete(JWT_COOKIE)
}