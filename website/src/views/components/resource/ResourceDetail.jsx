import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ImageLoader from "../../../styles/loaders/ImageLoader";
import { convertToDate } from "../../../utils/helpers";
import BreadCrumb from "../../partials/BreadCrumb";

const ResourceDetail = () => {
	const { state } = useLocation();
	const { payload } = state || {};
	const navigate = useNavigate();

	useEffect(() => {
		if (!payload) {
			navigate("/resources");
		}
	}, [payload, navigate]);

	if (!payload) return null;

	return (
		<div className="fade-in">
			<BreadCrumb title="Resource Detail" />
			<div className="container">
				<div className="row justify-content-center my-5 py-5">
					<div className="col-lg-10 col-xl-8 col-12">
						<div className="bg-transparent p-2 rounded-4 w-100">
							<div className="d-flex flex-column w-100">
								<div className="text-center mb-4">
									<div className="fw-semibold rounded-4 mb-2">{convertToDate(payload.updatedAt, "dd-MM-yyyy")}</div>
									<h5 className="card-title fw-semibold">{payload.title}</h5>
								</div>
								<ImageLoader
									src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
										payload.media?.filename
									}&mimetype=${payload.media?.mimetype}&width=500`}
									placeholderSrc={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
										payload.media?.filename
									}&mimetype=${payload.media?.mimetype}&width=100`}
									className="img-fluid rounded-4"
								/>
							</div>
							<div className="card-body mt-4">
								<div dangerouslySetInnerHTML={{ __html: payload.description }} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResourceDetail;
