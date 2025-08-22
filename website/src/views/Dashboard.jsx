import { useCallback, useEffect, useRef, useState } from "react";
import { TiHomeOutline } from "react-icons/ti";
import { BsChatLeftText, BsCalendarCheck, BsGear } from "react-icons/bs";
import { GoGoal } from "react-icons/go";
import { RiProgress5Line, RiCustomerService2Line, RiExchangeDollarLine } from "react-icons/ri";
import { MdPerson, MdLogout, MdOutlinePayment } from "react-icons/md";
import { TbChartBar } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import UserProfile from "./components/dashboard/user/UserProfile.jsx";
import Reports from "./components/dashboard/user/Reports";
import Support from "./components/dashboard/user/Support";
import UserStats from "./components/dashboard/user/Stats";
import Conversation from "./components/dashboard/user/Conversation";
import Goals from "./components/dashboard/user/Goals";
import Progress from "./components/dashboard/user/Progress";
import UserAppointment from "./components/dashboard/user/Appointment";
import TherapistStats from "./components/dashboard/therapist/Stats";
import TherapistAppointment from "./components/dashboard/therapist/Appointment";
import Client from "./components/dashboard/therapist/Client";
import Service from "./components/dashboard/therapist/Service";
import Subscription from "./components/dashboard/therapist/Subscription";
import Payment from "./components/dashboard/therapist/Payment";
import TherapistProfile from "./components/dashboard/therapist/TherapistProfile.jsx";
import { logoutUser } from "../actions/users";
import useToast from "../store/hooks/useToast";
import { getSubscriptions } from "../actions/subscriptions.js";
import { setCurrentPage } from "../store/redux/dashboardPreferences.js";
import AppLoader from "../styles/loaders/AppLoader.jsx";

