import { FaArrowRotateRight } from "react-icons/fa6";

export default function loading() {
    return (
        <div className="flex justify-center items-center">
            <FaArrowRotateRight className="animate-spin text-8xl text-sky-900 mt-[33vh]"/>
        </div>
    );
}
