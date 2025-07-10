//Styles
import "@/app/globals.css";
import { openSans, dancingScript } from "@/src/styles/fonts";

export const metadata = {
    title: {
        default: "Francisco Zapata Bello",
        template: "%s | Francisco Zapata Bello",
    },
    description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${openSans.variable} ${dancingScript.variable} !scroll-smooth h-full`}
        >
            <body className="flex flex-col min-h-screen bg-slate-100">
                {children}
                {/* This is the div where your portals will render */}
                <div id="portal-root"></div>
            </body>
        </html>
    );
}