const Dashboard = () => {
	const dispatch = useDispatch();
	const notify = useToast();
	const navigate = useNavigate();
	const sideBarCloseRef = useRef(null);
	const [sideBarText, setSideBarText] = useState(true);
	const [dashboardCol, setDashboardCol] = useState(false);
	const [isSideBarClose, setIsSideBarClose] = useState(false);
	const [isUserSubscriptionPaid, setIsUserSubscriptionPaid] = useState(false);
	const [isFetchingAndVerifyingUser, setIsFetchingAndVerifyingUser] = useState(true);
	const currentLoggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || false);
	const currentPage = useSelector((state) => state?.dashboardPreferences?.currentPage);

	const handleNavClick = useCallback(
		(page) => {
			dispatch(setCurrentPage(page));
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentPage]
	);

	const handleSideBarClose = () => {
		if (sideBarCloseRef.current) {
			sideBarCloseRef.current.classList.toggle("w-75");
			if (sideBarCloseRef.current.classList.contains("w-75")) {
				setSideBarText(!sideBarText);
				setIsSideBarClose(!isSideBarClose);
				setDashboardCol(!dashboardCol);
			} else {
				setTimeout(() => {
					setSideBarText(!sideBarText);
				}, 300);
				setIsSideBarClose(!isSideBarClose);
				setDashboardCol(!dashboardCol);
			}
		}
	};
	const renderPage = () => {
		if (currentLoggedInUserInfo?.userRole === "therapist") {
			switch (currentPage) {
				case "stats":
					return <TherapistStats />;
				case "appointment":
					return <TherapistAppointment />;
				case "client":
					return <Client />;
				case "service":
					return <Service />;
				case "subscription":
					return <Subscription />;
				case "payment":
					return <Payment />;
				case "profile":
					return <TherapistProfile />;
				default:
					return null;
			}
		} else if (currentLoggedInUserInfo?.userRole === "user") {
			switch (currentPage) {
				case "stats":
					return <UserStats />;
				case "conversation":
					return <Conversation />;
				case "goals":
					return <Goals />;
				case "progress":
					return <Progress />;
				case "appointment":
					return <UserAppointment />;
				case "support":
					return <Support />;
				case "reports":
					return <Reports />;
				case "profile":
					return <UserProfile />;
				default:
					return null;
			}
		}
	};
	const handleLogout = () => {
		dispatch(logoutUser()).then(() => window.location.reload());
	};

	useEffect(() => {
		dispatch(getSubscriptions({ formData: { page: 1, limit: 100 }, notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (currentLoggedInUserInfo?._id) {
			if (currentLoggedInUserInfo?.isVerified?.status) {
				if (
					(currentLoggedInUserInfo?.userRole === "therapist" &&
						currentLoggedInUserInfo?.subscription?.subscriptionPlanID?._id) ||
					currentLoggedInUserInfo?.userRole === "user"
				) {
					getUserVerificationAndPaymentStatus();
				} else {
					navigate("/subscription", {
						state: {
							user: currentLoggedInUserInfo,
						},
					});
				}
			} else {
				navigate("/email-verification");
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentLoggedInUserInfo]);

	const getUserVerificationAndPaymentStatus = () => {
		if (currentLoggedInUserInfo?.userRole === "user") {
			setIsUserSubscriptionPaid(true);
		} else if (currentLoggedInUserInfo?.userRole === "therapist" && currentLoggedInUserInfo?.subscription?.subscriptionPlanID) {
			if (
				(currentLoggedInUserInfo?.subscription?.paymentStatus === "paid" &&
					currentLoggedInUserInfo?.subscription?.isActive) ||
				currentLoggedInUserInfo?.subscription?.isActiveByAdmin ||
				new Date(currentLoggedInUserInfo?.subscription?.schedule?.end) > new Date()
			) {
				setIsUserSubscriptionPaid(true);
			} else if (new Date(currentLoggedInUserInfo?.subscriptions?.schedule?.end) < new Date()) {
			} else {
				navigate("/subscription", {
					state: {
						user: currentLoggedInUserInfo,
					},
				});
			}
		} else {
			navigate("/subscription", {
				state: {
					user: currentLoggedInUserInfo,
				},
			});
		}
		setIsFetchingAndVerifyingUser(false);
	};

	return (
		<>
			{!isFetchingAndVerifyingUser ? (
				<div className="fade-in">
					{isUserSubscriptionPaid && !currentLoggedInUserInfo?.isVerified?.status ? (
						<Navigate to="/email-verification" />
					) : (
						<>
							<div className="container">
								<div className="d-xl-none d-flex align-items-center justify-content-between py-2">
									<div className="fw-semibold text-primary">Dashboard Navigation</div>
									<RxHamburgerMenu
										className="fs-2"
										data-bs-toggle="offcanvas"
										data-bs-target="#offcanvasDashboard"
										aria-controls="offcanvasDashboard"
									/>
								</div>
							</div>
							<div
								className="offcanvas offcanvas-start"
								tabIndex={-1}
								id="offcanvasDashboard"
								aria-labelledby="offcanvasDashboardLabel"
							>
								<div className="offcanvas-header">
									<h5 className="offcanvas-title" id="offcanvasExampleLabel">
										<img src="/assets/images/benii-logo.png" alt="" height={"61px"} />
									</h5>
									<button
										type="button"
										className="btn-close shadow-none"
										data-bs-dismiss="offcanvas"
										aria-label="Close"
									/>
								</div>
								<div className="offcanvas-body">
									<div className="bg-white-50 round-10px py-3">
										<ul className="p-0">
											{currentLoggedInUserInfo?.userRole === "therapist" &&
												[
													{ key: "stats", icon: <TiHomeOutline className="fs-2" />, label: "Dashboard" },
													{ key: "appointment", icon: <BsCalendarCheck className="fs-4" />, label: "Appointment" },
													{ key: "client", icon: <FaUserFriends className="fs-4" />, label: "Clients" },
													{ key: "service", icon: <BsGear className="fs-4" />, label: "Services" },
													{
														key: "subscription",
														icon: <RiExchangeDollarLine className="fs-4" />,
														label: "Subscription",
													},
													{ key: "payment", icon: <MdOutlinePayment className="fs-4" />, label: "Payment" },
													{ key: "profile", icon: <MdPerson className="fs-4" />, label: "Profile" },
												].map((item) => (
													<li
														key={item.key}
														className={`dashboard-link ${
															currentPage === item.key ? "active" : ""
														} text-secondary round-end-42px py-2 ${
															sideBarText ? "px-5" : "ps-3"
														} fs-22px d-flex align-items-center gap-4 fw-medium my-4 cursor-pointer`}
														onClick={() => handleNavClick(item.key)}
													>
														{item.icon} {sideBarText && item.label}
													</li>
												))}

											{currentLoggedInUserInfo?.userRole === "user" &&
												[
													{ key: "stats", icon: <TiHomeOutline className="fs-2" />, label: "Dashboard" },
													{ key: "conversation", icon: <BsChatLeftText className="fs-4" />, label: "Conversations" },
													{ key: "goals", icon: <GoGoal className="fs-4" />, label: "Goals" },
													{ key: "progress", icon: <RiProgress5Line className="fs-4" />, label: "Progress" },
													{ key: "appointment", icon: <BsCalendarCheck className="fs-4" />, label: "Appointment" },
													{ key: "support", icon: <RiCustomerService2Line className="fs-4" />, label: "Support" },
													{ key: "reports", icon: <TbChartBar className="fs-4" />, label: "Reports" },
													{ key: "profile", icon: <MdPerson className="fs-4" />, label: "Profile" },
												]
													.filter(
														(item) =>
															item.key !== "appointment" ||
															currentLoggedInUserInfo?.isVerified?.verifiedByTherapist
													)
													.map((item) => (
														<li
															key={item.key}
															className={`dashboard-link ${
																currentPage === item.key ? "active" : ""
															} text-secondary round-end-42px py-2 ${
																sideBarText ? "px-4" : "ps-3"
															} fs-22px d-flex align-items-center gap-4 fw-medium my-3 cursor-pointer`}
															onClick={() => handleNavClick(item.key)}
														>
															{item.icon} {sideBarText && item.label}
														</li>
													))}
											<li
												className={`round-end-42px py-2 ${
													sideBarText ? "px-5" : "ps-3"
												} fs-26px d-flex align-items-center gap-4 fw-medium my-4 cursor-pointer`}
											>
												<a
													onClick={handleLogout}
													className="text-decoration-none text-primary-dark d-flex align-items-center gap-4"
												>
													<MdLogout /> {sideBarText && "Logout"}
												</a>
											</li>
										</ul>
										{currentLoggedInUserInfo?.userRole === "user" && (
											<div className="px-xxl-5 pb-2">
												<div className="user-dashboard-side-menu-card px-2 text-center round-10px py-3">
													<img src="/assets/images/user-dashboard-card-image.png" alt="" height={91} />
													<h5 className="fw-medium">Health Tip Of The Day</h5>
													<h5>Set Realistic Goals</h5>
													<p className="text-secondary-dark mb-0">
														Set realistic and achievable goals for yourself, both short-term and long-term. Break
														larger goals into smaller, manageable steps to avoid feeling overwhelmed.
													</p>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="container pb-5 my-xl-5 mt-3  position-relative">
								{currentPage !== "profile" && currentPage !== "support" && (
									<div>
										<div className="about-page-blur-bg d-none d-xl-block">
											<div className="blur-box resource-box position-absolute"></div>
										</div>
										<div className="all-blur-bg d-none d-xl-block">
											<div className="blur-box resource-box position-absolute d-none d-xl-block"></div>
										</div>
									</div>
								)}
								<div className="row">
									<div className={`${dashboardCol ? "w-8-33" : "w-16-66"} px-0 d-none d-xl-block`}>
										<div
											className="bg-white-50 round-10px py-3 position-sticky top-0 start-0 sidebar-transition"
											ref={sideBarCloseRef}
										>
											<ul className="p-0">
												<li
													className="round-end-42px p-0 text-end pe-3  text-secondary fs-26px fw-medium my-0 cursor-pointer"
													onClick={handleSideBarClose}
												>
													<IoIosArrowBack
														className={`sidebar-close-btn ${isSideBarClose ? "sidebar-close-btn-rotate" : ""}`}
													/>
												</li>
												{currentLoggedInUserInfo?.userRole === "therapist" &&
													[
														{ key: "stats", icon: <TiHomeOutline className="fs-4" />, label: "Dashboard" },
														{
															key: "appointment",
															icon: <BsCalendarCheck className="fs-5" />,
															label: "Appointment",
														},
														{ key: "client", icon: <FaUserFriends className="fs-5" />, label: "Clients" },
														{ key: "service", icon: <BsGear className="fs-5" />, label: "Services" },
														{
															key: "subscription",
															icon: <RiExchangeDollarLine className="fs-5" />,
															label: "Subscription",
														},
														{ key: "payment", icon: <MdOutlinePayment className="fs-5" />, label: "Payment" },
														{ key: "profile", icon: <MdPerson className="fs-5" />, label: "Profile" },
													].map((item, i) => (
														<li
															key={item.key}
															className={`dashboard-link ${
																currentPage === item.key ? "active" : ""
															} text-secondary round-end-42px py-2 ${
																sideBarText ? "px-4" : "ps-3"
															} fs-18px d-flex align-items-center gap-4 fw-medium ${
																i === 0 ? "mt-1" : ""
															} my-4 cursor-pointer`}
															onClick={() => handleNavClick(item.key)}
														>
															{item.icon} {sideBarText && item.label}
														</li>
													))}
												{currentLoggedInUserInfo?.userRole === "user" &&
													[
														{ key: "stats", icon: <TiHomeOutline className="fs-4" />, label: "Dashboard" },
														{
															key: "conversation",
															icon: <BsChatLeftText className="fs-5" />,
															label: "Conversations",
														},
														{ key: "goals", icon: <GoGoal className="fs-5" />, label: "Goals" },
														{ key: "progress", icon: <RiProgress5Line className="fs-5" />, label: "Progress" },
														{
															key: "appointment",
															icon: <BsCalendarCheck className="fs-5" />,
															label: "Appointment",
														},
														{
															key: "support",
															icon: <RiCustomerService2Line className="fs-5" />,
															label: "Support",
														},
														{ key: "reports", icon: <TbChartBar className="fs-5" />, label: "Reports" },
														{ key: "profile", icon: <MdPerson className="fs-5" />, label: "Profile" },
													]
														.filter(
															(item) =>
																item.key !== "appointment" ||
																currentLoggedInUserInfo?.isVerified?.verifiedByTherapist
														)
														.map((item, i) => (
															<li
																key={item?.key}
																className={`dashboard-link ${
																	currentPage === item?.key ? "active" : ""
																} text-secondary round-end-42px py-2 ${
																	sideBarText ? "px-4" : "ps-3"
																} fs-18px d-flex align-items-center gap-4 fw-medium ${
																	i === 0 ? "mt-1" : ""
																} my-4 cursor-pointer`}
																onClick={() => handleNavClick(item?.key)}
															>
																{item?.icon} {sideBarText && item?.label}
															</li>
														))}
												<li
													className={`round-end-42px py-2 ${
														sideBarText ? "px-4" : "ps-3"
													} fs-18px d-flex align-items-center gap-4 fw-medium my-4 cursor-pointer`}
												>
													<a
														onClick={handleLogout}
														className="text-decoration-none text-primary-dark d-flex align-items-center gap-4"
													>
														<MdLogout /> {sideBarText && "Logout"}
													</a>
												</li>
											</ul>
											{sideBarText && currentLoggedInUserInfo?.userRole === "user" && (
												<div className="px-xxl-4 pb-2">
													<div className="user-dashboard-side-menu-card px-2 text-center round-10px py-3">
														<img src="/assets/images/user-dashboard-card-image.png" className="" height={91} />
														<h6 className="fw-medium fs-14px">Health Tip Of The Day</h6>
														<h6 className="fs-14px">Set Realistic Goals</h6>
														<p className="fs-12px text-secondary-dark mb-0">
															Set realistic and achievable goals for yourself, both short-term and long-term. Break
															larger goals into smaller, manageable steps to avoid feeling overwhelmed.
														</p>
													</div>
												</div>
											)}
										</div>
									</div>
									<div className={`${dashboardCol ? "w-xl-91-66" : "w-xl-83-33"} ps-xl-4 p-0 sidebar-transition`}>
										{renderPage()}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			) : (
				<AppLoader />
			)}
		</>
	);
};

export default Dashboard;
