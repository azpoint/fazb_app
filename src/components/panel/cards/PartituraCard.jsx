import Image from "next/image";

function PartituraCard({
    image,
    id,
    handlePartituraCard,
    visibility,
    description,
}) {
    return (
        <div className="flex flex-col">
            <div
                className="relative aspect-[1/1] hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer hover:brightness-125"
                id={id}
                onClick={handlePartituraCard}
            >
                <Image
                    src={image}
                    alt=""
                    fill={true}
                    // width={500}
                    // height={500}
                    className="object-contain object-center p-2"
                />
                <div
                    className={`absolute top-0 w-full h-full bg-red-500/60 ${visibility}`}
                />
            </div>
            <div className="mt-2 font-semibold h-full w-full text-center">
                {description}
            </div>
        </div>
    );
}

export default PartituraCard;