import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToast from "../../../store/hooks/useToast";
import { useDispatch } from "react-redux";
import { handleFormDataInput } from "../../../utils/helpers";
import { resetPassword } from "../../../actions/users";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { notify } = useToast();

	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

	const queryParams = new URLSearchParams(location.search);
	const authToken = queryParams.get("token");

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
		<section className="signup-page position-relative">
			<div className="about-page-blur-bg d-none d-xl-block ">
				<div className="blur-box position-absolute"></div>
			</div>
			<div className="all-blur-bg d-none d-xl-block">
				<div className="blur-box login-box  position-absolute d-none d-xl-block top-0 end-0 "></div>
			</div>
			<div className="container h-100">
				<div className="row h-100  d-flex justify-content-center align-items-center ">
					<div className="col-lg-6 px-xl-5">
						<div className="d-none d-lg-flex flex-column justify-content-center align-items-start px-xl-5">
							<Link to="/">
								<img src="/assets/images/benii-logo.png" className="signup-side-logo" alt="" />
							</Link>
							<div className="w-100  ">
								Empowering mental wellness through personalized care and evidence-based therapies. Take the first step
								towards a brighter future with us.
							</div>
							<h2 className="w-100 z-1 mt-4 lh-sm">
								If you do not have an account <br className="d-none d-xxl-block " /> you can{" "}
								<Link className="text-primary text-decoration-none" to="/auth">
									Register here!
								</Link>
							</h2>
							<div className="d-flex justify-content-end w-75 w-xl-100 signup-bot-img-container ">
								<img src="/assets/images/login-bot.png" alt="" className="signup-bot-img " />
							</div>
						</div>
					</div>
					<div className="col-lg-6 px-xl-5">
						<div className="d-flex flex-column align-items-center justify-content-center bg-white-50 shadow  w-100 py-4 rounded-4 mx-xl-5 px-2">
							<Link to="/">
								<img src="/assets/images/benii-logo.png" className="signup-logo " alt="" />
							</Link>

							<h2 className="mt-3">Set Your Password</h2>
							<span className="text-primary mb-5">Please create a secure password for your account.</span>
							<form className="row w-100 " onSubmit={handleSubmitResetPasswordForm}>
								<div className="col-12">
									<div className="row my-2 pt-2">
										<div className="col-md-12 text-dark  my-md-1 my-2">
											<div className="mb-2">Password*</div>
											<div className="w-100 d-flex position-relative align-items-center">
												<input
													type={showPassword ? "text" : "password"}
													className="w-100 rounded-3 border  border-2  border-grey py-2 px-2  "
													placeholder="*************"
													name="password"
													value={formData?.password || ""}
													onChange={(e) => handleFormDataInput(e, setFormData)}
												/>
												<span
													className="position-absolute"
													style={{ right: "10px", cursor: "pointer" }}
													onClick={() => setShowPassword(!showPassword)}
												>
													<i className={`fa-regular ${showPassword ? "fa-eye" : "fa-eye-slash"} text-secondary`}></i>
												</span>
											</div>
										</div>
										<div className="col-md-12 text-dark my-md-1 my-2">
											<div className="mb-2">Confirm Password*</div>
											<div className="w-100 d-flex position-relative align-items-center">
												<input
													type={showConfirmPassword ? "text" : "password"}
													className="w-100 rounded-3 border  border-2  border-grey py-2 px-2  "
													placeholder="*************"
													name="confirmPassword"
													value={formData?.confirmPassword || ""}
													onChange={(e) => handleFormDataInput(e, setFormData)}
												/>
												<span
													className="position-absolute"
													style={{ right: "10px", cursor: "pointer" }}
													onClick={() => setShowConfirmPassword(!showConfirmPassword)}
												>
													<i
														className={`fa-regular ${
															showConfirmPassword ? "fa-eye" : "fa-eye-slash"
														} text-secondary`}
													></i>
												</span>
											</div>
											<div className="w-100">
												{formData?.password &&
													formData?.confirmPassword &&
													formData?.password !== formData?.confirmPassword && (
														<p className="text-danger text-sm capitalize">Password {"didn't"} match</p>
													)}
											</div>
										</div>
									</div>

									<div className="row my-2 my-4 ">
										<div className="col-12 d-flex align-items-center justify-content-center ">
											<button
												disabled={isSubmittingRequest || !formData?.password || !formData?.confirmPassword}
												type="submit"
												className="btn btn-primary px-5  rounded-3 py-2"
											>
												{isSubmittingRequest ? (
													<>
														<span
															className="spinner-border spinner-border-sm me-2"
															role="status"
															aria-hidden="true"
														></span>
														Please Wait...
													</>
												) : (
													"Set Password"
												)}
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ResetPassword;
