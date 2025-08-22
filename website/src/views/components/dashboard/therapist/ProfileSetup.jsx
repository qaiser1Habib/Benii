import { FaEdit } from "react-icons/fa";

const ProfileSetup = () => {
	return (
		<div className="container">
			<div className="row my-5 pt-5">
				<div className="col-12  p-0">
					<div className=" bg-white-50 round-10px dashboard-card-shadow p-2 py-5 p-md-5 h-100">
						<h2 className="fs-36px fw-medium mb-0 ps-2 mt-2 text-center">Complete Your Profile</h2>
						<h3 className="fs-26px fw-medium mb-3 ps-2 mt-4 text-primary text-decoration-underline text-center">
							Professional Information
						</h3>

						<form className="row   m-0">
							<div className="col-12">
								<div className="row my-3 ">
									<div className="col-md-12 text-black py-3 mb-2">
										<div className="row align-items-center">
											<div className="col-12  d-flex justify-content-center">
												<div className="d-flex align-items-center flex-column">
													<img src="/assets/images/profile-pic.png" alt="" width={137} />
													<p className="text-secondary mt-2">
														Upload your Picture Here! {""}
														<FaEdit className="cursor-pointer" />
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 text-black my-2">
										<div className="row align-items-center justify-content-center ">
											<div className="   col-12   col-xl-10 col-xxl-10">
												<div className="row justify-content-center">
													<div className="col-md-6 my-2">
														<label htmlFor="professional" className="mb-2 ms-2">
															Professional*
														</label>{" "}
														<input
															type="text"
															className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
															placeholder=" Profession"
															name="professional"
															id="professional"
														/>
													</div>
													<div className="col-md-6 my-2">
														<label htmlFor="qualification" className="mb-2 ms-2">
															Qualification*
														</label>
														<input
															type="text"
															className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
															placeholder="Qualification"
															name="qualification"
															id="qualification"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 text-black my-2">
										<div className="row align-items-center justify-content-center ">
											<div className="   col-12   col-xl-10 col-xxl-10">
												<div className="row">
													<div className="col-md-6 my-2">
														<label htmlFor="experience" className="mb-2 ms-2">
															Experience*
														</label>{" "}
														<input
															type="text"
															className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
															placeholder="Experience"
															name="experience"
															id="experience"
														/>
													</div>
													<div className="col-md-6 my-2">
														<label htmlFor="practice" className="mb-2 ms-2">
															Practice*
														</label>
														<input
															type="text"
															className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
															placeholder="Practice"
															name="practice"
															id="practice"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 text-black my-3">
										<div className="row align-items-center justify-content-center ">
											<div className="   col-12   col-xl-10 col-xxl-10">
												<div className="row">
													<div className="col-md-6 col-xl-4 my-2">
														<label htmlFor="session" className="mb-2 ms-2">
															Session*
														</label>{" "}
														<input
															type="text"
															className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
															placeholder="Session"
															name="session"
															id="session"
														/>
													</div>
													<div className="col-md-6 col-xl-4 my-2">
														<label htmlFor="client" className="mb-2 ms-2">
															Client*
														</label>

														<select
															name="client"
															id="client"
															className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white outline-none text-secondary"
														>
															<option value="Clients">Clients</option>
															<option value="Client">Client</option>
														</select>
													</div>
													<div className="col-md-6 col-xl-4 my-2">
														<label htmlFor="approached" className="mb-2 ms-2">
															Therapeutic Approaches*
														</label>
														<select
															name="approached"
															id="approached"
															className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white outline-none text-secondary"
														>
															<option value="Clients">approached</option>
															<option value="Client">approached</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 text-black my-2">
										<div className="row align-items-center justify-content-center">
											<div className="col-xxl-10 ">
												<label htmlFor="bio" className="mb-2 ms-2">
													Bio
												</label>{" "}
												<textarea
													name="bio"
													id="bio"
													rows={6}
													className="w-100 resize-none rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
												></textarea>
											</div>
										</div>
									</div>
								</div>
								<div className=" text-center mt-4 mb-5">
									<button type="submit" className="btn btn-primary    py-2 px-4">
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSetup;
