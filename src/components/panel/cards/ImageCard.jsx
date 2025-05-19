import Image from "next/image";
import { FaTimesCircle } from "react-icons/fa";

function ImageCard({ image, id }) {
	return (
		<div
			className="relative aspect-[2/1.5] hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer"
			id={id}
		>
			<Image src={image} alt="" fill={true} />;
			<div className={`absolute top-0 w-full h-full bg-red-500/${100}`} />
			<div className="absolute top-0 right-2 text-4xl font-bold text-red-600">
				{id}
			</div>
		</div>
	);
}

export default ImageCard;
