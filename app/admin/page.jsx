import SignInForm from "@/src/components/panel/forms/SignInForm";
import Footer from "@/src/components/web/Footer";

export default function SignInPage() {
    return (
        <>
            <div className="flex-1 bg-slate-100 flex items-center justify-center">
                <SignInForm />
            </div>
            <Footer />
        </>
    );
}
