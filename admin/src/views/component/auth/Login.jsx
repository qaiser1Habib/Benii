import useToast from "../../../store/hooks/useToast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser, sendPasswordResetEmail } from "../../../actions/users";
import { handleFormDataInput } from "../../../utils/helpers";

const Login = (props) => {
	const { notify } = useToast();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({});
	const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleForgotPassword = (e) => {
		// e.preventDefault();
		setIsSubmittingRequest(true);

		dispatch(sendPasswordResetEmail({ formData, notify })).then(() => setIsSubmittingRequest(false));
	};

	const handleLoginUser = (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);

		dispatch(loginUser({ formData: { ...formData, isAdminLogin: true }, notify })).then(() => setIsSubmittingRequest(false));
	};

	return (
		<div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
			<form className="form w-100" onSubmit={handleLoginUser}>
				<div className="text-center mb-10">
					<h1 className="text-dark mb-3">Sign In to Dashboard</h1>
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
				<div className="fv-row mb-10">
					<div className="d-flex flex-stack mb-2">
						<label className="form-label fw-bolder text-dark fs-6 mb-0">Password</label>
					</div>
					<div className="w-100 d-flex position-relative align-items-center">
						<input
							type={showPassword ? "text" : "password"}
							className="form-control form-control-lg form-control-solid"
							placeholder="*******"
							name="password"
							required
							value={formData?.password || ""}
							onChange={(e) => handleFormDataInput(e, setFormData)}
						/>
						<span
							className="position-absolute"
							style={{ right: "10px", cursor: "pointer" }}
							onClick={() => setShowPassword(!showPassword)}
						>
							<i className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"} text-dark`}></i>
						</span>
						
					</div>
				</div>
				<div className="text-center">
					<button type="submit" className="btn btn-lg btn-primary w-100 mb-5" disabled={isSubmittingRequest}>
						<span className="indicator-label">Sign In</span>
					</button>
					<div>
						<a className="cursor-pointer" onClick={() => props.setCurrentComponent("forgotPassword")}>
							Forgot Password?
						</a>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
