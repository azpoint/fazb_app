//Styles
import "@/src/styles/globals.css";
import { openSans, dancingScript } from "@/src/styles/fonts";

export const metadata = {
	title: "Francisco Zapata Bello",
	description: "Fracisco Zapata Augusto Bello, compositor, director y vida",
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${openSans.variable} ${dancingScript.variable} !scroll-smooth`}
		>
			{children}
		</html>
	);
}