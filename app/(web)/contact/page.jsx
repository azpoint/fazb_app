import ContactForm from "@/src/components/web/forms/ContactForm";


export default function ContactPage() {
    return (
        <>
            {/* <Script
                src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                strategy="beforeInteractive"
            /> */}

            <ContactForm />
        </>
    );
}
