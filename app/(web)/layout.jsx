import Navbar from "@/src/components/web/Navbar";
import Footer from "@/src/components/web/Footer";

export default function WebLayout({children}) {
	return (
		<body className="flex flex-col min-h-screen bg-slate-200">
			<Navbar />
			<main className="grow container mx-auto pb-3 px-4 md:px-8 max-w-screen-xl">
				{children}
			</main>
			<Footer />
		</body>
	);
}