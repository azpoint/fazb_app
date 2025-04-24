//Dependencies
import Link from "next/link";
import Image from "next/image";

//Components
// import { FaPlus } from "react-icons/fa6";

export default function SideNav() {
	return (
		<div className="bg-sky-900 h-full flex flex-col items-center px-4">
			<Link
				href="/panel"
				className="no-underline hover:drop-shadow-lg mx-8 my-6"
			>
				<Image
					src="/favicon.png"
					alt="fazb=logo"
					width={200}
					height={200}
					priority={true}
					className={`w-24`}
				/>
			</Link>
			<div className="text-stone-200 font-hand text-3xl text-center">
				Francisco Zapata Bello
			</div>
			<div className="text-stone-200 text-2xl font-bold text-center border-b pb-2 my-5">
				Panel Administrador
			</div>

			<div className="flex flex-col gap-y-4 w-full">
				<Link href="/panel/suites/new" className="no-underline">
					<div className="bg-slate-700 w-full rounded-full p-4 flex flew-row justify-center text-2xl text-stone-200 hover:bg-slate-500 hover:shadow-md">
						{/* <FaPlus className="text-stone-200 text-3xl justify-self-auto w-1/5" /> */}
						<div className="pr-4 text-2xl font-semibold">Nueva Obra</div>
					</div>
				</Link>

				<Link href="" className="no-underline">
					<div className="bg-slate-700 w-full rounded-full p-4 flex flew-row justify-center text-2xl text-stone-200 hover:bg-slate-500 hover:shadow-md ">
						{/* <FaPlus className="text-stone-200 text-3xl place-self-start w-1/5" /> */}
						<div className="pr-4 text-2xl font-semibold">Obras</div>
					</div>
				</Link>

				<Link href="" className="no-underline">
					<div className="bg-slate-700 w-full rounded-full p-4 flex flew-row justify-center text-2xl text-stone-200 hover:bg-slate-500 hover:shadow-md">
						{/* <FaPlus className="text-stone-200 text-3xl justify-self-auto w-1/5" /> */}
						<div className="pr-4 text-2xl font-semibold">Blog Posts</div>
					</div>
				</Link>
			</div>
		</div>
	);
}