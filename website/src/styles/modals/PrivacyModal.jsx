import Modal from "react-bootstrap/Modal";

const PrivacyModal = (props) => {
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
					<Modal.Title className="text-dark">Privacy Policy</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="my-3 overflow-y-auto" style={{ maxHeight: "500px" }}>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Introduction</h4>
							<p className="required fs-6 mb-2">
								At Benii, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your
								personal information.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Information We Collect</h4>
							<p className="required fs-6 mb-2">
								We may collect personal information that you provide directly, such as your name, email address, and any
								information shared during your interactions with Benii.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Data Security</h4>
							<p className="required fs-6 mb-2">
								We take reasonable measures to protect your information from unauthorized access, alteration, disclosure,
								or destruction. However, no method of transmission over the internet is 100% secure.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Sharing Your Information</h4>
							<p className="required fs-6 mb-2">
								We do not sell or rent your personal information to third parties. We may share your information only with
								trusted partners to help us operate our services, provided they agree to keep your information
								confidential.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Your Rights</h4>
							<p className="required fs-6 mb-2">
								You have the right to access, correct, or delete your personal information. You can also opt out of
								receiving promotional communications at any time.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Changes to This Policy</h4>
							<p className="required fs-6 mb-2">
								We may update this Privacy Policy periodically. Any changes will be posted on this page, and your
								continued use of our services signifies your acceptance of those changes.
							</p>
						</div>
						<div className="fv-row mb-5">
							<h4 className="required fw-bold fs-5 mb-2">Contact Us</h4>
							<p className="required fs-6 mb-2">
								If you have any questions about our Terms & Conditions or Privacy Policy, please contact us
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

export default PrivacyModal;
