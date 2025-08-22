import { Link, useLocation, useSearchParams } from "react-router-dom";
import useToast from "../../../store/hooks/useToast";
import { useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { loginUser, registerUser } from "../../../actions/users";
import { handleFormDataInput } from "../../../utils/helpers";
import TermsModal from "../../../styles/modals/TermsModal";
import PrivacyModal from "../../../styles/modals/PrivacyModal";

const Register = () => {
	const { notify } = useToast();
	const dispatch = useDispatch();
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [registrationFormType, setRegistrationFormType] = useState("user");
	const [isAgree, setIsAgree] = useState(false);
	const [showTermsModal, setShowTermsModal] = useState(false);
	const [showPrivacyModal, setShowPrivacyModal] = useState(false);
	const [formData, setFormData] = useState({});

	const location = useLocation();
	const { registrationType } = location.state || "user";

	const [searchParams] = useSearchParams();

	const invitedClient = useMemo(
		() => ({
			email: searchParams.get("email"),
			therapistID: searchParams.get("invitedBy"),
			about: {
				firstName: searchParams.get("firstName"),
				lastName: searchParams.get("lastName"),
			},
		}),
		[searchParams]
	);

	useEffect(() => {
		if (invitedClient?.email && invitedClient?.therapistID) {
			setFormData(invitedClient);
		}
	}, [invitedClient]);

	useEffect(() => {
		if (registrationType) setRegistrationFormType(registrationType);
	}, [registrationType]);

	const handleRegisterUser = (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			notify("error", "Passwords do not match");
			return;
		}
		setIsSubmittingRequest(true);

		dispatch(registerUser({ formData: { ...formData, userRole: registrationFormType }, notify })).then(({ payload }) => {
			if (payload?._id) dispatch(loginUser({ formData: formData, notify })).then(() => setIsSubmittingRequest(false));
			setIsSubmittingRequest(false);
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
			<div className="container h-100 ">
				<div className="row h-100   justify-content-center align-items-center ">
					<div className="col-lg-8 col-xl-6 px-xl-5">
						<div className="d-none d-xl-flex flex-column justify-content-center align-items-start px-xl-5">
							<Link to="/">
								<img src="/assets/images/benii-logo.png" className="signup-side-logo" alt="" />
							</Link>
							<p className="w-100">
								Empowering mental wellness through personalized care and evidence-based therapies. Take the first step
								towards a brighter future with us.
							</p>
							<h2 className="w-100 z-1 lh-sm">
								If you already have a account <br className="d-none d-xxl-block " /> you can{" "}
								<Link className="text-primary text-decoration-none" to="/login">
									Login here!
								</Link>
							</h2>
							<div className="d-flex justify-content-end w-100 signup-bot-img-container ">
								<img src="/assets/images/login-bot.png" alt="" className="signup-bot-img " />
							</div>
						</div>
					</div>
					<div className="col-xl-6 ">
						<div className="d-flex flex-column align-items-center justify-content-center bg-white-50 shadow  w-100 py-4 rounded-4 mx-xl-5 px-2">
							<Link to="/">
								<img src="/assets/images/benii-logo.png" className="signup-logo " alt="" />
							</Link>
							<span className="mt-3 text-primary">Register here</span>
							<h2 className="mb-5">Register to Benii</h2>
							<form className="row w-100 " onSubmit={handleRegisterUser}>
								<div className="col-12">
									<div className="row my-2 ">
										<div className="col-md-6 text-dark my-md-1 my-2">
											<div className=" mb-2 ">First Name*</div>
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-2  "
												placeholder="Enter you first name"
												name="about.firstName"
												value={formData?.about?.firstName || ""}
												onChange={(e) => handleFormDataInput(e, setFormData)}
											/>
										</div>
										<div className="col-md-6 text-dark my-md-1 my-2">
											<div className="mb-2">Last Name*</div>
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-2 "
												placeholder="Enter you last name"
												name="about.lastName"
												value={formData?.about?.lastName || ""}
												onChange={(e) => handleFormDataInput(e, setFormData)}
											/>
										</div>
									</div>
									<div className="row my-2 ">
										<div className="col-md-6 text-dark  my-md-1 my-2">
											<div className="mb-2">Email*</div>
											<input
												type="email"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-2  "
												placeholder="info@gmail.com"
												name="email"
												value={formData?.email || ""}
												onChange={(e) => handleFormDataInput(e, setFormData)}
											/>
										</div>
										<div className="col-md-6 text-dark my-md-1 my-2">
											<div className="mb-2">Phone*</div>
											<input
												type="tel"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-2 "
												placeholder="123456789"
												name="about.phone"
												value={formData?.about?.phone || ""}
												onChange={(e) => handleFormDataInput(e, setFormData)}
											/>
										</div>
									</div>
									<div className="row my-2 pt-2">
										<div className="col-md-6 text-dark  my-md-1 my-2">
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
										<div className="col-md-6 text-dark my-md-1 my-2">
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
											<div>
												{formData?.password &&
													formData?.confirmPassword &&
													formData?.password !== formData?.confirmPassword && (
														<p className="text-danger text-sm capitalize">Password {"didn't"} match</p>
													)}
											</div>
										</div>
									</div>
									<div className="row my-3 ">
										<div className="col-12 d-flex align-items-start align-items-sm-center ms-2">
											<div className="form-check my-4">
												<input
													className="form-check-input border border-secondary py-2 px-2"
													type="checkbox"
													defaultValue=""
													id="flexCheckChecked"
													onChange={(e) => setIsAgree(e.target.checked)}
													checked={isAgree}
												/>
												<label className="form-check-label" htmlFor="flexCheckChecked">
													I agree with{" "}
													<span
														onClick={() => setShowTermsModal(true)}
														className="text-primary  border-bottom border-primary mt-1 cursor-pointer"
													>
														Terms & Conditions
													</span>
													{" and "}
													<span
														onClick={() => setShowPrivacyModal(true)}
														className="text-primary  border-bottom border-primary mt-1 cursor-pointer"
													>
														Privacy Policy
													</span>
												</label>
											</div>
										</div>
									</div>
									<div className="row mt-3 mb-4 ">
										<div className="col-12 d-flex align-items-center justify-content-center ">
											<button
												type="submit"
												disabled={
													isSubmittingRequest ||
													!formData?.password ||
													!formData?.confirmPassword ||
													!formData?.email ||
													!formData?.about?.lastName ||
													!formData?.about?.firstName ||
													!isAgree
												}
												className="btn btn-primary px-5 rounded-3"
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
													"Register"
												)}
											</button>
										</div>
									</div>
								</div>
							</form>
							<div className="col-12 d-flex justify-content-center align-items-center mt-2 mb-5">
								<div className="fs-20px">
									Already have an Account?{" "}
									<Link to="/login" className="text-primary  border-bottom border-primary text-decoration-none   ">
										Log In
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<TermsModal showModal={showTermsModal} setShowModal={setShowTermsModal} />
			<PrivacyModal showModal={showPrivacyModal} setShowModal={setShowPrivacyModal} />
		</section>
	);
};

export default Register;
