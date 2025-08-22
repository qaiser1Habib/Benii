import React from "react";
import { LottieIcon } from "../icons/LottieIcon";
import Modal from "react-bootstrap/Modal";

const DeleteModal = React.memo((props) => {
	return (
		<>
			<Modal
				show={props?.showModal}
				onHide={() => props?.setShowModal(false)}
				size="mb"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						<h5 className="modal-title">Are You sure?</h5>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="px-0">
					<div className="d-flex flex-column  text-center">
						<div className="row justify-content-center">
							<LottieIcon iconType="delete" style={{ width: "170px", height: "150px" }} />
						</div>

						<div className="fv-row mb-3">
							<h2 className="required fw-bold fs-5 mb-5">Do you really want to delete this Record?</h2>
							<div className="mx-lg-4">
								<div className="card px-1 py-2 rounded-4">
									<div className="mt-2 mb-3">
										<i className="fa-solid fa-circle-info" style={{ color: "#DC3545", fontSize: "70px" }}></i>
									</div>
									<p className="required" style={{fontSize:"14px"}}>
										Deleting this is a permanent action and cannot be undone. All associated data will also be
										permanently deleted.
									</p>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
						<button
							className="btn btn-danger ms-10"
							onClick={() => props?.handleDelete()}
							disabled={props?.isSubmittingRequest}
						>
							<span className="indicator-label text-white">Submit</span>
						</button>
						<button type="button" className="btn modal-closeBtn" onClick={() => props?.setShowModal(false)}>
							Close
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
});

DeleteModal.displayName = "DeleteModal";

export default DeleteModal;
