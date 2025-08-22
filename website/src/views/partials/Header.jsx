import { Link, NavLink, useLocation } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import UserDropDown from "../../styles/profile/UserDropdown";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Header = () => {
	const loggedIn = useSelector((state) => state?.users?.isLoggedIn || false);
	const currentLoggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || false);

	const location = useLocation();
	const canvasRef = useRef();
	const offcanvasTogglerRef = useRef(null);

	const isDashboard = location.pathname === "/dashboard";
	useEffect(() => {
		const handleOffCanvasClose = () => {
			if (canvasRef.current && typeof canvasRef.current.close === "function") {
				canvasRef.current.close();
			} else {
				const offcanvasElement = canvasRef.current;
				if (offcanvasElement) {
					offcanvasElement.classList.remove("show");
					const nextSiblingElement = offcanvasElement.nextElementSibling;
					if (nextSiblingElement) {
						nextSiblingElement.classList.remove("show");
						nextSiblingElement.remove();
						document.body.style = "none";
						offcanvasTogglerRef.current.click();
					}
				}
			}
		};
		handleOffCanvasClose();
	}, [location]);

	return (
		<header className="">
			<div>
				<div
					className="offcanvas offcanvas-end"
					ref={canvasRef}
					tabIndex={-1}
					id="offcanvasExample"
					aria-labelledby="offcanvasExampleLabel"
				>
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offcanvasExampleLabel">
							<img src="/assets/images/benii-logo.png" alt="" height={"61px"} />
						</h5>
						<button type="button" className="btn-close shadow-none " data-bs-dismiss="offcanvas" aria-label="Close" />
					</div>
					<div className="offcanvas-body">
						<ul className="navbar-nav  mb-2 mb-lg-0 m-auto">
							<li className="nav-item">
								<NavLink className="nav-link fw-medium " aria-current="page" to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/about">
									About Us
								</NavLink>
							</li>
							<li className="nav-item ">
								<NavLink className="nav-link fw-medium" to="/virtual-counselor">
									Virtual Counselor
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/resources">
									Resources
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/subscription">
									Subscriptions
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/faqs">
									FAQs
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/contact">
									Contact
								</NavLink>
							</li>
							<li className="nav-item">
								{!isDashboard &&
									(loggedIn ? (
										<Link className="btn btn-primary d-block d-sm-non" to="/dashboard">
											Dashboard
										</Link>
									) : (
										<Link className="btn btn-primary d-block d-sm-non" to="/auth">
											Log In/Sign Up
										</Link>
									))}
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="d-flex justify-content-between container align-items-center py-3 px-0"></div>
			<nav className="navbar navbar-expand-xl ">
				<div className="container p-0 d-flex justify-content-between align-items-center flex-row-reverse flex-xl-row  ">
					<div className=" d-xl-none d-flex  align-items-center  gap-4">
						{!isDashboard &&
							(loggedIn ? (
								<Link className="btn btn-primary d-none d-sm-block" to="/dashboard">
									Dashboard
								</Link>
							) : (
								<Link className="btn btn-primary d-none d-sm-block" to="/auth">
									Log In/Sign Up
								</Link>
							))}
					</div>
					<Link className="navbar-brand" to="/">
						<img src="/assets/images/benii-logo.png" alt="" className="img-fluid logo-image" />
					</Link>

					<button
						className="navbar-toggler shadow-none border-0 "
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasExample"
						aria-controls="offcanvasExample"
						type="button"
						aria-label="Toggle navigation"
						ref={offcanvasTogglerRef}
					>
						<span className="navbar-toggler-icon text-primary " />
					</button>
					<div className=" navbar-collapse d-none   d-xl-flex justify-content-between " id="navbarSupportedContent">
						<ul className="navbar-nav  mb-2 mb-lg-0 m-auto">
							<li className="nav-item">
								<NavLink className="nav-link fw-medium " aria-current="page" to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/about">
									About Us
								</NavLink>
							</li>
							<li className="nav-item ">
								<NavLink className="nav-link fw-medium" to="/virtual-counselor">
									Virtual Counselor
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/resources">
									Resources
								</NavLink>
							</li>
							{(!currentLoggedInUserInfo?._id || currentLoggedInUserInfo?.userRole === "therapist") && (
								<li className="nav-item">
									<NavLink className="nav-link fw-medium" to="/subscription">
										Subscriptions
									</NavLink>
								</li>
							)}
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/faqs">
									FAQs
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link fw-medium" to="/contact">
									Contact
								</NavLink>
							</li>
						</ul>
						{!isDashboard &&
							(loggedIn ? (
								<Link className="btn btn-primary" to="/dashboard">
									Dashboard
								</Link>
							) : (
								<Link className="text-decoration-none btn btn-primary fw-medium" to="/auth">
									Log In/Sign Up
								</Link>
							))}
						{isDashboard && currentLoggedInUserInfo && <UserDropDown user={currentLoggedInUserInfo} />}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
