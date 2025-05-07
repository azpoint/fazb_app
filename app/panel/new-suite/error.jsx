"use client";

export default function ErrorBoundary({ error }) {
	return (
		<>
			<div className="flex flex-col items-center mt-40">
				<div className="text-2xl text-sky-950 mt-20">
					Algo salio mal!
				</div>
				<div className="text-2xl text-stone-900 w-1/2 text-center">
					{error.message}
				</div>
				{/* <button onClick={() => (window.location.href = "/panel")}>
					Intentar de nuevo
				</button> */}
			</div>
		</>
	);
}
