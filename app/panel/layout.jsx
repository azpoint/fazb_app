import SideNav from "@/src/components/panel/SideNav.jsx";

export const metadata = {
	title: {
		default: "Francisco Zapata Bello",
		template: '%s | Francisco Zapata Bello'
	},
	description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default function PanelLayout({ children }) {
    return (
        <body className="h-screen flex flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-72">
                <SideNav />
            </div>
            <div className="bg-slate-100 w-full px-12 flex-grow flex flex-col overflow-y-auto">
                {children}
            </div>
        </body>
    );
}
