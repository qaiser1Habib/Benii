import { useEffect, useRef, useState } from "react";
import BreadCrumb from "./partials/breadCrumb";
import useToast from "../store/hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/users";
import { handleFormDataInput } from "../utils/helpers";

const Profile = () => {
	const { notify } = useToast();
	const dispatch = useDispatch();
	const hiddenImageFileInput = useRef();

	const [userProfileFormData, setUserProfileFormData] = useState({});
	const [isUpdatingUser, setIsUpdatingUser] = useState(false);

	const user = useSelector((state) => state?.users?.loggedInUserInfo);

	useEffect(() => {
		setUserProfileFormData({});
		setIsUpdatingUser(false);
	}, []);

	useEffect(() => {
		if (user?._id) setUserProfileFormData(user);
	}, [user]);

	const handleUpdateUser = (e) => {
		e.preventDefault();
		setIsUpdatingUser(true);

		dispatch(updateUser({ formData: userProfileFormData, notify })).then(() => setIsUpdatingUser(false));
	};

	return (
		<div className="fade-in">
			<BreadCrumb pageNames={["Personal Information"]} editButtons={true} />

			<div className="container-xxl mt-5 pt-5">
				<div className="content flex-row-fluid" id="kt_content">
					<div className="card mb-5 mb-xl-10">
						<div className="card-body pt-9 pb-0">
							<ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
								<li className="nav-item mt-2">
									<a className="nav-link text-active-primary ms-0 me-10 py-5 active" href="#">
										Personal Information
									</a>
								</li>
							</ul>
							<form className="form" onSubmit={handleUpdateUser}>
								<div className="card-body border-top p-9">
									<div className="row mb-6">
										<label className="col-lg-4 col-form-label fw-bold fs-6">Signature</label>
										<div className="col-lg-4">
											<div className="image-input image-input-outline" style={{ background: "#f2f0fb" }}>
												<span
													className="picture__image w-100 h-100"
													onClick={() => hiddenImageFileInput.current.click()}
												>
													{userProfileFormData?.about?.profileImage?.filename instanceof Blob ? (
														<img
															src={URL.createObjectURL(userProfileFormData?.about?.profileImage?.filename)}
															alt=""
															className="w-100 h-300px rounded object-fit-contain"
															loading="lazy"
														/>
													) : (
														<img
															src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
																userProfileFormData?.about?.profileImage?.filename
															}&mimetype=${userProfileFormData?.about?.profileImage?.mimetype}&width=500`}
															alt=""
															className="w-100 h-300px rounded object-fit-contain"
														/>
													)}
												</span>

												<input
													style={{ display: "none" }}
													ref={hiddenImageFileInput}
													type="file"
													accept="image/x-png,image/jpeg"
													onChange={(e) =>
														setUserProfileFormData({
															...userProfileFormData,
															about: {
																...userProfileFormData?.about,
																profileImage: {
																	filename: e.target.files[0],
																	mimetype: e.target.files[0].mimetype,
																},
															},
														})
													}
												/>
											</div>
											<div className="form-text">
												Upload your Profile Picture
												<span
													onClick={() => hiddenImageFileInput.current.click()}
													className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow ms-4 "
												>
													<i className="bi bi-pencil-fill fs-7" />
												</span>
											</div>
										</div>
									</div>
									<div className="row mb-6">
										<label className="col-lg-4 col-form-label required fw-bold fs-6">Full Name</label>
										<div className="col-lg-8">
											<div className="row">
												<div className="col-lg-6 fv-row">
													<input
														type="text"
														name="about.firstName"
														className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
														placeholder="First name"
														required=""
														value={userProfileFormData?.about?.firstName || ""}
														onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
													/>
												</div>
												<div className="col-lg-6 fv-row">
													<input
														type="text"
														name="about.lastName"
														className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
														placeholder="Last name"
														required=""
														value={userProfileFormData?.about?.lastName || ""}
														onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="row mb-6">
										<label className="col-lg-4 col-form-label required fw-bold fs-6">Phone</label>
										<div className="col-lg-8 fv-row">
											<input
												type="text"
												name="about.phone"
												className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
												placeholder="(+1) 080 17d6 1d2"
												required=""
												value={userProfileFormData?.about?.phone || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
									</div>
									<div className="row mb-6">
										<label className="col-lg-4 col-form-label required fw-bold fs-6">Street</label>
										<div className="col-lg-8 fv-row">
											<input
												type="text"
												name="about.streetAddress"
												className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
												placeholder="Street Address"
												required=""
												value={userProfileFormData?.about?.streetAddress || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
									</div>
									<div className="row mb-6">
										<label className="col-lg-4 col-form-label fw-bold fs-6">
											<span className="required">House Number</span>
										</label>
										<div className="col-lg-8 fv-row">
											<input
												type="text"
												name="about.houseNumber"
												className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
												placeholder="House Number"
												required=""
												value={userProfileFormData?.about?.houseNumber || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
									</div>
									<div className="row mb-6">
										<label className="col-lg-4 col-form-label fw-bold fs-6">
											<span className="required">City</span>
										</label>
										<div className="col-lg-8 fv-row">
											<input
												type="text"
												name="about.city"
												className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
												placeholder="City"
												required=""
												value={userProfileFormData?.about?.city || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
									</div>
									<div className="row mb-6">
										<label className="col-lg-4 col-form-label fw-bold fs-6">
											<span className="required">State Abbreviation</span>
										</label>
										<div className="col-lg-8 fv-row">
											<input
												type="text"
												name="about.state"
												className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
												placeholder="State"
												required=""
												value={userProfileFormData?.about?.state || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
									</div>
									<div className="row mb-6">
										<label className="col-lg-4 col-form-label fw-bold fs-6">
											<span className="required">Zip Code</span>
										</label>
										<div className="col-lg-8 fv-row">
											<input
												type="text"
												name="about.postalCode"
												className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
												placeholder="Postal Code"
												required=""
												value={userProfileFormData?.about?.postalCode || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
									</div>
								</div>
								<div className="card-footer d-flex justify-content-end py-6 px-9">
									<button
										type="submit"
										id="submit_btn"
										className="btn btn-lg btn-primary w-100 mb-5"
										name="edit_user_profile"
										disabled={!userProfileFormData?.about?.firstName || !userProfileFormData?.about?.lastName}
									>
										<span className="indicator-label">UPDATE</span>
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

export default Profile;
