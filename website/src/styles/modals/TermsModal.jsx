import Modal from "react-bootstrap/Modal";

const TermsModal = (props) => {
	return (
		<>
			<Modal
				show={props?.showModal}
				onHide={() => props?.setShowModal(false)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="text-dark">Terms & Conditions</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="my-3 overflow-y-auto" style={{ maxHeight: "500px" }}>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Introduction</h4>
							<p className="required fs-6 mb-2">
								Welcome to Benii! By using our app and services, you agree to comply with and be bound by the following
								terms and conditions. If you do not agree with these terms, please do not use our services.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Acceptance of Terms</h4>
							<p className="required fs-6 mb-2">
								By accessing or using Benii, you confirm that you accept these Terms & Conditions and agree to abide by
								them.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Use of Services</h4>
							<p className="required fs-6 mb-2">
								Benii provides AI-driven mental health support. You agree to use our services only for lawful purposes and
								in accordance with these terms.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">User Responsibilities</h4>
							<p className="required fs-6 mb-2">
								You are responsible for maintaining the confidentiality of your account information and for all activities
								that occur under your account.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Limitation of Liability</h4>
							<p className="required fs-6 mb-2">
								While we strive to provide accurate and helpful information, Benii is not a substitute for professional
								medical advice, diagnosis, or treatment. Always seek the advice of a qualified mental health professional.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Changes to Terms</h4>
							<p className="required fs-6 mb-2">
								We may update these terms from time to time. Any changes will be posted on this page, and your continued
								use of the service constitutes acceptance of those changes.
							</p>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex">
						<button type="button" className="btn modal-closeBtn" onClick={() => props?.setShowModal(false)}>
							Close
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default TermsModal;
