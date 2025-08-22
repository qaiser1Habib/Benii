import { FaEdit } from "react-icons/fa";
import { handleFormDataInput } from "../../../utils/helpers";
import ChangePassword from "./ChangePassword";
import ImageLoader from "../../../styles/loaders/ImageLoader";

const Profile = (props) => {
	return (
		<div>
			<div className="row m-0">
				<div className="col-12">
					<div className="row my-3 ">
						<div className="col-md-12 text-black py-3 mb-2">
							<div className="row align-items-center">
								<div className="fs-14px fs-xxxl-18px  text-secondary col-5  col-xl-4 col-xxxl-3">Profile Image:</div>
								<div className="col-7 col-xl-8 col-xxxl-9  d-flex justify-content-start">
									<div className="d-flex align-items-center flex-column">
										<span
											className="picture__image rounded"
											onClick={() => props?.hiddenImageFileInput.current.click()}
										>
											{props?.userProfileFormData?.about?.profileImage?.filename instanceof Blob ? (
												<img
													src={URL.createObjectURL(props?.userProfileFormData?.about?.profileImage?.filename)}
													alt=""
													className="w-100 h-100 rounded"
													loading="lazy"
												/>
											) : (
												<ImageLoader
													src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
														props?.userProfileFormData?.about?.profileImage?.filename
													}&mimetype=${props?.userProfileFormData?.about?.profileImage?.mimetype}&width=500`}
													className="rounded"
												/>
											)}
										</span>

										<input
											style={{ display: "none" }}
											ref={props?.hiddenImageFileInput}
											type="file"
											accept="image/x-png,image/jpeg"
											onChange={(e) =>
												props?.setUserProfileFormData({
													...props?.userProfileFormData,
													about: {
														...props?.userProfileFormData?.about,
														profileImage: {
															filename: e.target.files[0],
															mimetype: e.target.files[0].mimetype,
														},
													},
												})
											}
										/>
										<p
											className="text-secondary mt-2 d-flex align-items-center gap-2"
											onClick={() => props?.hiddenImageFileInput.current.click()}
										>
											Upload your Picture Here!
											<FaEdit />
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-12 text-black ">
							<div className="row align-items-center justify-content-between ">
								<div className="  text-secondary col-5  col-xl-4 col-xxl-2 mb-1">Full Name:</div>
								<div className="   col-12   col-xl-8 col-xxl-10">
									<div className="row">
										<div className="col-md-6 my-2">
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
												name="about.firstName"
												placeholder="First name"
												required=""
												value={props?.userProfileFormData?.about?.firstName || ""}
												onChange={(e) => handleFormDataInput(e, props?.setUserProfileFormData)}
											/>
										</div>
										<div className="col-md-6 my-2">
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
												name="about.lastName"
												placeholder="Last name"
												required=""
												value={props?.userProfileFormData?.about?.lastName || ""}
												onChange={(e) => handleFormDataInput(e, props?.setUserProfileFormData)}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-2 pt-2">
						<div className="col-md-12 text-black py-3">
							<div className="row">
								<div className="  text-secondary col-12  col-xl-4 col-xxl-2 mb-0 mt-2">Phone:</div>
								<div className="col-12   col-xl-8 col-xxl-10 d-flex position-relative align-items-center">
									<input
										type="tel"
										className="w-100 rounded-3 border  border-2  border-grey py-2 px-3 bg-white "
										placeholder="+1 (547) 546 768"
										name="about.phone"
										required=""
										value={props?.userProfileFormData?.about?.phone || ""}
										onChange={(e) => handleFormDataInput(e, props?.setUserProfileFormData)}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className=" text-center mt-4">
						<button
							disabled={
								props?.isUpdatingUser ||
								!props?.userProfileFormData?.about?.firstName ||
								!props?.userProfileFormData?.about?.lastName
							}
							onClick={props?.handleUpdateUser}
							className="btn btn-primary   py-2 px-4"
						>
							{props?.isUpdatingUser ? (
								<>
									<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
									Please Wait...
								</>
							) : (
								"Update"
							)}
						</button>
					</div>
				</div>
			</div>
			<ChangePassword />
		</div>
	);
};

export default Profile;
