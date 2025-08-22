import { InputSwitch } from "primereact/inputswitch";

const CouponCard = (props) => {
	return (
		<div className="col-md-6 col-lg-12 col-xl-4">
			<div className="card shadow-sm  mb-6 mb-xl-9">
				<div id="kt_docs_card_collapsible" className="collapse show">
					<div className="card-body">
						<div className="text-center px-4">
							<img className="mw-100 mh-300px card-rounded-bottom" alt="golden" src="assets/pp2.png" />
						</div>
					</div>
					<div className="card-header justify-content-center bg-white">
						<div className="mt-5 fs-2">Coupon Code : {props.couponCode} </div>
					</div>
					<div className="card-header justify-content-center bg-white">
						<div className="mt-5 fs-2">Discount : {props.discount} </div>
					</div>
					<div className="card-header justify-content-center bg-white">
						<div className="mt-5 fs-2">Valid Till : {props.valid} </div>
					</div>
					<div className="card-header justify-content-center bg-white">
						<div className="mt-5 fs-2">Coupon Type : {props.couponType} </div>
					</div>
					<div className="card-header justify-content-center bg-white">
						<div className="form-check form-switch form-check-custom form-check-solid pb-3 justify-content-center">
							<InputSwitch />
							<span className="ms-2">Active / Inactive</span>
						</div>
					</div>
					<div className="card-footer">
						<div className="dropup">
							<button
								className="btn btn-icon dropdown-btn w-100"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
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
								data-popper-placement="top-end"
							>
								<div className="menu-item px-3">
									<div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">Actions</div>
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
										className="btn btn-light-danger float-end fw-bolder mb-3 w-100"
									>
										<span className="bi bi-trash-fill svg-icon svg-icon-5  me-1" />
										Delete
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CouponCard;
