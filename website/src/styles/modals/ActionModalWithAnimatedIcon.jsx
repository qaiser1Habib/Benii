import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { LottieIcon } from "../icons/LottieIcon";
import { Link } from "react-router-dom";

const ActionModalWithAnimatedIcon = (props) => {
	return (
		<Modal
			show={props?.isOpen}
			onHide={() => props?.setIsOpen(false)}
			aria-labelledby="contained-modal-title-vcenter"
			size="md"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title className="text-dark">{props?.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row justify-content-center mb-2 ">
					<div className="col-12 d-flex flex-column">
						<div className={"mx-auto"}>
							<LottieIcon iconType={props?.icon} style={{ width: "150px", height: "150px" }} />
						</div>
						<h3 className="text-start text-center">{props?.heading}</h3>
					</div>
					<div>
						<label className="fs-6 text-center">{props?.description}</label>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer className={`d-flex justify-content-${props?.closeBtn ? "between" : "center"}`}>
				{props?.closeBtn && (
					<Button variant="delete" onClick={() => props?.setIsOpen(false)}>
						Close
					</Button>
				)}
				{props?.userInfo?._id ? (
					props?.handleSubmit ? (
						<Button onClick={props.handleSubmit} disabled={props?.isSubmittingRequest}>
							{props?.title}
						</Button>
					) : (
						<Button>
							<>
								<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
								Processing...
							</>
						</Button>
					)
				) : (
					<Link to="/auth" className="btn btn-primary  py-2 px-5 text-capitalize">
						Log In
					</Link>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default ActionModalWithAnimatedIcon;
