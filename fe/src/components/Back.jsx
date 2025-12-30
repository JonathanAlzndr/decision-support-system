import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

export default function Back() {
	const navigate = useNavigate();
	return (
		<MdArrowBackIos
			size={23}
			onClick={() => navigate(-1)}
			className="self-start cursor-pointer hover:scale-110"
		/>
	);
}
