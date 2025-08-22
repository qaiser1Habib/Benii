import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../actions/users";

const Header = () => {
	const dispatch = useDispatch();
	const dropdownRef = useRef(null);
	const multiDropdownRef = useRef(null);

	const [showDropdown, setShowDropdown] = useState(false);

	const loggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || {});

	const toggleDropdown = (e) => {
		e.stopPropagation();
		setShowDropdown((prevShowDropdown) => !prevShowDropdown);
	};

	useEffect(() => {
		const handleOutsideClick = (e) => {
			e.stopPropagation();
			if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !e.target.classList.contains("menu-dropdown")) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);

		// Cleanup function
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, [dropdownRef, multiDropdownRef]);

	const handleLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<>
			<div className="py-2 bg-light">
				<div className="container-xxl d-flex flex-grow-1 flex-stack">
					<div className="d-flex align-items-center me-5">
						<Link to="/">
							<img alt="Logo" src="assets/benii-logo.png" className="h-50px" />
						</Link>
					</div>

					<div className="app-navbar-item d-flex">
						<div onClick={toggleDropdown} className="position-relative">
							<div className="d-flex align-items-center flex-shrink-0">
								<div className="d-flex align-items-center ms-3 ms-lg-4 position-relative ">
									<div className="btn btn-flex align-items-center nav-dropdown-btn">
										<div className="w-40px h-40px">
											<img
												className="h-100 w-100 object-fit-contain rounded"
												src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
													loggedInUserInfo?.about?.profileImage?.filename
												}&mimetype=${loggedInUserInfo?.about?.profileImage?.mimetype}&width=500`}
												alt={loggedInUserInfo?.about?.firstName}
											/>
										</div>
									</div>

									{showDropdown && (
										<div
											className=" position-absolute menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px show"
											ref={dropdownRef}
										>
											<div className="menu-item px-3">
												<div className="menu-content d-flex align-items-center px-3">
													<div className="symbol symbol-50px me-5">
														<img
															src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
																loggedInUserInfo?.about?.profileImage?.filename
															}&mimetype=${loggedInUserInfo?.about?.profileImage?.mimetype}&width=500`}
															alt=""
															className="object-fit-cover"
														/>
													</div>

													<div className="d-flex flex-column">
														<div className="fw-bolder d-flex align-items-center fs-5">
															<span className="badge badge-light-success fw-bolder fs-8 px-2 py-1">
																{loggedInUserInfo?.about?.firstName && loggedInUserInfo?.about?.lastName
																	? `${loggedInUserInfo?.about.firstName} ${loggedInUserInfo?.about.lastName}`
																	: loggedInUserInfo?.about?.firstName ||
																	  loggedInUserInfo?.about?.lastName ||
																	  ""}
															</span>
														</div>
														<a href="#" className="fw-bold text-muted text-hover-primary fs-7">
															{loggedInUserInfo?.email}
														</a>
													</div>
												</div>
											</div>
											<div className="my-2" />

											<div className="menu-item px-5  menu-dropdown">
												<Link className="menu-link px-5" to="/profile">
													Edit Profile
												</Link>
												<div className="my-2" />
												<div className="menu-item">
													<Link aria-current="page" className="menu-link px-5 " to="/change-password">
														Change Password
													</Link>
												</div>
											</div>

											<div className="separator my-2" />

											<div className="menu-item px-5">
												<a onClick={() => handleLogout()} className="menu-link px-5">
													Sign Out
												</a>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<nav className="navbar navbar-expand-lg   py-5" aria-label="Light offcanvas navbar">
					<div className="container-xxl">
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="offcanvas"
							data-bs-target="#offcanvasNavbar"
							aria-controls="offcanvasNavbar"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="offcanvas offcanvas-start "
							tabIndex="-1"
							id="offcanvasNavbar"
							aria-labelledby="offcanvasNavbarLabel"
						>
							<div className="offcanvas-header">
								<Link to="/admin-panel/dashboard" className="h-50px">
									<img alt="Logo" className="w-100 h-100 object-fit-contain rounded" src="assets/benii-logo.png" />
								</Link>
								<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
							</div>
							<div className="offcanvas-body">
								<div className="header-menu d-flex flex-column flex-lg-row w-100">
									<ul className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch flex-grow-1">
										<li className="menu-item  me-lg-1">
											<NavLink className="menu-link py-3" to="/">
												<span className="menu-title">Dashboard</span>
											</NavLink>
										</li>
										<li className="menu-item  me-lg-1">
											<NavLink className="menu-link py-3" to="/plans">
												<span className="menu-title">Plans</span>
											</NavLink>
										</li>
										<li className="menu-item  me-lg-1">
											<NavLink className="menu-link py-3" to="/plan-features">
												<span className="menu-title">Plan Features</span>
											</NavLink>
										</li>
										<li className="menu-item  me-lg-1">
											<NavLink className="menu-link py-3" to="/blogs">
												<span className="menu-title">Blogs</span>
											</NavLink>
										</li>
										<li className="menu-item  me-lg-1">
											<NavLink className="menu-link py-3" to="/resources">
												<span className="menu-title">Resources</span>
											</NavLink>
										</li>
										<li className="menu-item  me-lg-1">
											<NavLink className="menu-link py-3" to="/questions">
												<span className="menu-title">Questions</span>
											</NavLink>
										</li>
										{/* <li className="menu-item nav-item dropdown me-lg-1">
											<a className="nav-link dropdown-toggle cursor-pointer" data-bs-toggle="dropdown">
												Users
											</a>
											<ul className="dropdown-menu p-3">
												<li className="menu-link pb-2 border-bottom">
													<Link to="/users">Users</Link>
												</li>
												<li className="menu-link mt-2">
													<Link to="/therapist">Therapist</Link>
												</li>
											</ul>
										</li> */}
									</ul>
									<div className="flex-shrink-0 p-4 p-lg-0  me-lg-2">
										<button
											className="btn btn-sm btn-light-danger fw-bolder w-100 w-lg-auto  btn-hover-scale"
											onClick={() => handleLogout()}
										>
											Sign Out
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Header;
