import { BsCalendarCheck } from "react-icons/bs";
import { BsGear } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiProgress5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
// import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/users";
import ImageLoader from "../loaders/ImageLoader";
import { setCurrentPage } from "../../store/redux/dashboardPreferences";

const UserDropDown = (props) => {
	const dispatch = useDispatch();
	const currentLoggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || false);
	const handleLogout = () => {
		dispatch(logoutUser()).then(() => window.location.reload());
	};
	const handleNavClick = (page) => {
		dispatch(setCurrentPage(page));
	};

	return (
		<div className="d-flex gap-4">
			<div className="d-flex">
				<div style={{ width: "37px", height: "37px" }}>
					<ImageLoader
						src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
							props?.user?.about?.profileImage?.filename
						}&mimetype=${props?.user?.about?.profileImage?.mimetype}&width=500`}
						className="rounded object-fit-cover"
					/>
				</div>
				<div className="card flex justify-content-center border-0 bg-transparent">
					<div className="dropdown border-0">
						<button
							className="cursor-pointer dropdown-toggle bg-transparent border-0 m-0 text-capitalize truncate"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							{`${
								(props?.user?.about?.firstName + " " + props?.user?.about?.lastName).length > 15
									? (props?.user?.about?.firstName + " " + props?.user?.about?.lastName).slice(0, 10) + "..."
									: props?.user?.about?.firstName + " " + props?.user?.about?.lastName
							}`}
						</button>
						<div className="fs-10px ps-2 m-0">
							{`${props?.user?.email?.length > 20 ? props?.user?.email.slice(0, 20) + "..." : props?.user?.email}`}
						</div>

						<ul className="dropdown-menu p-2 dashboard-card-shadow border border-2 " style={{ width: "185px" }}>
							<li>
								<a
									onClick={() => handleNavClick("profile")}
									className="dropdown-item user-profile-dropdown-item my-1 cursor-pointer rounded"
								>
									<BsGear className="me-2" /> Edit Profile
								</a>
							</li>

							{currentLoggedInUserInfo?.userRole === "user" && (
								<li>
									<a
										onClick={() => handleNavClick("progress")}
										className="dropdown-item user-profile-dropdown-item my-1 cursor-pointer rounded"
									>
										<RiProgress5Line className="me-2" /> Progress
									</a>
								</li>
							)}
							{currentLoggedInUserInfo?.userRole === "therapist" && (
								<li>
									<a
										onClick={() => handleNavClick("client")}
										className="dropdown-item user-profile-dropdown-item my-1 cursor-pointer rounded"
									>
										<FaUserFriends className="me-2" /> Clients
									</a>
								</li>
							)}
							<hr className="mt-2 mb-1" style={{ border: "1px solid #eff2f5", opacity: ".7" }} />
							<li>
								<a onClick={handleLogout} className="dropdown-item user-profile-dropdown-item rounded cursor-pointer">
									<FiLogOut className="me-2" /> Log Out
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserDropDown;
