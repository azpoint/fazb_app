import { FaArrowRotateRight } from "react-icons/fa6";

export default function loading() {
    return (
        <div className="flex justify-center items-center">
            <FaArrowRotateRight className="animate-spin text-4xl text-slate-900"/>
        </div>
    );
}
