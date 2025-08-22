import { useEffect, useState } from "react";
import PlainDataTable from "../../../../styles/PlainDataTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createClientByTherapist, removeClientByTherapist } from "../../../../actions/clients.js";
import { getUser, updateUser } from "../../../../actions/users";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../../store/hooks/useToast";
import { getQuestions } from "../../../../actions/questions.js";
import { handleFormDataInput } from "../../../../utils/helpers.js";
import useDeleteWithConfirmation from "../../../../store/hooks/useDeleteWithConfirmation.js";

const Client = () => {
	const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
	const [formData, setFormData] = useState();
	const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const dispatch = useDispatch();
	const { notify } = useToast();
	const deleteWithConfirmation = useDeleteWithConfirmation();

	const page = 1;
	const limit = 100;

	const questions = useSelector((state) => state?.questions?.all || []);
	const user = useSelector((state) => state?.users?.loggedInUserInfo);
	const clients = user?.therapist?.clients;
	const therapistInvites = user?.therapist?.invites;

	const clientsData = [
		...(clients || []).map((client) => ({
			...client.clientID,
			type: "client",
			activityStatus: client.activityStatus,
		})),
		...(therapistInvites || []).map((invite) => ({
			...invite,
			type: "invite",
			activityStatus: invite.activityStatus,
		})),
	];

	useEffect(() => {
		dispatch(getQuestions({ formData: { page: page, limit: limit }, notify }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmitClientForm = async (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);
		if (isUpdatingRecord) {
			await dispatch(
				updateUser({
					formData: formData,
					notify,
				})
			).then(() => dispatch(getUser(notify)));
		} else {
			await dispatch(
				createClientByTherapist({
					formData: formData,
					notify,
				})
			).then(() => dispatch(getUser(notify)));
		}
		setShowAddUpdateModal(false);
		setIsSubmittingRequest(false);
		setIsUpdatingRecord(false);
	};

	const handleAddUpdateButton = (item) => {
		setFormData(item?._id ? item : {});
		setIsUpdatingRecord(item?._id ? true : false);
		setShowAddUpdateModal(true);
	};

	const handleDeleteItemButton = (item) => {
		deleteWithConfirmation({
			deleteAction: removeClientByTherapist,
			formData: { formData: { _id: item?._id, email: item?.email ? item?.email : null }, notify },
			afterDeleteAction: getUser,
			afterDeleteActionPayload: { notify },
		});
	};

	const handleUpdateActiveStatus = (e, item) => {
		setIsSubmittingRequest(true);
		setIsUpdatingRecord(true);
		setFormData(item);
		dispatch(updateUser({ formData: { ...item, isActive: e.target.checked }, notify })).then(() => dispatch(getUser(notify)));
		setIsUpdatingRecord(false);
		setIsSubmittingRequest(false);
	};

	const handleViewButton = (item) => {
		setFormData(item);
		setShowViewModal(true);
	};

	const handleQuestionsInput = (e, setFormData) => {
		const { name, value } = e.target;
		const [, questionID] = name.split(".");

		setFormData((prevFormData) => {
			const existingDetails = prevFormData.clientAdditionalDetail || [];

			if (isUpdatingRecord) {
				const updatedDetails = existingDetails.map((detail) =>
					detail.questionID?._id === questionID ? { ...detail, answer: value } : detail
				);

				if (!updatedDetails.some((detail) => detail.questionID?._id === questionID)) {
					updatedDetails.push({ questionID, answer: value });
				}

				return {
					...prevFormData,
					clientAdditionalDetail: updatedDetails,
				};
			} else {
				const updatedDetails = existingDetails.map((detail) =>
					detail.questionID === questionID ? { ...detail, answer: value } : detail
				);

				if (!updatedDetails.some((detail) => detail.questionID === questionID)) {
					updatedDetails.push({ questionID, answer: value });
				}

				return {
					...prevFormData,
					clientAdditionalDetail: updatedDetails,
				};
			}
		});
	};

	return (
		<>
			<div className=" bg-white  bg-opacity-75 round-10px fade-in dashboard-card-shadow p-5 h-100">
				<h2 className="fs-36px fw-medium mb-3 ps-0 mt-2">Clients</h2>
				<div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
					<div className="d-flex align-items-center gap-2">
						<p className="fs-20px fw-medium mb-2 ps-0 mt-2 text-secondary">All Clients</p>
						<div className="bg-primary px-2 py-1 text-white round-5px fs-16px">
							<div className="px-1">{clientsData?.length > 0 ? clientsData?.length : "0"}</div>
						</div>
					</div>
					<button className="btn btn-primary py-2 bg-primary" onClick={() => handleAddUpdateButton()}>
						+ New Client
					</button>
				</div>
				<PlainDataTable
					delete={handleDeleteItemButton}
					edit={handleAddUpdateButton}
					view={handleViewButton}
					data={clientsData?.length ? clientsData : []}
					handleSwitch={handleUpdateActiveStatus}
					fieldNamesToShow={["First Name", "Last Name", "Email", "Phone", "Access", "Status"]}
					fieldsToShow={["about.firstName", "about.lastName", "email", "about.phone", "isActive", "activityStatus"]}
				/>
			</div>

			<Modal
				show={showAddUpdateModal}
				onHide={() => setShowAddUpdateModal(false)}
				aria-labelledby="contained-modal-title-vcenter"
				size="lg"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="text-dark">{isUpdatingRecord ? "Update" : "Create New"} Client</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmitClientForm}>
					<Modal.Body>
						<div className="w-100 p-2 " style={{ maxHeight: "60vh", overflowY: "auto" }}>
							<div style={{ maxWidth: "98%" }}>
								<p className="fs-6 fw-bold text-light-gray">
									{isUpdatingRecord
										? "Verify the client's information to update their account."
										: "Provide the client's email address to create their account. They will receive an email to set up their password and start using the account."}
								</p>
								<div className="row">
									<div className="col-md-6 my-2">
										<label className="fs-6 mb-3">First Name:</label>
										<input
											type="text"
											className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
											name="about.firstName"
											placeholder="First name"
											required
											value={formData?.about?.firstName || ""}
											onChange={(e) => handleFormDataInput(e, setFormData)}
										/>
									</div>
									<div className="col-md-6 my-2">
										<label className="fs-6 mb-3">Last Name:</label>
										<input
											type="text"
											className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
											name="about.lastName"
											placeholder="Last name"
											required
											value={formData?.about?.lastName || ""}
											onChange={(e) => handleFormDataInput(e, setFormData)}
										/>
									</div>
									<div className="col-md-12 my-2">
										<label className="fs-6 mb-3">Client Email:</label>
										<input
											type="email"
											name="email"
											className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
											placeholder="Email"
											value={formData?.email || ""}
											onChange={(e) => handleFormDataInput(e, setFormData)}
											disabled={isUpdatingRecord}
										/>
									</div>
									<div className="col-md-12 mt-3 mb-2">
										<h5 className="fs-6 fw-bold text-light-gray">
											{isUpdatingRecord
												? "Update the Client information"
												: "Please provide additional information about the client."}
										</h5>
									</div>
									{isUpdatingRecord
										? formData?.clientAdditionalDetail &&
										  formData.clientAdditionalDetail.length > 0 &&
										  formData.clientAdditionalDetail.map((detail) => (
												<div key={detail?.questionID?._id} className="col-md-12 my-2">
													{detail?.questionID && (
														<label className="fs-6 text-capitalize fw-bold mb-3">
															Q: {detail?.questionID?.question}
														</label>
													)}
													{detail?.questionID?.type === "short" && (
														<input
															type="text"
															name={`clientAdditionalDetail.${detail.questionID._id}`}
															className="w-100 rounded-3 border border-2 border-grey py-2 px-3 mb-3 bg-white"
															placeholder="Enter Answer..."
															value={detail.answer || ""}
															onChange={(e) => handleQuestionsInput(e, setFormData)}
														/>
													)}
													{detail?.questionID?.type === "long" && (
														<textarea
															name={`clientAdditionalDetail.${detail.questionID._id}`}
															className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white mb-3"
															value={detail.answer || ""}
															onChange={(e) => handleQuestionsInput(e, setFormData)}
															rows={3}
															dir="auto"
															placeholder="Enter Answer..."
															tabIndex={0}
														></textarea>
													)}
													{detail?.questionID?.options &&
														detail?.questionID?.type === "mcq" &&
														detail.questionID.options.map((option, index) => (
															<label
																key={index}
																htmlFor={`option_${detail.questionID._id}_${index}`}
																className="d-flex align-items-center gap-2 mb-3 custom-checkbox cursor-pointer"
															>
																<input
																	type="radio"
																	className="border border-secondary-light py-2 px-2"
																	name={`clientAdditionalDetail.${detail.questionID._id}`}
																	id={`option_${detail.questionID._id}_${index}`}
																	value={option}
																	checked={detail.answer === option}
																	onChange={(e) => handleQuestionsInput(e, setFormData)}
																/>
																{option}
															</label>
														))}
												</div>
										  ))
										: questions.length > 0 &&
										  questions.map(
												(question) =>
													question?.isActive && (
														<div key={question?._id} className="col-md-12 my-2">
															<label className="fs-6 text-capitalize fw-bold mb-3">Q: {question.question}</label>
															{question.type === "short" && (
																<input
																	type="text"
																	name={`clientAdditionalDetail.${question._id}`}
																	className="w-100 rounded-3 border border-2 border-grey py-2 px-3 mb-3 bg-white"
																	placeholder="Enter Answer..."
																	value={
																		formData?.clientAdditionalDetail?.find(
																			(detail) => detail.questionID === question._id
																		)?.answer || ""
																	}
																	onChange={(e) => handleQuestionsInput(e, setFormData)}
																/>
															)}
															{question.type === "long" && (
																<textarea
																	name={`clientAdditionalDetail.${question._id}`}
																	className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white mb-3"
																	value={
																		formData?.clientAdditionalDetail?.find(
																			(detail) => detail.questionID === question._id
																		)?.answer || ""
																	}
																	onChange={(e) => handleQuestionsInput(e, setFormData)}
																	rows={3}
																	dir="auto"
																	placeholder="Enter Answer..."
																	tabIndex={0}
																></textarea>
															)}
															{question?.options &&
																question.type === "mcq" &&
																question.options.map((option, index) => (
																	<label
																		key={index}
																		htmlFor={`option_${question._id}_${index}`}
																		className="d-flex align-items-center gap-2 mb-3 custom-checkbox cursor-pointer"
																	>
																		<input
																			type="radio"
																			className="border border-secondary-light py-2 px-2"
																			name={`clientAdditionalDetail.${question._id}`}
																			id={`option_${question._id}_${index}`}
																			value={option}
																			checked={
																				formData?.clientAdditionalDetail?.find(
																					(detail) => detail.questionID === question._id
																				)?.answer === option
																			}
																			onChange={(e) => handleQuestionsInput(e, setFormData)}
																		/>
																		{option}
																	</label>
																))}
														</div>
													)
										  )}
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="delete" onClick={() => setShowAddUpdateModal(false)}>
							Close
						</Button>
						<Button
							variant="primary"
							type="submit"
							disabled={
								isSubmittingRequest || !formData?.about?.firstName || !formData?.about?.lastName || !formData?.email
							}
						>
							{isSubmittingRequest ? (
								<>
									<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
									Please Wait...
								</>
							) : (
								"Submit"
							)}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>

			<Modal
				show={showViewModal}
				onHide={() => setShowViewModal(false)}
				aria-labelledby="contained-modal-title-vcenter"
				size="lg"
				centered
			>
				<Modal.Header  closeButton>
					<Modal.Title className="text-dark">View Client Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="w-100 p-2 " style={{ maxHeight: "60vh", overflowY: "auto" }}>
						<div style={{ maxWidth: "98%" }}>
							<div className="row">
								<div className="col-md-6 my-2">
									<label className="fs-6 mb-3">First Name:</label>
									<input
										type="text"
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										name="about.firstName"
										value={formData?.about?.firstName || ""}
										readOnly
									/>
								</div>
								<div className="col-md-6 my-2">
									<label className="fs-6 mb-3">Last Name:</label>
									<input
										type="text"
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										name="about.lastName"
										value={formData?.about?.lastName || ""}
										readOnly
									/>
								</div>
								<div className="col-md-12 my-2">
									<label className="fs-6 mb-3">Client Email:</label>
									<input
										type="email"
										name="email"
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										value={formData?.email || ""}
										readOnly
									/>
								</div>
								<div className="col-md-12 mt-3 mb-2">
									<h5 className="fs-6 fw-bold">Additional Information:</h5>
								</div>

								{formData?.clientAdditionalDetail &&
									Object.keys(formData.clientAdditionalDetail).length > 0 &&
									Object.entries(formData.clientAdditionalDetail).map(([key, answer]) => (
										<div key={key} className="col-md-12 my-2">
											{answer?.questionID && (
												<label className="fs-6 text-capitalize fw-bold mb-3">Q: {answer?.questionID?.question}</label>
											)}
											{answer?.questionID?.type === "short" && (
												<input
													type="text"
													className="w-100 rounded-3 border border-2 border-grey py-2 px-3 mb-3 bg-white"
													value={answer.answer || ""}
													readOnly
												/>
											)}
											{answer?.questionID?.type === "long" && (
												<textarea
													className="w-100 rounded-3 border border-2 border-grey py-2 px-3 mb-3 bg-white"
													rows={4}
													value={answer.answer || ""}
													readOnly
												></textarea>
											)}
											{answer?.questionID?.type === "mcq" && (
												<select
													value={answer.answer || ""}
													className="w-100 rounded-3 border border-2 border-grey py-2 px-3 mb-3 bg-white"
													disabled
												>
													<option value="" disabled>
														Select Answer
													</option>
													{answer.questionID.options.map((option, index) => (
														<option key={index} value={option}>
															{option}
														</option>
													))}
												</select>
											)}
										</div>
									))}
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowViewModal(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Client;
