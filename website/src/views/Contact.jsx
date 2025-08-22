import { Link } from "react-router-dom";
import BreadCrumb from "./partials/BreadCrumb";

const Contact = () => {
	return (
		<div className="fade-in">
			<BreadCrumb title="Contact" />
			<div className="position-relative">
				<div className="about-page-blur-bg d-none d-xl-block ">
					<div className="blur-box position-absolute"></div>
				</div>
				<div className="all-blur-bg d-none d-xl-block">
					<div className="blur-box contact-box  position-absolute d-none d-xl-block top-0 end-0 "></div>
				</div>
				<div className="container my-5 pt-5 pb-3 ">
					<div className="row">
						<div className="col-lg-6 pt-3">
							<h1 className="my-2">Get In Touch</h1>
							<p className="text-secondary mb-5">
								We’re Here to Help Whether you have questions about our services, need assistance with your account, or
								want to learn more about Benii.
							</p>
							<div className="pt-2">
								<div className="d-flex align-items-center my-4 gap-2 bg-white-30 contact-info-bullet-shadow p-3 round-10px">
									<i className="fa-solid fa-location-dot text-primary"></i>
									<div className="fs-20px fw-medium">631 Elgin ST. Celina, State 111111</div>
								</div>
								<div className="d-flex align-items-center my-4 gap-2 bg-white-30 contact-info-bullet-shadow p-3 round-10px">
									<i className="fa-regular fa-envelope text-primary"></i>
									<div className="fs-20px fw-medium">email@example.com</div>
								</div>
								<div className="d-flex align-items-center my-4 gap-2 bg-white-30 contact-info-bullet-shadow p-3 round-10px">
									<i className="fa-solid fa-phone text-primary"></i>
									<div className="fs-20px fw-medium">+1 234 567 890</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="bg-white-30  p-0 round-10px px-2 py-4 contact-form-shadow  ">
								<div className="fw-medium text-primary px-2 pb-1">Contact Form</div>
								<h1 className="fw-medium  px-2">Fill Out the Form</h1>
								<form className="row   m-0">
									<div className="col-12">
										<div className="row my-3 ">
											<div className="col-md-12 text-black ">
												<div className="fs-18px mb-2 ">Name*</div>
												<input
													type="text"
													className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-bg-white"
													placeholder="First Name"
													name="Name"
												/>
											</div>
										</div>
										<div className="row my-2 pt-2">
											<div className="col-md-6 text-black ">
												<div className="fs-18px mb-2 ">Number*</div>
												<div className="w-100 d-flex position-relative align-items-center">
													<input
														type="number"
														className="w-100 rounded-3 border  border-2  border-grey py-2 px-3 bg-bg-white "
														placeholder="+1 (547) 546 768"
														name="phone"
													/>
												</div>
											</div>
											<div className="col-md-6 text-black ">
												<div className="fs-18px mb-2 ">Email*</div>
												<div className="w-100 d-flex position-relative align-items-center">
													<input
														type="email"
														className="w-100 rounded-3 border  border-2  border-grey py-2 px-3 bg-bg-white "
														placeholder="email@example.com"
														name="email"
													/>
												</div>
											</div>
										</div>
										<div className="row my-2 pt-2">
											<div className="col-md-12 text-black ">
												<div className="fs-18px mb-2 ">Message</div>
												<div className="w-100 d-flex position-relative align-items-center">
													<textarea
														name="message"
														rows="7"
														cols="50"
														className="w-100 rounded-3 border  border-2  border-grey py-2 px-3 bg-bg-white "
													></textarea>
												</div>
											</div>
										</div>
										<div className="row my-4 mb-4">
											<div className="col-12 d-flex align-items-center justify-content-start ">
												<button type="submit" className="btn btn-primary   rounded-3 py-2 px-5">
													Submit
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>

				<div className="container py-5 my-5 ">
					<div className="helpline-bg pt-2 rounded-3 position-relative px-3 px-sm-5 px-lg-0 ">
						<div className="blur-box position-absolute  "></div>
						<div className="row pt-5 flex-column-reverse flex-lg-row">
							<div className="col-lg-6">
								<div className="d-flex align-items-start justify-content-center flex-column px-3 px-lg-5 h-100">
									<h1 className="text-white my-2 ">Get Helpline Services with one Call Away</h1>
									<a href="tel:123 456 789" className="text-primary-dark text-decoration-none fs-1 my-2">
										<i className="fa-solid fa-phone"></i> +123 456 789
									</a>
									<p className="text-white my-2">We are available for your help 24/7</p>
								</div>
							</div>
							<div className="col-lg-6">
								<img src="/assets/images/helpline-service.png" alt="" className="img-fluid" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
