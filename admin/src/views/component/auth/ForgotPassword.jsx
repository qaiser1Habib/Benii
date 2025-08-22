import useToast from "../../../store/hooks/useToast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { sendPasswordResetEmail } from "../../../actions/users";
import { handleFormDataInput } from "../../../utils/helpers";

const ForgotPassword = (props) => {
	const { notify } = useToast();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({});
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

	const handleForgotPassword = (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);

		dispatch(sendPasswordResetEmail({ formData, notify })).then(() => setIsSubmittingRequest(false));
	};

	return (
		<div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
			<form className="form w-100" onSubmit={handleForgotPassword}>
				<div className="text-center mb-10">
					<h1 className="text-dark mb-3">Forgot Password</h1>
					<div className="text-gray-400 fw-bold fs-4" />
				</div>
				<div className="fv-row mb-10">
					<label className="form-label fs-6 fw-bolder text-dark">Email</label>
					<input
						type="email"
						className="form-control form-control-lg form-control-solid"
						placeholder="example@domain.com"
						name="email"
						required
						value={formData?.email || ""}
						onChange={(e) => handleFormDataInput(e, setFormData)}
					/>
				</div>

				<div className="text-center">
					<button type="submit" className="btn btn-lg btn-primary w-100 mb-5" disabled={isSubmittingRequest}>
						<span className="indicator-label">Send Password Reset Email</span>
					</button>

					<div>
						Remember Password?{" "}
						<a className="cursor-pointer" onClick={() => props.setCurrentComponent("login")}>
							Sign in now!
						</a>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ForgotPassword;
