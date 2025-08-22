import useToast from "../../../store/hooks/useToast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleFormDataInput } from "../../../utils/helpers";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../actions/users";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { notify } = useToast();

	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

	const queryParams = new URLSearchParams(location.search);
	const authToken = queryParams.get("token");
	const currentYear = new Date().getFullYear();

	const [formData, setFormData] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmitResetPasswordForm = async (e) => {
		e.preventDefault();

		setIsSubmittingRequest(true);

		dispatch(resetPassword({ formData: { token: authToken, password: formData?.password }, notify })).then(() => {
			setIsSubmittingRequest(false);
			navigate("/auth");
		});
	};

	return (
		<div className="d-flex flex-column flex-root">
			<div
				className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
				style={{
					backgroundImage: "url(assets/media/illustrations/sketchy-1/14.png",
				}}>
				<div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
					<Link to="/" className="mb-12">
						<img alt="Logo" src="assets/media/logo.png" className="h-125px" />
					</Link>
					<div className="w-lg-800px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
						<form
							className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
							onSubmit={handleSubmitResetPasswordForm}>
							<div className="text-center mb-10">
								<div className="text-gray-400 fw-bold fs-4" />
							</div>
							<div className="row">
								<div className="col-lg-12">
									<div className="fv-row mb-10 fv-plugins-icon-container">
										<label className="form-label fs-6 fw-bolder text-dark">Password</label>
										<input
											type={showPassword ? "text" : "password"}
											className="form-control form-control-lg form-control-solid"
											placeholder="*******"
											name="password"
											required
											value={formData?.password || ""}
											onChange={(e) => handleFormDataInput(e, setFormData)}
										/>
									</div>
								</div>
								<div className="col-lg-12">
									<div className="fv-row mb-10 fv-plugins-icon-container">
										<label className="form-label fs-6 fw-bolder text-dark">Confirm Password</label>
										<input
											type={showConfirmPassword ? "text" : "password"}
											className="form-control form-control-lg form-control-solid"
											placeholder="*******"
											name="confirmPassword"
											required
											value={formData?.confirmPassword || ""}
											onChange={(e) => handleFormDataInput(e, setFormData)}
										/>
									</div>
								</div>
							</div>
							<div className="text-center">
								<button
									type="submit"
									className="btn btn-lg btn-primary w-100 mb-5"
									disabled={isSubmittingRequest || formData?.password !== formData?.confirmPassword}>
									<span className="indicator-label">Reset Password</span>
								</button>
							</div>
							<div />
						</form>
					</div>
				</div>
				<div className="d-flex flex-center flex-column-auto p-10">
					<div className="container-xxl d-flex flex-column flex-md-row align-items-center justify-content-center">
						<div className="text-dark order-2 order-md-1">
							<p style={{ textAlign: "center" }}>
								Copyright <i className="fa fa-copyright" />
								{currentYear}
								<a href="https://single-solution.com/" style={{ textDecoration: "underline", color: "#ED2024" }}>
									Single Solution
								</a>
								. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
