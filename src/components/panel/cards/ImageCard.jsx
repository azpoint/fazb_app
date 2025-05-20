import Image from "next/image";
import { FaTimesCircle } from "react-icons/fa";

function ImageCard({ image, id, handleImageCard, visibility }) {
	return (
		<div
			className="relative aspect-[2/1.5] hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer hover:brightness-125"
			id={id}
			onClick={handleImageCard}
		>
			<Image src={image} alt="" fill={true} sizes="1x"/>;
			<div
				className={`absolute top-0 w-full h-full bg-red-500/60 ${visibility}`}
			/>
			<div className="absolute top-0 right-2 text-4xl font-bold text-red-600">
				{id}
			</div>
		</div>
	);
}

export default ImageCard;
