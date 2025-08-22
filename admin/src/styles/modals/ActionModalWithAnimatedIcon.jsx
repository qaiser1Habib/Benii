import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { LottieIcon } from "../icons/LottieIcon";

const ActionModalWithAnimatedIcon = (props) => {
	return (
		<Modal
			show={props?.showModal}
			onHide={() => props?.setShowModal(false)}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header className="bg-danger" closeButton>
				<Modal.Title className="text-white ">{props?.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row justify-content-center mb-2">
					<div className="col-12 d-flex flex-column">
						<div className={"mx-auto "}>
							<LottieIcon iconType={props?.icon} style={{ width: "150px", height: "150px" }} />
						</div>
						<h3 className="text-start">{props?.heading}</h3>
					</div>
					<div>
						<label className="required fw-bold fs-6">{props?.description}</label>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => props?.setShowModal(false)}>
					Close
				</Button>
				<Button onClick={props?.handleSubmit} variant="delete py-2 px-3">
					{props?.title}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ActionModalWithAnimatedIcon;
