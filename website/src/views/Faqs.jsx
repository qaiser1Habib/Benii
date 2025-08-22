import BreadCrumb from "./partials/BreadCrumb";

const Faqs = () => {
	return (
		<div className="fade-in">
			<BreadCrumb title="Faqs" />
			<div className="position-relative py-3">
				<div className="about-page-blur-bg d-none d-xl-block ">
					<div className="blur-box position-absolute"></div>
				</div>
				<div className="all-blur-bg d-none d-xl-block">
					<div className="blur-box  position-absolute d-none d-xl-block top-0 end-0 "></div>
				</div>
				<div className="container my-5 pt-5 pb-3">
					<div className="row">
						<div className="col-xl-6 my-3">
							<span className="fw-semibold text-primary ">FAQ&apos;s</span>
							<h1 className="pe-lg-5 mt-2" style={{ fontSize: "32px" }}>
								Didn't Get Your Answer? Send us your Question By Filling The Form Below
							</h1>
							<div className="bg-white-30  p-0 round-10px px-2 py-2 shadow mt-4">
								<form className="row w-100  m-0">
									<div className="col-12">
										<div className="row my-3 ">
											<div className="col-md-12 text-black ">
												<div className="fs-18px mb-2 ">Name*</div>
												<input
													type="text"
													className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
													placeholder="First Name"
													name="firstName"
												/>
											</div>
										</div>
										<div className="row my-2 pt-2">
											<div className="col-md-12 text-black ">
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
												<div className="fs-18px mb-2 ">Question</div>
												<div className="w-100 d-flex position-relative align-items-center">
													<textarea
														name="message"
														rows="5"
														cols="50"
														className="w-100 rounded-3 border  border-2  border-grey py-2 px-3 bg-white "
													></textarea>
												</div>
											</div>
										</div>
										<div className="row my-3 mb-5">
											<div className="col-12 d-flex align-items-center justify-content-start ">
												<button type="submit" className="btn btn-primary   rounded-3 py-2">
													Post Question
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-xl-6 px-4 my-3">
							<div className="accordion" id="accordionExample">
								<div className="accordion-item border-top-0 border-start-0 border-end-0 border-bottom-0 py-2 px-2 ">
									<h2 className="accordion-header ">
										<button
											className="accordion-button fs-20px fw-medium px-0"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseOne"
											aria-expanded="true"
											aria-controls="collapseOne"
										>
											How long will each therapy session last?
										</button>
									</h2>
									<div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
										<div className="accordion-body text-secondary px-0">
											Therapy sessions typically last between 45 to 60 minutes, although the duration may vary
											depending on your specific needs and the treatment modality being used.
										</div>
									</div>
								</div>
								<div className="accordion-item border border-secondary border-top-1 border-start-0 border-end-0 border-bottom-0 py-2 px-2">
									<h2 className="accordion-header">
										<button
											className="accordion-button collapsed fs-20px fw-medium px-0"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseTwo"
											aria-expanded="false"
											aria-controls="collapseTwo"
										>
											Are walk-in appointments available?
										</button>
									</h2>
									<div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
										<div className="accordion-body text-secondary px-0">
											Therapy sessions typically last between 45 to 60 minutes, although the duration may vary
											depending on your specific needs and the treatment modality being used.
										</div>
									</div>
								</div>
								<div className="accordion-item border border-secondary border-top-1 border-start-0 border-end-0 border-bottom-0 py-2 px-2">
									<h2 className="accordion-header">
										<button
											className="accordion-button collapsed fs-20px fw-medium px-0"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseThree"
											aria-expanded="false"
											aria-controls="collapseThree"
										>
											Do you accept insurance?
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse px-0"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body text-secondary px-0">
											Therapy sessions typically last between 45 to 60 minutes, although the duration may vary
											depending on your specific needs and the treatment modality being used.
										</div>
									</div>
								</div>
								<div className="accordion-item border border-secondary border-top-1 border-start-0 border-end-0 border-bottom-0 py-2 px-2">
									<h2 className="accordion-header">
										<button
											className="accordion-button collapsed fs-20px fw-medium px-0"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseFour"
											aria-expanded="false"
											aria-controls="collapseFour"
										>
											Do you offer telemedicine or virtual appointments?
										</button>
									</h2>
									<div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
										<div className="accordion-body text-secondary px-0">
											Therapy sessions typically last between 45 to 60 minutes, although the duration may vary
											depending on your specific needs and the treatment modality being used.
										</div>
									</div>
								</div>
								<div className="accordion-item border border-secondary border-top-1 border-start-0 border-end-0 border-bottom-0 py-2 px-2">
									<h2 className="accordion-header">
										<button
											className="accordion-button collapsed fs-20px fw-medium px-0"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseFive"
											aria-expanded="false"
											aria-controls="collapseFive"
										>
											Is parking available on-site for patients and visitors?
										</button>
									</h2>
									<div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
										<div className="accordion-body text-secondary px-0">
											Therapy sessions typically last between 45 to 60 minutes, although the duration may vary
											depending on your specific needs and the treatment modality being used.
										</div>
									</div>
								</div>
								<div className="accordion-item border border-secondary border-top-1 border-start-0 border-end-0 border-bottom-0 py-2 px-2">
									<h2 className="accordion-header">
										<button
											className="accordion-button collapsed fs-20px fw-medium px-0"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseSix"
											aria-expanded="false"
											aria-controls="collapseSix"
										>
											How can I access my medical records or request a copy of my health information?
										</button>
									</h2>
									<div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
										<div className="accordion-body text-secondary px-0">
											Therapy sessions typically last between 45 to 60 minutes, although the duration may vary
											depending on your specific needs and the treatment modality being used.
										</div>
									</div>
								</div>
								<div className="accordion-item border border-secondary border-top-1 border-start-0 border-end-0 border-bottom-0 py-2 px-2">
									<h2 className="accordion-header">
										<button
											className="accordion-button collapsed fs-20px fw-medium px-0"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseSeven"
											aria-expanded="false"
											aria-controls="collapseSeven"
										>
											How can I make an appointment in advance?
										</button>
									</h2>
									<div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
										<div className="accordion-body text-secondary px-0">
											Therapy sessions typically last between 45 to 60 minutes, although the duration may vary
											depending on your specific needs and the treatment modality being used.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Faqs;
