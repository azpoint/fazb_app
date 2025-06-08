//Dependencies
import { getUserFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

//Components
import SignInForm from "@/src/components/panel/forms/SignInForm";
import Footer from "@/src/components/web/Footer";

export const metadata = {
	title: 'Sign In'
}

export default async function SignInPage() {
	const sessionPayload = await getUserFromSession()

	if(sessionPayload) redirect('/admin/panel')

    return (
        <>
            <div className="flex-1 bg-slate-100 flex justify-center mt-[20vh]">
                <SignInForm />
            </div>
            <Footer />
        </>
    );
}
