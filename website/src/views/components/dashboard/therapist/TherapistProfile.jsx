import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../../store/hooks/useToast";
import Profile from "../Profile";
import { useEffect, useRef, useState } from "react";
import { getUser, updateUser } from "../../../../actions/users";
import { handleFormDataInput } from "../../../../utils/helpers";

const TherapistProfile = () => {
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

		dispatch(updateUser({ formData: userProfileFormData, notify })).then(() => {
			dispatch(getUser(notify));
			setIsUpdatingUser(false);
		});
	};

	return (
		<div className=" bg-white-50 round-10px fade-in dashboard-card-shadow p-2 py-5 p-md-5 h-100">
			<h2 className="fs-36px fw-medium mb-0 ps-2 mt-2 ">Profile</h2>
			<h3 className="fs-26px fw-medium mb-3 ps-2 mt-4 text-primary text-decoration-underline ">Professional Information</h3>

			<div className="row m-0">
				<div className="col-12">
					<div className="row my-3 ">
						<div className="col-md-12 text-black my-2">
							<div className="row align-items-center justify-content-between ">
								<div className="   col-12   ">
									<div className="row justify-content-center">
										<div className="col-md-6 my-2">
											<label htmlFor="specialization" className="mb-2 ms-2">
												Specialization *
											</label>
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
												placeholder=" Specialization"
												name="therapist.specialization"
												required=""
												value={userProfileFormData?.therapist?.specialization || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
										<div className="col-md-6 my-2">
											<label htmlFor="qualification" className="mb-2 ms-2">
												Qualification*
											</label>
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
												placeholder="Qualification"
												name="therapist.qualification"
												required=""
												value={userProfileFormData?.therapist?.qualification || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-12 text-black my-2">
							<div className="row align-items-center justify-content-between ">
								<div className="   col-12   ">
									<div className="row">
										<div className="col-md-6 my-2">
											<label htmlFor="experience" className="mb-2 ms-2">
												Experience*
											</label>
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
												placeholder="Experience"
												name="therapist.experience"
												required=""
												value={userProfileFormData?.therapist?.experience || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
										<div className="col-md-6 my-2">
											<label htmlFor="practice" className="mb-2 ms-2">
												Practice*
											</label>
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
												placeholder="Practice"
												name="therapist.practice"
												required=""
												value={userProfileFormData?.therapist?.practice || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-12 text-black my-3">
							<div className="row align-items-center justify-content-between">
								<div className="   col-12   ">
									<div className="row">
										<div className="col-md-6 col-xl-6   my-2">
											<label htmlFor="session" className="mb-2 ms-2">
												Session*
											</label>
											<input
												type="text"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
												placeholder="Session"
												name="therapist.session"
												required=""
												value={userProfileFormData?.therapist?.session || ""}
												onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
											/>
										</div>

										<div className="col-md-6 col-xl-6  my-2">
											<label htmlFor="approached" className="mb-2 ms-2">
												Therapeutic Approaches*
											</label>
											<select
												name="approached"
												id="approached"
												className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white outline-none text-secondary"
											>
												<option value="Clients">approached</option>
												<option value="Client">approached</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-12 text-black my-2">
							<div className="row align-items-center justify-content-between">
								<div className="col-12 ">
									<label htmlFor="bio" className="mb-2 ms-2">
										Bio
									</label>
									<textarea
										name="therapist.bio"
										required=""
										value={userProfileFormData?.therapist?.bio || ""}
										onChange={(e) => handleFormDataInput(e, setUserProfileFormData)}
										rows={6}
										className="w-100 resize-none rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
									></textarea>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-3 ">
						<h3 className="fs-26px fw-medium mb-3 ps-2 mt-4 text-primary text-decoration-underline ">
							Personal Information
						</h3>
					</div>
				</div>
			</div>
			<Profile
				handleUpdateUser={handleUpdateUser}
				userProfileFormData={userProfileFormData}
				setUserProfileFormData={setUserProfileFormData}
				isUpdatingUser={isUpdatingUser}
				hiddenImageFileInput={hiddenImageFileInput}
			/>
		</div>
	);
};

export default TherapistProfile;
