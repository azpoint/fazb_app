"use server";

import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";

// Create the transporter
const transporterGmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.ADMIN_MAIL_VERIF,
        pass: process.env.ADMIN_MAIL_VERIF_PASSWORD,
    },
});

// Send email function
export async function sendContactEmail(
    contactEmail,
    contactSubject,
    contactMessage
) {
    const mainUserEmail = await prisma.user.findUnique({
        where: { role: "mainUser" },
        select: { email: true },
    });

    const sysAdminUserEmail = await prisma.user.findUnique({
        where: { role: "sysAdmin" },
        select: { email: true },
    });

    const mailOptions = {
        from: `Contacto desde FAZB WEB <${process.env.ADMIN_MAIL_VERIF}>`,
        to: mainUserEmail.email,
        cc: sysAdminUserEmail.email,
        subject: contactSubject,
        replyTo: contactEmail,
        html: `<p>${contactMessage}</p>`,
    };

    try {
        const result = await transporterGmail.sendMail(mailOptions);

        console.log(result);

        return { success: true };
    } catch (error) {
        console.log(error);

        return { success: false };
    }
}
