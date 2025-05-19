import Image from "next/image";
import { FaTimesCircle } from "react-icons/fa";

function ImageCard({ image }) {
	return (
		<div className="relative aspect-[2/1.5] hover:scale-105 transition-all duration-300 rounded-[30px]">
			<Image src={image} alt="" fill={true} />;
			<div className="absolute top-0 w-full h-full bg-red-500/60" />
		</div>
	);
}

export default ImageCard;
