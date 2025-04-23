import Link from "next/link";

const year = new Date().getFullYear();

export default function Footer() {
	return (
		<>
			<footer className="bg-sky-950 h-20 border-t border-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col justify-center">
				<div className="py-2 space-y-2 flex flex-col items-center justify-center md:flex-row md:items-baseline md:justify-around">
					<Link href="/" className="no-underline text-stone-200">
						&copy; {`${year}`} Francisco Zapata Bello
					</Link>
					<Link href="" className="no-underline text-stone-200">Developed by Alejandro Zapata</Link>
				</div>
			</footer>
		</>
	);
}