import BreadCrumb from "./partials/breadCrumb";
import { useEffect, useState } from "react";
import useToast from "../store/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../actions/users";
import { mediumPasswordValidation, strongPasswordValidation } from "../utils/validations/regexValidations";
import { handleFormDataInput } from "../utils/helpers";

const ChangePassword = () => {
	const { notify } = useToast();
	const dispatch = useDispatch();

	const [userPasswordFormData, setUserPasswordFormData] = useState({});
	const [passwordStrength, setPasswordStrength] = useState(null);
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const loggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo);

	useEffect(() => {
		setPasswordStrength(null);
	}, []);

	useEffect(() => {
		if (userPasswordFormData) {
			handleVerifyRegisterForm();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userPasswordFormData]);

	const handleVerifyRegisterForm = () => {
		const password = userPasswordFormData?.newPassword || null;
		if (password) {
			if (strongPasswordValidation.test(password)) setPasswordStrength("Strong");
			else if (mediumPasswordValidation.test(password)) setPasswordStrength("Medium");
			else if (password) setPasswordStrength("Weak");
			else setPasswordStrength(null);
		}
	};

	const handleUpdatePassword = (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);

		dispatch(updatePassword({ formData: { ...userPasswordFormData, _id: loggedInUserInfo?._id }, notify })).then(() => {
			setIsSubmittingRequest(false);
			setUserPasswordFormData({});
		});
	};

	return (
		<div className="fade-in">
			<BreadCrumb pageNames={["Change Password"]} page="profile" editButtons={true} />

			<div className="d-flex flex-column-fluid align-items-start container-xxl mt-5 pt-5">
				<div className="content flex-row-fluid" id="kt_content">
					<div className="card mb-5 mb-xl-10">
						<div className="card-body pt-9 pb-0">
							<ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
								<li className="nav-item mt-2">
									<a className="nav-link text-active-primary ms-0 me-10 py-5 active" href="#">
										Change Password
									</a>
								</li>
							</ul>
							<form encType="multipart/form-data" className="form" onSubmit={handleUpdatePassword}>
								<div className="card-body border-top p-9">
									<div className="fv-row mb-10">
										<div className="d-flex flex-stack mb-2">
											<label className="form-label fw-bolder text-dark fs-6 mb-0">Old Password</label>
										</div>
										<div className="position-relative mb-3">
											<input
												className="form-control form-control-lg form-control-solid"
												type={showCurrentPassword ? "text" : "password"}
												placeholder=""
												name="oldPassword"
												required
												value={userPasswordFormData?.oldPassword || ""}
												onChange={(e) => handleFormDataInput(e, setUserPasswordFormData)}
											/>
											<span
												className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
												data-kt-password-meter-control="visibility"
											>
												<i
													onClick={() => setShowCurrentPassword(!showCurrentPassword)}
													className={`toggle-password bi ${showCurrentPassword ? "bi-eye" : "bi-eye-slash"} fs-2`}
												/>
											</span>
										</div>
									</div>

									<div className="fv-row mb-10">
										<div className="d-flex flex-stack mb-2">
											<label className="form-label fw-bolder text-dark fs-6 mb-0">New Password</label>
										</div>

										<div className="position-relative mb-3">
											<input
												className="form-control form-control-lg form-control-solid"
												type={showNewPassword ? "text" : "password"}
												placeholder=""
												name="newPassword"
												required
												value={userPasswordFormData?.newPassword || ""}
												onChange={(e) => handleFormDataInput(e, setUserPasswordFormData)}
											/>
											<span
												onClick={() => setShowNewPassword(!showNewPassword)}
												className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
												data-kt-password-meter-control="visibility"
											>
												<i className={`toggle-password bi ${showNewPassword ? "bi-eye" : "bi-eye-slash"} fs-2`} />
											</span>
										</div>
									</div>

									{userPasswordFormData?.newPassword && passwordStrength && (
										<div className="flex w-full items-center space-x-2">
											{Array.from({ length: 5 }, (_, index) => (
												<div
													className={`w-6 h-2 ${
														passwordStrength === "weak" && index < 2
															? "bg-primary"
															: passwordStrength === "medium" && index < 3
															? "bg-primary"
															: passwordStrength === "strong" && index < 5
															? "bg-primary"
															: "bg-primary bg-opacity-10"
													}`}
													key={index}
												></div>
											))}
											<p
												className={`text-sm font-bold ${
													passwordStrength === "weak"
														? "text-primary"
														: passwordStrength === "medium"
														? "text-primary"
														: "text-primary"
												}`}
											>
												{passwordStrength}
											</p>
										</div>
									)}

									<div className="fv-row mb-10">
										<div className="d-flex flex-stack mb-2">
											<label className="form-label fw-bolder text-dark fs-6 mb-0">Confirm Password</label>
										</div>

										<div className="position-relative mb-3">
											<input
												className="form-control form-control-lg form-control-solid"
												type={showConfirmPassword ? "text" : "password"}
												placeholder=""
												name="confirmPassword"
												required
												value={userPasswordFormData?.confirmPassword || ""}
												onChange={(e) => handleFormDataInput(e, setUserPasswordFormData)}
											/>
											<span
												className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
												data-kt-password-meter-control="visibility"
											>
												<i
													onClick={() => setShowConfirmPassword(!showConfirmPassword)}
													className={`toggle-password bi ${showConfirmPassword ? "bi-eye" : "bi-eye-slash"} fs-2`}
												/>
											</span>
										</div>
									</div>

									{userPasswordFormData?.newPassword &&
										userPasswordFormData?.confirmPassword &&
										userPasswordFormData?.newPassword !== userPasswordFormData?.confirmPassword && (
											<p className="text-red-500 text-sm capitalize">Password didn't match</p>
										)}
								</div>
								<div className="card-footer d-flex justify-content-end py-6 px-9">
									<button
										type="submit"
										className="btn fw-bolder change-btn btn-lg btn-dark w-100 mb-5"
										name="edit_password"
										disabled={
											isSubmittingRequest ||
											!userPasswordFormData?.newPassword ||
											!userPasswordFormData?.confirmPassword ||
											userPasswordFormData?.newPassword !== userPasswordFormData?.confirmPassword
										}
										data-kt-indicator={isSubmittingRequest}
									>
										<span className="indicator-label">Update Password</span>
										<span className="indicator-progress">
											Please wait...
											<span className="spinner-border spinner-border-sm align-middle ms-2" />
										</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
