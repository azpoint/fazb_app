import SideNav from "@/src/components/panel/SideNav.jsx";

export const metadata = {
    title: {
        default: "Francisco Zapata Bello",
        template: "%s | Francisco Zapata Bello",
    },
    description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default function PanelLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideNav />

            <main className="flex-grow overflow-y-auto bg-slate-100">
                {children}
            </main>
        </div>
    );
}
