//Dependencies
import { getUserFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { authenticateUser, createUser } from "@/lib/users";

//Components
import SignInForm from "@/src/components/panel/forms/SignInForm";
import Footer from "@/src/components/web/Footer";
import SignUpForm from "@/src/components/panel/forms/SignUpForm";
import prisma from "@/lib/prisma";

export const metadata = {
    title: "Sign In",
};

export default async function SignInPage() {
    const sessionPayload = await getUserFromSession();

    if (sessionPayload) redirect("/admin/panel");

    if (!process.env.SYS_ADMIN_EMAIL || !process.env.SYS_ADMIN_PASSWORD) {
        throw new Error(
            "Sys Admin required in env variables for this app to work"
        );
    }

    let sysAdmin = await authenticateUser(
        process.env.SYS_ADMIN_EMAIL,
        process.env.SYS_ADMIN_PASSWORD
    );

    if (!sysAdmin) {
        sysAdmin = await createUser(
            process.env.SYS_ADMIN_EMAIL,
            process.env.SYS_ADMIN_PASSWORD,
            "sysAdmin"
        );
    }

    let mainUser = await prisma.user.findUnique({
        where: {
            role: "mainUser",
        },
        select: {
            email: true,
        },
    });

    return (
        <>
            <div className="flex-1 bg-slate-100 flex justify-center mt-[20vh]">
                {sysAdmin && mainUser ? <SignInForm /> : <SignUpForm />}
            </div>
            <Footer />
        </>
    );
}
