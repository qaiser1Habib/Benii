import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../../store/hooks/useToast";
import Profile from "../Profile";
import { useEffect, useRef, useState } from "react";
import { updateUser } from "../../../../actions/users";

const UserProfile = () => {
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
		<div className=" fade-in bg-white-50 round-10px dashboard-card-shadow p-2 py-5 p-md-5 h-100">
			<h2 className="fs-30px fw-medium mb-0 ps-2 mt-2">Profile</h2>
			<h3 className="fs-26px fw-medium mb-3 ps-2 mt-4 text-primary text-decoration-underline">Personal Information</h3>

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

export default UserProfile;
