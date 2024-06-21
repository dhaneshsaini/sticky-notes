import { FiPlus } from "react-icons/fi";

export default function AddButton({ onClick }) {
    return (
        <div onClick={onClick} className="absolute bottom-10 right-10 p-3 bg-yellow-500 text-white text-4xl rounded-full cursor-pointer active:bg-yellow-600 drop-shadow-lg" title="Add Notes">
            <FiPlus />
        </div>

    )
}