"use server";

import nodemailer from "nodemailer";
import crypto from "crypto";

// Generate a secure 6-digit code
function generateSecureSixDigitCode() {
    const buffer = crypto.randomBytes(4);
    const code = (buffer.readUInt32BE() % 900000) + 100000;
    return code.toString();
}

// Create the transporter
const transporterGmail = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_MAIL_VERIF,
        pass: process.env.ADMIN_MAIL_VERIF_PASSWORD,
    },
});

// Send email function
export async function sendVerificationEmail(recipientEmail) {
    const verificationCode = generateSecureSixDigitCode();

    const mailOptions = {
        from: `Código de Verificación FAZB APP" <${process.env.ADMIN_MAIL_VERIF}>`,
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
        const info = await transporterGmail.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        return { success: true, code: verificationCode };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
