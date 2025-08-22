import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import PinField from "react-pin-field";
import { logoutUser, sendUserVerificationEmail, verifyUserEmailByOTP } from "../../../actions/users";
import { useToast } from "../../../store/hooks/useToast";
import { Navigate, useNavigate } from "react-router-dom";

const EmailOTPVerification = (props) => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const pinRef = useRef(null);
	const navigate = useNavigate();

	const [isSendingEmail, setIsSendingEmail] = useState(false);
	const [isCorrectPin, setIsCorrectPin] = useState(null);

	const loggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || {});

	useEffect(() => {
		if (loggedInUserInfo?._id && !loggedInUserInfo?.isVerified?.status) sendEmailOTP();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedInUserInfo]);

	const sendEmailOTP = async () => {
		setIsSendingEmail(true); // Set loading state before sending
		dispatch(sendUserVerificationEmail({ notify })).then(() => {
			setIsSendingEmail(false); // Reset loading state when the process is complete
		});
	};

	const VerifyOTP = (pin) => {
		dispatch(verifyUserEmailByOTP({ formData: { otp: pin }, notify }));
	};

	const handleLogout = () => {
		dispatch(logoutUser()).then(() => navigate("/auth"));
	};

	return (
		!props.isFetchingAndVerifyingUser && (
			<>
				{!loggedInUserInfo?.isVerified?.status ? (
					<section className={`gray align-content-center ${!isSendingEmail && "my-5"} `}>
						<div className="container my-5">
							<div className="row justify-content-center">
								<div className="col-md-8 col-xl-5 col-xxl-4">
									<div className="signup-screen-wrap rounded-4">
										<div className="signup-screen-single">
											<div className="text-center mb-4">
												<h4 className="m-0 ft-medium opt-title">
													{isSendingEmail ? "" : "Please verify your account."}
												</h4>
											</div>
											<div className="row">
												<div className="col-12">
													<p className={"opt-text text-center"}>
														{isSendingEmail
															? "Sending Account Verification Email"
															: "If email not received check in spam emails"}
													</p>
													<div className=" text-center py-2">
														<p className={"opt-text pb-4"}> {isSendingEmail ? "" : "Enter OTP here"}</p>
														<div
															className={`flex items-center justify-center ${
																isCorrectPin === "invalid" && "bounce animated"
															}`}
														>
															{isSendingEmail ? (
																<div
																	className="spinner-border"
																	role="status"
																	style={{ marginTop: "40px", marginBottom: "40px" }}
																>
																	<span className="sr-only">Loading...</span>
																</div>
															) : (
																<PinField
																	className={`otp-fields m-1 text-center  ${
																		isCorrectPin === "invalid" && "invalid-field"
																	}`}
																	onComplete={(pin) => VerifyOTP(pin)}
																	onChange={() => setIsCorrectPin(null)}
																	ref={pinRef}
																	onRejectKey={() => setIsCorrectPin("invalid")}
																	length={6}
																	validate="0123456789"
																	autoFocus
																/>
															)}
														</div>

														{isCorrectPin === "invalid" && (
															<p className={"text-center text-sm"} style={{ color: "rgb(220 38 38)" }}>
																The Pin you have entered is invalid!
															</p>
														)}
													</div>
													<div className="form-group text-center mt-4 mb-0">
														<p className="mb-0">
															{isSendingEmail ? (
																""
															) : (
																<span>
																	Don’t Received OTP Yet?{" "}
																	<a
																		onClick={() => {
																			sendEmailOTP();
																		}}
																		className="ft-medium text-danger cursor-pointer"
																	>
																		Resend
																	</a>
																</span>
															)}
														</p>
													</div>
													<div className="row justify-content-center mt-2">
														<div className="col-sm-4 mt-3 mt-sm-0">
															{isSendingEmail ? (
																""
															) : (
																<button onClick={handleLogout} className="btn full-width py-1  text-primary">
																	Logout
																</button>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				) : (
					<Navigate to="/dashboard" />
				)}
			</>
		)
	);
};

export default EmailOTPVerification;
