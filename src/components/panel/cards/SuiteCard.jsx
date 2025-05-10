import Image from "next/image";


export default function SuiteCard(image, imageDescription) {
  console.log(image)
  return (
    <div>
      Suite Card
      <Image src={image}
      alt={imageDescription}
      />
    </div>
  )
}
