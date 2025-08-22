import { useState } from "react";

const WebSettingCard = (props) => {
	const [image, setImage] = useState(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};
	return (
		<div className="col-lg-4 col-md-6 col-sm-12 d-flex flex-column ">
			<div className="card mb-5 mb-xl-10 h-100">
				<div className="card-body pt-9 pb-0 h-100 d-flex flex-column ">
					<ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
						<li className="nav-item mt-2">
							<a className="nav-link text-active-primary ms-0 me-10 py-5 active" href="#">
								{props.title}
							</a>
						</li>
					</ul>
					<form className="form mt-auto">
						<div className="card-body border-top p-9">
							<div className="row mb-6">
								<div className="col-lg-12">
									<div className="row justify-content-center">
										<div className="col-lg-10 mt-3">
											<div className="ms-5">
												<div className="d-flex justify-content-center">
													<div className="image-input image-input-outline">
														<div
															className="image-input-wrapper w-125px h-125px"
															style={{ backgroundImage: `url(${image ? image : "assets/users.png"})` }}
														/>
														<label
															className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
															data-kt-image-input-action="change"
															data-bs-toggle="tooltip"
															data-bs-original-title=""
															title=""
														>
															<i className="bi bi-pencil-fill fs-7" />
															<input
																type="file"
																onChange={handleImageChange}
																name="file"
																accept=".png, .jpg, .jpeg"
															/>
														</label>
														{image && (
															<span
																onClick={() => setImage(null)}
																className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
															>
																<i className="bi bi-x fs-2" />
															</span>
														)}
													</div>
												</div>
												<div className="form-text text-center">Upload your Header Logo Here!</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card-footer d-flex justify-content-center py-6 px-9">
							<button type="submit" id="submit_btn" className="btn btn-lg btn-primary mb-5 w-100" name="edit_user_profile">
								<span className="indicator-label">UPDATE {props.title}</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default WebSettingCard;
