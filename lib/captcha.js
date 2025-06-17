export async function getCaptchaToken() {
    return new Promise((resolve) => {
        grecaptcha.ready(async () => {
            const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

            if (!siteKey) return;

            const token = await grecaptcha.execute(siteKey, {
                action: "contact",
            });
            resolve(token);
        });
    });
}

export async function verifyCaptchaToken(token) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) throw new Error("No se pudo verificar");

    const verifyURL = new URL(
        "https://www.google.com/recaptcha/api/siteverify"
    );

    verifyURL.searchParams.append("secret", secretKey);
    verifyURL.searchParams.append("response", token);

    const res = await fetch(verifyURL, { method: "POST" });

    const captchaData = await res.json();

    if (!res.ok) return null;

    return captchaData;
}
