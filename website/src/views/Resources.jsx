import BreadCrumb from "./partials/BreadCrumb";
import Blogs from "./Blogs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../store/hooks/useToast";
import { getResources } from "../actions/resources";
import { convertToDate } from "../utils/helpers";
import { Link } from "react-router-dom";
import ImageLoader from "../styles/loaders/ImageLoader";

const Resources = () => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const resources = useSelector((state) => state.resources?.all || []);
	const page = 1;
	const limit = 100;
	useEffect(() => {
		dispatch(getResources({ formData: { page: page, limit: limit }, notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="fade-in">
			<BreadCrumb title="Resources" />
			<div className="mt-5 ">
				<div className="about-page-blur-bg d-none d-xl-block ">
					<div className="blur-box resource-box position-absolute"></div>
				</div>
				<div className="all-blur-bg d-none d-xl-block">
					<div className="blur-box resource-box position-absolute d-none d-xl-block "></div>
				</div>
				<div className="container my-5 py-5">
					<div>
						<span className="fw-semibold fs-18px text-primary">Self-Help Resources</span>
						<h1 className="my-2">Empower Yourself with Practical Strategies & Support</h1>
					</div>
					<div className="row pt-5">
						{resources?.length > 0 ? (
							resources.map(
								(resource, index) =>
									resource?.isActive && (
										<div className="col-md-6 col-xl-4 my-4" key={index}>
											<div
												className="position-relative overflow-hidden rounded-2 resource-card"
												style={{ minHeight: "400px" }}
											>
												<img
													src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
														resource?.media?.filename
													}&mimetype=${resource?.media?.mimetype}&width=500`}
													placeholderSrc={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
														resource?.media?.filename
													}&mimetype=${resource?.media?.mimetype}&width=100`}
													alt="Resource"
													className="w-100 h-100 object-fit-cover position-absolute"
												/>
												<div className="resource-img-overlay position-absolute w-100 h-100" />
												<div className="resource-img-card-text position-absolute w-100 h-100">
													<div className="bg-primary h-100 py-4 px-3 resource-simple-card">
														<span className="fw-semibold text-white">
															{convertToDate(resource?.updatedAt, "dd-MM-yyyy")}
														</span>
														<div className="w-100 mt-5 pt-3">
															<h5 className="fw-semibold text-white truncate">{resource?.title}</h5>
															<div
																className="text-white mb-0 mt-3 fw-normal"
																dangerouslySetInnerHTML={{ __html: resource?.description?.slice(0, 200) + "..." }}
															/>
															<div className="d-flex justify-content-between align-items-center">
																<Link
																	to="/resource-detail"
																	state={{ payload: resource }}
																	className="text-decoration-none fw-semibold resource-btn"
																>
																	Read Resource
																</Link>
															</div>
														</div>
													</div>
												</div>
												<div className="card-date fw-semibold position-absolute rounded-3 shadow-sm py-2">
													{convertToDate(resource?.updatedAt, "dd-MM-yyyy")}
												</div>
												<div className="card-resource-title position-absolute rounded-4 overflow-hidden">
													<h3 className="fw-medium fs-20px truncate w-100 mb-0">{resource?.title}</h3>
												</div>
											</div>
										</div>
									)
							)
						) : (
							<>No Resources Found</>
						)}
					</div>
				</div>
				<div className="mb-5">
					<Blogs />
				</div>
			</div>
		</div>
	);
};

export default Resources;
