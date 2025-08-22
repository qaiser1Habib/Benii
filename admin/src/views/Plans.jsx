import { useState, useEffect } from "react";
import BreadCrumb from "./partials/BreadCrumb";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { handleFormDataInput } from "../utils/helpers";
import { InputSwitch } from "primereact/inputswitch";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../store/hooks/useToast";
import ProcessingModal from "../styles/modals/ProcessingModal";
import { createSubscription, deleteSubscription, getSubscriptions, updateSubscription } from "../actions/subscriptions";
import { getSubscriptionFeatures, updateSubscriptionFeature } from "../actions/subscriptionFeatures";
import useDeleteWithConfirmation from "../store/hooks/useDeleteWithConfirmation";

const Plans = () => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const [formData, setFormData] = useState({});
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
	const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
	const [processingStatus, setProcessingStatus] = useState("");
	const [showProgressModal, setShowProgressModal] = useState(false);
	const [subscriptionFeatureIdsToUpdate, setSubscriptionFeatureIdsToUpdate] = useState([]);
	const [activePlanId, setActivePlanId] = useState(null); // Stores the active plan's ID

	const planDurationTypes = [
		{ label: "Month", value: "month" },
		{ label: "Year", value: "year" },
	];

	const subscriptions = useSelector((state) => state?.subscriptions?.all || []);
	const subscriptionFeatures = useSelector((state) => state?.subscriptionFeatures?.all || []);
	const deleteWithConfirmation = useDeleteWithConfirmation();

	const page = 1;
	const limit = 100;

	useEffect(() => {
		dispatch(getSubscriptions({ formData: { page: page, limit: limit }, notify }));
		dispatch(getSubscriptionFeatures({ formData: { page: page, limit: limit }, notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddUpdateButton = (item) => {
		setFormData(item?._id ? item : null);
		setIsUpdatingRecord(item?._id ? true : false);
		setSubscriptionFeatureIdsToUpdate(
			subscriptionFeatures
				.filter((subscriptionFeature) =>
					subscriptionFeature?.subscriptions.some((subscription) => subscription?._id === item?._id)
				)
				.map((subscriptionFeature) => subscriptionFeature?._id)
		);
		setShowAddUpdateModal(true);
		setActivePlanId(item?._id);
	};

	const handleUpdateSubscriptionPlan = async (e, featureID) => {
		e?.target?.value
			? setSubscriptionFeatureIdsToUpdate((prevState) => [...prevState, featureID])
			: setSubscriptionFeatureIdsToUpdate((prevState) => prevState.filter((item) => item !== featureID));
	};

	const handleSubmitSubscriptionForm = async () => {
		setIsSubmittingRequest(true);
		setShowProgressModal(true);

		if (isUpdatingRecord) {
			await dispatch(
				updateSubscription({
					formData: formData,
					notify,
					uploadProgress: (progressEvent) => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						if (percentCompleted === 100) setProcessingStatus("Updating Subscription in Database and Stripe");
						else setProcessingStatus(`Uploading ${percentCompleted.toFixed(0)}%`);
					},
				})
			).then(async () => {
				let subscriptionFeaturesExistingInCurrentSubscription = subscriptionFeatures
					.filter((subscriptionFeature) =>
						subscriptionFeature?.subscriptions.some((subscription) => subscription?._id === formData?._id)
					)
					.map((subscriptionFeature) => subscriptionFeature?._id);

				for (let subscriptionFeature of subscriptionFeatures) {
					if (
						subscriptionFeatureIdsToUpdate.includes(subscriptionFeature?._id) &&
						!subscriptionFeaturesExistingInCurrentSubscription.includes(subscriptionFeature?._id)
					) {
						// Add subscription ID to the subscriptions array
						await dispatch(
							updateSubscriptionFeature({
								formData: {
									...subscriptionFeature,
									subscriptions: [...subscriptionFeature.subscriptions, formData?._id],
								},
								notify,
								uploadProgress: (progressEvent) => {
									const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
									if (percentCompleted === 100) setProcessingStatus("Subscription Updated, Now Updating Features");
									else setProcessingStatus(`Uploading ${percentCompleted.toFixed(0)}%`);
								},
							})
						);
					} else if (
						!subscriptionFeatureIdsToUpdate.includes(subscriptionFeature?._id) &&
						subscriptionFeaturesExistingInCurrentSubscription.includes(subscriptionFeature?._id)
					) {
						// Remove subscription ID from the subscriptions array
						const updatedSubscriptions = subscriptionFeature.subscriptions.filter((sub) => sub._id !== formData?._id);
						await dispatch(
							updateSubscriptionFeature({
								formData: { ...subscriptionFeature, subscriptions: updatedSubscriptions },
								notify,
								uploadProgress: (progressEvent) => {
									const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
									if (percentCompleted === 100) setProcessingStatus("Subscription Updated, Now Updating Features");
									else setProcessingStatus(`Uploading ${percentCompleted.toFixed(0)}%`);
								},
							})
						);
					}
				}
			});
		} else {
			await dispatch(
				createSubscription({
					formData: { ...formData, payment: { ...formData.payment, type: "recurring" } },
					notify,
					uploadProgress: (progressEvent) => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						if (percentCompleted === 100) setProcessingStatus("Upload Successfully, Now Saving In Database");
						else setProcessingStatus(`Uploading ${percentCompleted.toFixed(0)}%`);
					},
				})
			);
		}

		await dispatch(getSubscriptions({ formData: { page: page, limit: limit }, notify }));
		await dispatch(getSubscriptionFeatures({ formData: { page: page, limit: limit }, notify }));

		setShowAddUpdateModal(false);
		setShowProgressModal(false);
		setIsSubmittingRequest(false);
		setIsUpdatingRecord(false);
		setProcessingStatus("");
	};

	const handleDeleteItemButton = (item) => {
		deleteWithConfirmation({
			deleteAction: deleteSubscription,
			formData: { formData: { _id: item?._id }, notify },
		});
	};

	return (
		<>
			<div className="fade-in">
				<BreadCrumb pageNames={["Plans"]} />

				<div className="container-xxl">
					<div className="row">
						<div className="d-flex flex-wrap flex-stack my-4">
							<div className="d-flex flex-wrap flex-stack">
								<div className="fw-bolder fs-4">Items</div>
								<span className="badge badge-square badge-success ms-2">
									{subscriptions?.length > 0 ? subscriptions?.length : "0"}
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
														Add New Plan
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
						{subscriptions?.length > 0 &&
							subscriptions.map((subscription, index) => (
								<div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12 d-flex mb-5" key={index}>
									<div className="py-8 px-4 bg-primary rounded-1 d-flex flex-column w-100 plan-card">
										<div className="mb-5 pb-5 border-bottom">
											<h1 className="text-white mb-2 text-center text-uppercase">{subscription?.title}</h1>
											<h3 className="text-white mb-2 text-center price-text">${subscription?.payment.price}</h3>
											<div className="w-full text-center">
												<span
													className="badge rounded-pill bg-light text-dark text-capitalize px-5"
													style={{ fontSize: "14px" }}
												>
													{subscription?.duration?.value} {subscription?.duration?.type}
												</span>
											</div>
										</div>
										<div className="row">
											<div className="col-lg-12 mb-3">
												<ul className="text-white px-0 py-2">
													{subscriptionFeatures?.length > 0 &&
														subscriptionFeatures.map((subscriptionFeature, index) => {
															const isSubscribed = subscriptionFeature?.subscriptions?.some(
																(item) => item?._id === subscription?._id
															);
															return (
																isSubscribed && (
																	<li className="d-flex align-items-start gap-2 mb-1" key={index}>
																		<i className="fa fa-check-circle  mt-1 text-white" />
																		{subscriptionFeature?.title}
																	</li>
																)
															);
														})}
												</ul>
											</div>
										</div>

										<div className="mt-auto d-flex justify-content-between gap-3">
											<button
												onClick={() => handleAddUpdateButton(subscription)}
												className="btn btn-icon plan-action-btn w-50"
											>
												<i className="fas fa-edit svg-icon svg-icon-5 me-1 text-white" />
												Edit
											</button>
											<button
												onClick={() => handleDeleteItemButton(subscription)}
												className="btn btn-icon plan-action-btn w-50"
											>
												<i className="bi bi-trash-fill svg-icon svg-icon-5 me-1 text-white" />
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
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
					<Modal.Title id="contained-modal-title-vcenter"> {isUpdatingRecord ? "Update" : "Add New "} Plan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<>
						<div className="d-flex flex-column me-n7 pe-7 custom-modal">
							<div className="row">
								<div className="col-md-6 mb-10">
									<label className="required fw-bold fs-6 mb-2">Plan Name *</label>
									<input
										type="text"
										name="title"
										className="form-control form-control-solid mb-3 mb-lg-0"
										placeholder="Title..."
										value={formData?.title || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>
								<div className="col-md-6  mb-10">
									<label className="required fw-bold fs-6 mb-2">Base Price *</label>
									<input
										type="text"
										name="payment.price"
										className="form-control form-control-solid mb-3 mb-lg-0"
										placeholder="0.00"
										value={formData?.payment?.price || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>
								<div className="col-md-12  mb-10">
									<label className=" required fw-bold fs-6 mb-2">Type *</label>
									<Select
										name="duration.type"
										required
										value={planDurationTypes.filter((item) => item.value === formData?.duration?.type)}
										onChange={(selectedOption) =>
											setFormData({
												...formData,
												duration: { ...formData.duration, type: selectedOption?.value },
											})
										}
										options={planDurationTypes}
									/>
								</div>
								<div className="col-md-12  mb-10">
									<label className=" required fw-bold fs-6 mb-3">Select Features *</label>
									<div className="row mb-6">
										{subscriptionFeatures?.length > 0 &&
											subscriptionFeatures.map((subscriptionFeature, index) => (
												<div className="col-lg-4 col-md-6 col-sm-12 d-flex mb-5" key={index}>
													<div className="w-100 h-100">
														<label
															className={`goal-card ${
																subscriptionFeatureIdsToUpdate?.includes(subscriptionFeature?._id) && "active"
															} ${
																formData?.features?.length &&
																formData?.features.includes(subscriptionFeature?._id) &&
																"active"
															} w-100 h-100 p-3 round-10px cursor-pointer`}
														>
															<div className="d-flex justify-content-between align-items-start">
																{isUpdatingRecord ? (
																	<InputSwitch
																		inputId={subscriptionFeature?._id}
																		checked={subscriptionFeatureIdsToUpdate?.includes(subscriptionFeature?._id)}
																		onChange={(e) => handleUpdateSubscriptionPlan(e, subscriptionFeature?._id)}
																	/>
																) : (
																	<InputSwitch
																		inputId={subscriptionFeature?._id}
																		checked={
																			formData?.features?.length &&
																			formData?.features.includes(subscriptionFeature?._id)
																		}
																		onChange={(e) => {
																			setFormData({
																				...formData,
																				features: e.target.value
																					? [...(formData?.features || []), subscriptionFeature?._id]
																					: (formData?.features || [])?.filter(
																							(item) => item !== subscriptionFeature?._id
																					  ),
																			});
																		}}
																	/>
																)}
															</div>
															<p className="fw-medium mb-0 mt-3" style={{ fontSize: "13px" }}>
																{subscriptionFeature?.title}
															</p>
														</label>
													</div>
												</div>
											))}
									</div>
								</div>
							</div>
						</div>
					</>
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
						<button className="btn btn-success py-2 fw-bolder px-4" onClick={() => handleSubmitSubscriptionForm()}>
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
				heading={isUpdatingRecord ? "Updating Subscription" : "Adding Subscription"}
				progress={processingStatus}
				handleSubmit={() => window.location.reload()}
				description="Please wait for the process to complete, do not close browser."
			/>
		</>
	);
};

export default Plans;
