import { Link } from "react-router-dom";

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();
	const currentYear = year.toString();

	return (
		<footer className="container-fluid text-primary bg-white p-0 m-0 mt-auto">
			<div className="container p-0 py-5 px-sm-0 px-3 ">
				<div className="row">
					<div className="col-xl-3 col-lg-4 col-md-6 my-xl-0 my-3">
						<div style={{ width: "80%" }}>
							<img src="/assets/images/benii-logo.png" className="footer-logo" alt="" />
							<p className="text-secondary footer-para text-justify">
								Empowering mental wellness through personalized care and evidence-based therapies. Take the first step
								towards a brighter future with us.
							</p>
						</div>
						<div className="mt-2 pt-2">
							<p className="fw-semibold mb-2">Social Links</p>
							<div className="d-flex align-items-center ">
								<a href="https:www.facebook.com" className="text-primary me-3">
									<i className="fa-brands fa-facebook-f"></i>
								</a>
								<a href="https:www.linkedin.com" className="text-primary me-3">
									<i className="fa-brands fa-linkedin"></i>
								</a>
								<a href="https:www.twitter.com" className="text-primary me-3">
									<i className="fa-brands fa-x-twitter"></i>
								</a>
								<a href="https:www.instagram.com" className="text-primary me-3">
									<i className="fa-brands fa-instagram"></i>
								</a>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 pt-3 my-xl-0 my-3">
						<h5 className="pb-2">Quick Links</h5>
						<div className="row text-dark ">
							<div className="col-sm-6">
								<ul className="navbar-nav  mb-2 mb-lg-0 m-auto">
									<li className="nav-item mb-2">
										<Link className="nav-link py-0  " aria-current="page" to="/">
											Home
										</Link>
									</li>
									<li className="nav-item mb-2">
										<Link className="nav-link py-0 " to="/about">
											About Us
										</Link>
									</li>
									<li className="nav-item mb-2 ">
										<Link className="nav-link py-0 " to="/contact">
											Contact Us
										</Link>
									</li>
									<li className="nav-item mb-2">
										<Link className="nav-link py-0 " to="/resources">
											Resources
										</Link>
									</li>
								</ul>
							</div>
							<div className="col-sm-6">
								<ul className="navbar-nav  mb-2 mb-lg-0 m-auto">
									<li className="nav-item mb-2">
										<Link className="nav-link py-0 " to="/subscription">
											Subscriptions
										</Link>
									</li>
									<li className="nav-item mb-2">
										<Link className="nav-link py-0  " to="/blog">
											Blogs
										</Link>
									</li>
									<li className="nav-item mb-2">
										<Link className="nav-link py-0 " to="/faqs">
											FAQs
										</Link>
									</li>
									<li className="nav-item mb-2">
										<Link className="nav-link py-0 " to="/virtual-counselor">
											Virtual Counselor
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 pt-3 my-xl-0 my-3">
						<h5 className="pb-2">Contact Links</h5>
						<div>
							<div className="d-flex align-items-center gap-3   py-1">
								<i className="fa-solid fa-location-dot"></i>
								<span className="text-dark">631 ST. Celina, State 111111</span>
							</div>
							<a
								className="d-flex align-items-center gap-3 text-decoration-none text-primary my-1 py-1"
								href="mailto:benii@gmail.com"
							>
								<i className="fa-solid fa-envelope"></i>
								<span className="text-dark">benii@gmail.com</span>
							</a>
							<a className="d-flex align-items-center gap-3 text-decoration-none text-primary  py-1" href="tel:+123456789">
								<i className="fa-solid fa-phone"></i>
								<span className="text-dark">+123 456 789</span>
							</a>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6 pt-3 my-xl-0 my-3">
						<h5>Subscribe to Our Newsletter</h5>
						<p className="text-secondary my-3 footer-para">
							Stay informed and inspired! Join our community by subscribing to our newsletter for the latest updates.
						</p>

						<form className="d-flex align-items-center position-relative">
							<input type="email" className="form-control me-2 shadow-none outline-none" placeholder="email@example.com" />
							<input type="submit" className="btn subscribe-btn bg-primary   position-absolute end-0" value="Subscribe" />
						</form>
					</div>
				</div>
			</div>
			<p className="text-center bg-primary text-white p-3 m-0 ">
				&copy; {currentYear}{" "}
				<a
					href="https://www.single-solution.com"
					target="_blank"
					rel="noopener noreferrer"
					className="text-white text-decoration-none"
				>
					Single Solution
				</a>
				. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
