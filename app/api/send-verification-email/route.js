// app/api/send-verification-email/route.js

import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import prisma from "@/lib/prisma";


export async function POST(req) {
	try {
		const body = await req.json();
		const { email } = body;

		const mainUser = await prisma.user.findUnique({
			where: { role: "sysAdmin" },
			select: { email: true },
		});

		if (mainUser?.email === email) {
			const result = await sendVerificationEmail(mainUser.email);
			if (result.success) return NextResponse.json({ success: null }, { status: 200 })

		}
	} catch (err) {
		console.error("Error in send-verification-email route:", err);
		return NextResponse.json({ success: true }, { status: 200 });
	}

	// Always return 200
	return NextResponse.json({ success: true }, { status: 200 });
}
