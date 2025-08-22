import { Link } from "react-router-dom";

const PlanFeatureCard = (props) => {
	return (
		<div className="col-lg-3 col-md-6 col-sm-12">
			<div className="card shadow-sm mb-6 mb-xl-9 w-100 p-8">
				<div className="text-center mb-2">
					<img
						className="pt-3"
						alt={props.title}
						src="assets//media/folder.png"
						data-kt-menu-trigger="click"
						data-kt-menu-placement="bottom-end"
					/>
				</div>
				<div className="card-body py-3 px-3">
					<h2 className="mb-5">
						<Link to={props.page}>{props.title}</Link>
					</h2>
					<div className="d-flex justify-content-between text-capitalize my-3">
						<h4>Type</h4>
						<h4>Feature</h4>
					</div>
					<div className="d-flex justify-content-between text-capitalize">
						<h4>Status</h4>
						<h5 className={`text-end ${props.status === "active" ? "active-badge" : "active-badge_red"}`}>
							{props.status}
						</h5>
					</div>
				</div>

				<div className="card-footer  py-3 px-4 flex w-100 text-start">
					<div className="dropup">
						<button
							className="btn btn-icon dropdown-btn w-100"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false">
							<span className="svg-icon svg-icon-2 me-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
									<g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
										<rect x={5} y={5} width={5} height={5} rx={1} fill="#000000" />
										<rect x={14} y={5} width={5} height={5} rx={1} fill="#000000" opacity="0.3" />
										<rect x={5} y={14} width={5} height={5} rx={1} fill="#000000" opacity="0.3" />
										<rect x={14} y={14} width={5} height={5} rx={1} fill="#000000" opacity="0.3" />
									</g>
								</svg>
							</span>
							Actions
						</button>
						<div
							className=" dropdown-menu   menu-rounded menu-gray-800 fw-bold w-200px py-3"
							data-kt-menu="true"
							style={{
								zIndex: 105,
								position: "fixed",
								inset: "auto 0px 0px auto",
								margin: 0,
								transform: "translate3d(-906px, -252px, 0px)",
							}}
							data-popper-placement="top-end">
							<div className="menu-item px-3">
								<div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Actions</div>
							</div>

							<div className="menu-item px-3">
								<Link to={props.page} className="btn btn-light-primary fw-bolder mb-3 w-100">
									<i className="fas fa-eye svg-icon svg-icon-5  me-1" />
									View
								</Link>
							</div>
							<div className="menu-item px-3">
								<a onClick={() => props.editModal(true)} className="btn btn-light-primary fw-bolder mb-3 w-100">
									<i className="fas fa-edit svg-icon svg-icon-5  me-1" />
									Edit
								</a>
							</div>

							<div className="menu-item px-3">
								<a
									onClick={() => props.setShowDeleteModal(true)}
									className="btn btn-light-danger float-end fw-bolder mb-3 w-100">
									<span className="bi bi-trash-fill svg-icon svg-icon-5  me-1" />
									Delete
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlanFeatureCard;
