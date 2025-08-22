import { useEffect, useState } from "react";
import BreadCrumb from "./partials/BreadCrumb";
import PlainDataTable from "../styles/dataTables/PlainDataTable";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../store/hooks/useToast";
import ProcessingModal from "../styles/modals/ProcessingModal";
import {
	createSubscriptionFeature,
	deleteSubscriptionFeature,
	getSubscriptionFeatures,
	updateSubscriptionFeature,
} from "../actions/subscriptionFeatures";
import { getSubscriptions } from "../actions/subscriptions";
import { handleFormDataInput } from "../utils/helpers";
import useDeleteWithConfirmation from "../store/hooks/useDeleteWithConfirmation";

const PlanFeatures = () => {
	const [formData, setFormData] = useState();
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

	const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
	const [processingStatus, setProcessingStatus] = useState("");
	const [showProgressModal, setShowProgressModal] = useState(false);
	const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);

	const subscriptionFeatures = useSelector((state) => state?.subscriptionFeatures?.all || []);
	const deleteWithConfirmation = useDeleteWithConfirmation();

	const page = 1;
	const limit = 100;

	const dispatch = useDispatch();
	const { notify } = useToast();

	useEffect(() => {
		dispatch(getSubscriptionFeatures({ formData: { page: page, limit: limit }, notify }));
		dispatch(getSubscriptions({ formData: { page: page, limit: limit }, notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddUpdateButton = (item) => {
		setFormData(item?._id ? subscriptionFeatures?.find((subscriptionFeature) => subscriptionFeature?._id === item?._id) : null);
		setIsUpdatingRecord(item?._id ? true : false);

		setShowAddUpdateModal(true);
	};

	const handleDeleteItemButton = (item) => {
		deleteWithConfirmation({
			deleteAction: deleteSubscriptionFeature,
			formData: { formData: { _id: item?._id }, notify },
		});
	};

	const handleSubmitSubscriptionFeatureForm = async () => {
		setIsSubmittingRequest(true);
		setShowProgressModal(true);

		if (isUpdatingRecord) {
			await dispatch(
				updateSubscriptionFeature({
					formData: formData,
					notify,
					uploadProgress: (progressEvent) => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						if (percentCompleted === 100) setProcessingStatus("Upload Successfully, Now Updating In Database");
						else setProcessingStatus(`Uploading ${percentCompleted.toFixed(0)}%`);
					},
				})
			).then(({ payload }) => {
				if (payload?._id) dispatch(getSubscriptionFeatures({ formData: { page: page, limit: limit }, notify }));
			});
		} else {
			await dispatch(
				createSubscriptionFeature({
					formData: formData,
					notify,
					uploadProgress: (progressEvent) => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						if (percentCompleted === 100) setProcessingStatus("Upload Successfully, Now Saving In Database");
						else setProcessingStatus(`Uploading ${percentCompleted.toFixed(0)}%`);
					},
				})
			).then(({ payload }) => {
				if (payload?._id) dispatch(getSubscriptionFeatures({ formData: { page: page, limit: limit }, notify }));
			});
		}

		setShowAddUpdateModal(false);
		setShowProgressModal(false);
		setIsSubmittingRequest(false);
		setProcessingStatus("");
	};

	return (
		<>
			<div className="fade-in">
				<BreadCrumb pageNames={["Plan Features"]} />

				<div className="container-xxl">
					<div className="row">
						<div className="d-flex flex-wrap flex-stack my-4">
							<div className="d-flex flex-wrap flex-stack">
								<div className="fw-bolder fs-4">Items</div>
								<span className="badge badge-square badge-success ms-2">
									{subscriptionFeatures?.length > 0 ? subscriptionFeatures?.length : "0"}
								</span>
							</div>
							<div className="d-flex flex-wrap my-1">
								<div className="row">
									<div className="col-12 me-5 d-flex justify-content-end">
										<ul className="nav nav-pills">
											<li className="me-4">
												<span>
													<button
														type="button"
														onClick={() => handleAddUpdateButton()}
														className="btn btn-icon py-2 btn-success py-2 fw-bolder w-100 px-4 btn-hover-scale ms-4"
													>
														<i className="las la-plus fs-2 me-1" />
														Add Plan Features
													</button>
												</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="row my-5">
						{subscriptionFeatures?.length > 0 && (
							<div className="col-12 my-5">
								<PlainDataTable
									data={subscriptionFeatures?.map((item) => ({
										...item,
										subscriptions: item?.subscriptions?.map((sub) => sub.title).join(", "),
									}))}
									edit={handleAddUpdateButton}
									delete={handleDeleteItemButton}
									fieldNamesToShow={["No", "Title"]}
									fieldsToShow={["#", "title"]}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			<Modal
				show={showAddUpdateModal}
				onHide={() => setShowAddUpdateModal(false)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter"> {isUpdatingRecord ? "Update" : "Add New "} Feature</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<>
						<div className="d-flex flex-column me-n7 pe-7 custom-modal">
							<div className="row">
								<div className="col-md-12  mb-7">
									<label className="required fw-bold fs-6 mb-2">Title *</label>
									<input
										type="text"
										name="title"
										className="form-control form-control-solid mb-3 mb-lg-0"
										placeholder="Plan Feature Name..."
										value={formData?.title || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>
							</div>
						</div>
					</>
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
						<button className="btn btn-success py-2 fw-bolder px-4" onClick={() => handleSubmitSubscriptionFeatureForm()}>
							{isSubmittingRequest ? (
								<>
									<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
									Processing...
								</>
							) : (
								"Submit"
							)}
						</button>
						<button type="button" className="btn btn-light" onClick={() => setShowAddUpdateModal(false)}>
							Close
						</button>
					</div>
				</Modal.Footer>
			</Modal>

			<ProcessingModal
				isOpen={showProgressModal}
				setIsOpen={setShowProgressModal}
				icon="processing"
				heading={isSubmittingRequest ? "Updating Plan Feature" : "Adding Plan Feature"}
				progress={processingStatus}
				handleSubmit={() => window.location.reload()}
				description="Please wait for the process to complete, do not close browser."
			/>
		</>
	);
};

export default PlanFeatures;
