"use server";

import nodemailer from "nodemailer";
import generateSecureSixDigitCode from "@/lib/generateSecureSixDigitCode";
import prisma from "@/lib/prisma";

// Create the transporter
const transporterGmail = nodemailer.createTransport({
    host: "smtp.mailgun.org",
	port: 587,
    auth: {
        user: process.env.ADMIN_MAIL_VERIF,
        pass: process.env.ADMIN_MAIL_VERIF_PASSWORD,
    },
});

// Send email function
export async function sendVerificationEmail(recipientEmail) {
    const verificationCode = generateSecureSixDigitCode();

    const mailOptions = {
        from: `"Código de Verificación FAZB APP" <${process.env.ADMIN_MAIL_VERIF}>`,
        to: recipientEmail,
        subject: "Your Verification Code",
        html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Verification Code</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              text-align: center;
            }
            .container {
              padding: 50px 20px;
            }
            .code-box {
              display: inline-block;
              background-color: #ffffff;
              padding: 40px 60px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .code {
              font-size: 48px;
              font-weight: bold;
              color: #333333;
              letter-spacing: 8px;
            }
          </style>
        </head>
        <body>
		<h2>Código de verificación para cambio de contraseña</h2>
          <div class="container">
            <div class="code-box">
              <div class="code">${verificationCode}</div>
            </div>
          </div>
        </body>
      </html>
    `,
    };

    try {
        const checkCode = await prisma.confcode.findUnique({
            where: { email: recipientEmail },
        });

        if (!checkCode) {
            await prisma.confcode.create({
                data: {
                    code: verificationCode,
                    email: recipientEmail,
                },
            });

            const resp = await transporterGmail.sendMail(mailOptions);

			console.log("__AQUI", resp)

            return { success: true };

        } else {

            const timePassed = Math.floor(
                (Date.now() - new Date(checkCode.createdAt).getTime()) / 60000
            );

            if (timePassed >= 1) {
                await prisma.confcode.update({
                    where: { email: recipientEmail },
                    data: { code: verificationCode, createdAt: new Date() },
                });

                const resp = await transporterGmail.sendMail(mailOptions);

				console.log("__AQUI", resp)

                return { success: true };
            } else {
                return { success: false };
            }
        }
    } catch (error) {
        return { success: false };
    }
}
