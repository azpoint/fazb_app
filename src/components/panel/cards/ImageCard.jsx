import Image from "next/image";

function ImageCard({ image, id, handleImageCard, visibility }) {
	return (
		<div
			className="relative aspect-[2/1.5] hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer hover:brightness-125"
			id={id}
			onClick={handleImageCard}
		>
			<Image src={`/api${image}`} alt="" fill={true} sizes="1x" className="object-cover object-center"/>;
			<div
				className={`absolute top-0 w-full h-full bg-red-500/60 ${visibility}`}
			/>
		</div>
	);
}

export default ImageCard;
