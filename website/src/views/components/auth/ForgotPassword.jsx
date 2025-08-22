import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../../../actions/users";
import useToast from "../../../store/hooks/useToast";
import { useDispatch } from "react-redux";
import { handleFormDataInput } from "../../../utils/helpers";

const ForgotPassword = () => {
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

							<h2 className="mt-3">Forgot Password?</h2>
							<span className="text-primary mb-5">No worries, {"we'll"} send you reset instructions</span>
							<form className="row w-100 " onSubmit={handleForgotPassword}>
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

									<div className="row my-2 mt-4 ">
										<div className="col-12 d-flex align-items-center justify-content-center ">
											<button
												disabled={isSubmittingRequest || !formData?.email}
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
													"Reset Password"
												)}
											</button>
										</div>
									</div>
								</div>
							</form>
							<div className="col-12 d-flex justify-content-center align-items-center mt-2 mb-5">
								<div className="fs-20px">
									Back to&nbsp;
									<Link to="/login" className="text-primary  border-bottom border-primary text-decoration-none   ">
										log In
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

export default ForgotPassword;
