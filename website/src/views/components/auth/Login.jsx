import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../../actions/users";
import useToast from "../../../store/hooks/useToast";
import { useDispatch } from "react-redux";
import { handleFormDataInput } from "../../../utils/helpers";

const Login = () => {
	const { notify } = useToast();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({});
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const handleLoginUser = (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);
		if (rememberMe) {
			localStorage.setItem("loginCredentials", JSON.stringify(formData));
		} else {
			localStorage.removeItem("loginCredentials");
		}
		dispatch(loginUser({ formData: { ...formData, isAdminLogin: false }, notify })).then(() => setIsSubmittingRequest(false));
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
					</div>{" "}
					<div className="col-lg-6 px-xl-5">
						<div className="d-flex flex-column align-items-center justify-content-center bg-white-50 shadow  w-100 py-4 rounded-4 mx-xl-5 px-2">
							<Link to="/">
								<img src="/assets/images/benii-logo.png" className="signup-logo " alt="" />
							</Link>

							<span className="mt-3 text-primary">Login here</span>
							<h2 className="mb-5">Welcome to Benii</h2>
							<form className="row w-100 " onSubmit={handleLoginUser}>
								<div className="col-12">
									<div className="row my-3 ">
										<div className="col-md-12 text-black ">
											<div className="fs-18px mb-2 ">Username or Email Address*</div>
											<input
												type="email"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  "
												placeholder="info@gmail.com"
												name="email"
												value={formData?.email || ""}
												onChange={(e) => handleFormDataInput(e, setFormData)}
											/>
										</div>
									</div>
									<div className="row my-2 pt-2">
										<div className="col-md-12 text-black ">
											<div className="fs-18px mb-2 ">Password*</div>
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
									</div>
									<div className="row my-3 ">
										<div className="col-12 d-flex align-items-center justify-content-between ms-2 flex-wrap">
											<div className="align-items-center d-flex gap-1 fs-20px">
												<div className="form-check">
													<input
														className="form-check-input py-2 px-2"
														type="checkbox"
														checked={rememberMe}
														name="rememberMe"
														id="rememberMe"
														onChange={(e) => setRememberMe(e.target.checked)}
													/>
													<label className="form-check-label" htmlFor="rememberMe">
														Remember me
													</label>
												</div>
											</div>
											<Link to="/forgot-password" className="text-black fs-20px text-decoration-none">
												Forgot Password?
											</Link>
										</div>
									</div>
									<div className="row my-2 mt-5 pt-3">
										<div className="col-12 d-flex align-items-center justify-content-center ">
											<button
												disabled={isSubmittingRequest || !formData?.password || !formData?.email}
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
													"Login"
												)}
											</button>
										</div>
									</div>
								</div>
							</form>
							<div className="col-12 d-flex justify-content-center align-items-center mt-2 mb-5">
								<div className="fs-20px">
									Don&apos;t have an account?{" "}
									<Link to="/auth" className="text-primary  border-bottom border-primary text-decoration-none   ">
										Register
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
