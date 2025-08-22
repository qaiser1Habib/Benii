import { Link } from "react-router-dom";
import React from "react";

const DashboardInfoCard = React.memo((props) => {
	return (
		<div className="col-md-3">
			<div className="rounded-2 px-6 py-5" style={{ background: "#f2f0fb" }}>
				<div className="d-flex justify-content-between">
					<div className="symbol symbol-30px me-5 mb-8">
						<span className="symbol-label" style={{ background: "none" }}>
							<span className={`fs-2qx fa ${props?.icon}`} style={{ color: "#6f688d" }}></span>
						</span>
					</div>

					<div className="symbol me-5 mb-8">
						<span className="text-dark fw-boldest d-block fs-2qx lh-1 mb-1">{props?.count ? props?.count : "0"}</span>
					</div>
				</div>

				<div className=" mt-10">
					<span className="text-gray-700 fw-bold fs-2">
						<Link to={`/${props?.page}`} className="text-black">
							{props?.title}
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
});

DashboardInfoCard.displayName = "DashboardInfoCard";

export default DashboardInfoCard;
