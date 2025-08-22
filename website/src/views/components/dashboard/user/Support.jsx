import { Link } from "react-router-dom";

const Support = () => {
	return (
		<div className=" bg-white-50 round-10px fade-in dashboard-card-shadow p-2 py-4 p-md-5 h-100">
			<div className="row bt-3 align-items-center">
				<div className="col-xl-6 px-3">
					<h1 className="my-2 fs-36px">Get In Touch</h1>
					<p className="text-secondary mb-5">
						We’re Here to Help Whether you have questions about our services, need assistance with your account, or want to
						learn more about Benii.
					</p>
				</div>
				<div className="col-xl-6">
					<div className="pt-2">
						<div className="d-flex align-items-center my-4 gap-2 support-pill-bg contact-info-bullet-shadow p-3 round-10px">
							<i className="fa-solid fa-location-dot text-primary"></i>
							<div className="fs-20px fw-medium">631 Elgin ST. Celina, State 111111</div>
						</div>
						<div className="d-flex align-items-center my-4 gap-2 support-pill-bg contact-info-bullet-shadow p-3 round-10px">
							<i className="fa-regular fa-envelope text-primary"></i>
							<div className="fs-20px fw-medium">email@example.com</div>
						</div>
						<div className="d-flex align-items-center my-4 gap-2 support-pill-bg contact-info-bullet-shadow p-3 round-10px">
							<i className="fa-solid fa-phone text-primary"></i>
							<div className="fs-20px fw-medium">+1 234 567 890</div>
						</div>
					</div>
				</div>
			</div>
			<h2 className="fs-30px fw-medium mb-0 ps-2 mt-2">Help & Support</h2>
			<p className="fs-20px fw-medium mb-3 ps-2 mt-2 text-secondary-dark">
				Get assistance and find answers to your questions with our comprehensive help and support resources.
			</p>

			<form className="row w-100  m-0">
				<div className="col-12">
					<div className="row my-3 ">
						<div className="col-md-12 text-black ">
							<div className="fs-18px mb-2 ">Name*</div>
							<input
								type="text"
								className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
								placeholder="First Name"
								name="Name"
							/>
						</div>
					</div>
					<div className="row my-2 pt-2">
						<div className="col-md-6 text-black ">
							<div className="fs-18px mb-2 ">Phone*</div>
							<div className="w-100 d-flex position-relative align-items-center">
								<input
									type="tel"
									className="w-100 rounded-3 border  border-2  border-grey py-2 px-3 bg-white "
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
									className="w-100 rounded-3 border  border-2  border-grey py-2 px-3 bg-white "
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
									className="w-100 rounded-3 border  border-2  border-grey py-2 px-3 bg-white resize-none"
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
	);
};

export default Support;
