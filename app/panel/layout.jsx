import SideNav from "@/src/components/panel/SideNav.jsx";

export default function PanelLayout({ children }) {
	return (
		<body className="h-screen flex flex-col md:flex-row md:overflow-hidden">
			<div className="w-full flex-none md:w-72">
				<SideNav />
			</div>
			<div className="bg-slate-200 w-full py-6 px-8">
				{children}
			</div>
		</body>
	);
}
