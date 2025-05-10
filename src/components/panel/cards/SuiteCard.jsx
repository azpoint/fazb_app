import Image from "next/image";

export default function SuiteCard({ image, imageDescription, title }) {
  const imageCard = image || '/assets/Oraquesta-70s-fazb.jpg';

  return (
    <div className="w-full max-w-sm bg-red-700 rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-[2/1]">
        <Image
          src={imageCard}
          alt={imageDescription || 'Suite Text'}
          fill
          className="object-cover"
          
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      </div>
    </div>
  );
}
