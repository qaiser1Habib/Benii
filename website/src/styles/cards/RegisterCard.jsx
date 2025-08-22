import { Link } from "react-router-dom";
import TextButtonRound from "../buttons/TextButtonRound.jsx";

const RegisterCard = (props) => {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column bg-white-50 px-3 mx-3 py-3 contact-form-shadow round-10px ">
			<div
				className="bg-primary rounded-circle d-flex align-items-center justify-content-center "
				style={{ width: "80px", height: "80px" }}
			>
				<i className={`fa-solid ${props.icon} fs-2 text-white`}></i>
			</div>
			<h4 className="mt-3">
				Register As <span className="text-primary-dark">{props.title}</span>{" "}
			</h4>
			<p className="text-secondary">{props.desc}</p>
			<div className="d-flex align-items-center justify-content-center gap-4 pb-3 flex-wrap">
				<TextButtonRound
					Btn={Link}
					To={"/register"}
					state={{ registrationType: props?.registrationType }}
					classes="btn btn-primary mt-3 py-2 text-capitalize"
				>
					register Now
				</TextButtonRound>
				<TextButtonRound Btn={Link} To={"/login"} classes="btn btn-primary mt-3 py-2 px-5 text-capitalize">
					Login
				</TextButtonRound>
			</div>
		</div>
	);
};

export default RegisterCard;
