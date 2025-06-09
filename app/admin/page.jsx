//Dependencies
import { getUserFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

//Components
import SignInForm from "@/src/components/panel/forms/SignInForm";
import Footer from "@/src/components/web/Footer";
import SignUpForm from "@/src/components/panel/forms/SignUpForm";

export const metadata = {
    title: "Sign In",
};

export default async function SignInPage() {
    const sessionPayload = await getUserFromSession();

    if (sessionPayload) redirect("/admin/panel");

    const sysAdminUser = await prisma.user.findUnique({
        where: { email: process.env.SYS_ADMIN },
    });

    console.log("___SYS_ADMIN", sysAdminUser);

    return (
        <>
            <div className="flex-1 bg-slate-100 flex justify-center mt-[20vh]">
                {sysAdminUser ? <SignInForm /> : <SignUpForm />}
            </div>
            <Footer />
        </>
    );
}
