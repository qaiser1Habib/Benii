import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../store/hooks/useToast";
import { useEffect, useState } from "react";
import { updatePassword } from "../../../actions/users";
import { mediumPasswordValidation, strongPasswordValidation } from "../../../utils/validations/regexValidations";
import { handleFormDataInput } from "../../../utils/helpers";

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
		<>
			<h3 className="fs-26px fw-medium mb-3 ps-2 mt-5 text-primary text-decoration-underline">Change Password</h3>
			<form className="row m-0" onSubmit={handleUpdatePassword}>
				<div className="col-12">
					<div className="row my-4 py-1 ">
						<div className="col-md-12 text-black ">
							<div className="row">
								<div className=" text-secondary col-12  col-xl-4 col-xxl-2 mb-0 mt-2 ">Old Password:</div>
								<div className="col-12   col-xl-8 col-xxl-10 d-flex position-relative align-items-center ps-xl-4">
									<input
										className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  "
										placeholder="*************"
										type={showCurrentPassword ? "text" : "password"}
										name="oldPassword"
										required
										value={userPasswordFormData?.oldPassword || ""}
										onChange={(e) => handleFormDataInput(e, setUserPasswordFormData)}
									/>
									<i
										onClick={() => setShowCurrentPassword(!showCurrentPassword)}
										className={`fa-regular ${
											showCurrentPassword ? "fa-eye" : "fa-eye-slash"
										} position-absolute text-secondary`}
										style={{ right: "25px", cursor: "pointer" }}
									></i>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-4 py-1 ">
						<div className="col-md-12 text-black ">
							<div className="row">
								<div className=" text-nowrap   text-secondary col-12  col-xl-4 col-xxl-2 mb-0 mt-2 ">New Password:</div>
								<div className="col-12  col-xl-8 col-xxl-10 d-flex position-relative align-items-center ps-xl-4">
									<input
										className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  "
										type={showNewPassword ? "text" : "password"}
										placeholder="*************"
										name="newPassword"
										required
										value={userPasswordFormData?.newPassword || ""}
										onChange={(e) => handleFormDataInput(e, setUserPasswordFormData)}
									/>
									<i
										onClick={() => setShowNewPassword(!showNewPassword)}
										className={`fa-regular ${
											showNewPassword ? "fa-eye" : "fa-eye-slash"
										} position-absolute text-secondary`}
										style={{ right: "25px", cursor: "pointer" }}
									></i>
								</div>
								<div className=" text-nowrap   text-secondary col-12  col-xl-4 col-xxl-2 mb-0 mt-2 "></div>
								<div className="col-12  col-xl-8 col-xxl-10 ">
									{userPasswordFormData?.newPassword && passwordStrength && (
										<div className="flex w-full items-center ms-3">
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
								</div>
							</div>
						</div>
					</div>
					<div className="row my-4 py-1 ">
						<div className="col-md-12 text-black ">
							<div className="row">
								<div className="  text-secondary col-12  col-xl-4 col-xxl-2 mb-0 mt-2 text-nowrap ">
									Confirm Password:
								</div>
								<div className="col-12  col-xl-8 col-xxl-10 d-flex position-relative align-items-center ps-xl-4">
									<input
										className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  "
										type={showConfirmPassword ? "text" : "password"}
										placeholder="*************"
										name="confirmPassword"
										required
										value={userPasswordFormData?.confirmPassword || ""}
										onChange={(e) => handleFormDataInput(e, setUserPasswordFormData)}
									/>
									<i
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className={`fa-regular ${
											showConfirmPassword ? "fa-eye" : "fa-eye-slash"
										} position-absolute text-secondary`}
										style={{ right: "25px", cursor: "pointer" }}
									></i>
								</div>
								<div className="text-secondary col-12  col-xl-4 col-xxl-2 mb-0 mt-2 text-nowrap "></div>
								<div className="col-12  col-xl-8 col-xxl-10 d-flex position-relative align-items-center ps-xl-4">
									{userPasswordFormData?.newPassword &&
										userPasswordFormData?.confirmPassword &&
										userPasswordFormData?.newPassword !== userPasswordFormData?.confirmPassword && (
											<p className="text-danger text-sm capitalize">Password didn't match</p>
										)}
								</div>
							</div>
						</div>
					</div>
					<div className=" text-center mt-4">
						<button
							type="submit"
							disabled={
								isSubmittingRequest ||
								!userPasswordFormData?.newPassword ||
								!userPasswordFormData?.confirmPassword ||
								userPasswordFormData?.newPassword !== userPasswordFormData?.confirmPassword
							}
							className="btn btn-primary    py-2 px-4"
						>
							{isSubmittingRequest ? (
								<>
									<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
									Please Wait...
								</>
							) : (
								"Change Password"
							)}
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default ChangePassword;
