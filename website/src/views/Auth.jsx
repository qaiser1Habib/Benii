import RegisterCard from "../styles/cards/RegisterCard";

const Auth = () => {
	return (
		<div className="fade-in">
			<div className="positon-relative">
				<div className="about-page-blur-bg d-none d-xl-block ">
					<div className="blur-box position-absolute"></div>
				</div>
				<div className="all-blur-bg d-none d-xl-block">
					<div className="blur-box resource-box position-absolute d-none d-xl-block top-0 end-0 "></div>
				</div>
				<div className="container pt-0 my-5 pb-0 ">
					<div className="text-center">
						<img src="/assets/images/benii-logo.png" alt="" className="img-fluid auth-main-image" />
						<div className="px-xl-5">
							<div className="px-xl-5">
								<div className="px-xl-5">
									<div className="px-xl-5">
										<div className="px-xl-5">
											<div className="px-xl-5">
												<div className="px-xl-5">
													<div className="px-xl-5">
														<div className="px-xl-5 text-center">
															Empowering mental wellness through personalized care and evidence-based therapies.
															Take the first step towards a brighter future with us.
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row mt-3 py-4 pb-5 justify-content-center">
							<div className="col-lg-8 col-xl-6 px-5 my-xl-0 my-2">
								<RegisterCard
									title="Therapist"
									icon="fa-user-doctor"
									desc="Join our dedicated team of mental health professionals! By registering as a therapist with Benii"
									registrationType="therapist"
								/>
							</div>
							<div className="col-lg-8 col-xl-6 px-5 my-xl-0 my-2">
								<RegisterCard
									title="User"
									icon="fa-user"
									desc="Take the first step toward better mental health! By registering as a user on Benii, you’ll gain access to personalized support."
									registrationType="user"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
