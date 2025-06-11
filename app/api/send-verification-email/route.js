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

		if(mainUser.email === email) {
			const result = await sendVerificationEmail(mainUser.email);
			console.log(result)
			
			return NextResponse.json(result);
		}


    } catch (err) {
        console.error("Failed to send email:", err);
        return NextResponse.json(null, { status: 500 });
        // return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
