// app/api/send-verification-email/route.js

import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import prisma from "@/lib/prisma";

export async function POST() {
    try {
        const mainUser = await prisma.user.findUnique({
            where: { role: "sysAdmin" },
            select: { email: true },
        });

        if (!mainUser?.email) {
            return NextResponse.json({ success: false, message: "Email not found" }, { status: 404 });
        }

        const result = await sendVerificationEmail(mainUser.email);
		
        return NextResponse.json(result);
    } catch (err) {
        console.error("Failed to send email:", err);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
