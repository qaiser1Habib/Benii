import { useEffect, useState } from "react";
import PlainDataTable from "../styles/dataTables/PlainDataTable";
import BreadCrumb from "./partials/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../store/hooks/useToast";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { handleFormDataInput } from "../utils/helpers";
import { createQuestion, deleteQuestion, getQuestions, updateQuestion } from "../actions/questions";
import useDeleteWithConfirmation from "../store/hooks/useDeleteWithConfirmation";

const questionType = [
	{ label: "Long Question", value: "long" },
	{ label: "Short Question", value: "short" },
	{ label: "Multiple choice", value: "mcq" },
];

const Questions = () => {
	const [formData, setFormData] = useState({ question: "", type: "", options: ["", ""] });
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
	const [showViewModal, setShowViewModal] = useState(false);
	const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);

	const page = 1;
	const limit = 100;

	const dispatch = useDispatch();
	const { notify } = useToast();

	const questions = useSelector((state) => state?.questions?.all || []);
	const deleteWithConfirmation = useDeleteWithConfirmation();

	useEffect(() => {
		dispatch(getQuestions({ formData: { page: page, limit: limit }, notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddUpdateButton = (item) => {
		if (item) {
			const options = item.type === "mcq" ? item.options || ["", ""] : [];
			setFormData({ ...item, options });
			setIsUpdatingRecord(!!item?._id);
		} else {
			setFormData({ question: "", type: "", options: ["", ""] });
			setIsUpdatingRecord(false);
		}
		setShowAddUpdateModal(true);
	};

	const handleViewButton = (item) => {
		setFormData(item);
		setShowViewModal(true);
	};

	const handleOptionChange = (optionIndex, value) => {
		setFormData((prevFormData) => {
			const updatedOptions = [...prevFormData.options];
			updatedOptions[optionIndex] = value;
			return { ...prevFormData, options: updatedOptions };
		});
	};

	const handleAddOption = () => {
		setFormData((prevFormData) => ({
			...prevFormData,
			options: [...prevFormData.options, ""],
		}));
	};

	const handleDeleteOption = (optionIndex) => {
		setFormData((prevFormData) => {
			const newOptions = prevFormData.options.filter((_, index) => index !== optionIndex);
			return { ...prevFormData, options: newOptions };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);

		if (isUpdatingRecord) {
			let formDataToSubmit = { ...formData };
			if (formDataToSubmit.type !== "mcq") {
				formDataToSubmit.options = ["", ""];
			}
			await dispatch(
				updateQuestion({
					formData: formDataToSubmit,
					notify,
				})
			).then(({ payload }) => {
				if (payload?._id) dispatch(getQuestions({ formData: { page: page, limit: limit }, notify }));
			});
		} else {
			await dispatch(
				createQuestion({
					formData: formData,
					notify,
				})
			).then(({ payload }) => {
				if (payload?._id) dispatch(getQuestions({ formData: { page: page, limit: limit }, notify }));
			});
		}

		setShowAddUpdateModal(false);
		setIsSubmittingRequest(false);
	};

	const handleDeleteItemButton = (item) => {
		deleteWithConfirmation({
			deleteAction: deleteQuestion,
			formData: { formData: { _id: item?._id }, notify },
		});
	};

	const handleUpdateActiveStatus = (e, item) => {
		setIsSubmittingRequest(true);
		setFormData(item);

		dispatch(updateQuestion({ formData: { ...item, isActive: e.value }, notify }));

		setIsSubmittingRequest(false);
	};

	return (
		<>
			<div className="fade-in">
				<BreadCrumb pageNames={["Questions"]} />
				<div className="container-xxl">
					<div className="row">
						<div className="d-flex flex-wrap flex-stack my-4">
							<div className="d-flex flex-wrap flex-stack">
								<div className="fw-bolder fs-4">Items</div>
								<span className="badge badge-square badge-success ms-2">
									{questions?.length > 0 ? questions?.length : "0"}
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
														onClick={() => handleAddUpdateButton(null)}
														className="btn btn-icon py-2 btn-success py-2 fw-bolder w-100 px-4 btn-hover-scale ms-4"
													>
														<i className="las la-plus fs-2 me-1" />
														Add New Question
													</button>
												</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-5 ">
						{questions?.length > 0 && (
							<div className="col-12 my-5">
								<PlainDataTable
									data={questions}
									view={handleViewButton}
									edit={handleAddUpdateButton}
									delete={handleDeleteItemButton}
									handleSwitch={handleUpdateActiveStatus}
									fieldNamesToShow={["No", "Title", "Type", "Status"]}
									fieldsToShow={["#", "question", "type", "isActive"]}
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
					<Modal.Title id="contained-modal-title-vcenter">{isUpdatingRecord ? "Update" : "Add New "} Question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="col-md-12 mb-10">
						<div>
							<div className="col-md-12 mb-10">
								<label className="required fw-bold fs-6 mb-2">Question Type*</label>
								<Select
									name="questionType"
									required
									value={questionType.find((type) => type.value === formData?.type) || null}
									onChange={(selectedOption) =>
										setFormData({
											...formData,
											type: selectedOption?.value,
											options: selectedOption?.value === "mcq" ? ["", ""] : [],
										})
									}
									options={questionType}
								/>
							</div>
							<div className="w-100 d-flex justify-content-between mb-2">
								<label className="required fw-bold fs-6 my-auto text-capitalize">Question*</label>
							</div>
							<div>
								<input
									type="text"
									name="question"
									className="form-control form-control-solid mb-10"
									placeholder={`${
										formData?.type ? formData?.type[0].toUpperCase() + formData?.type.substring(1) : "Short"
									} question...`}
									value={formData?.question || ""}
									onChange={(e) => handleFormDataInput(e, setFormData)}
								/>
							</div>
							{formData?.type === "mcq" && (
								<div className="row mb-10">
									{(formData?.options || []).map((option, optionIndex) => (
										<>
											<div key={optionIndex} className="col-md-12">
												<div className="mb-10">
													<div className="d-flex align-items-center w-100 gap-2">
														<div className="w-100">
															<input
																type="text"
																name="option"
																className="form-control form-control-solid"
																placeholder="Option text"
																value={option || ""}
																onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
															/>
														</div>
														{formData?.options.length > 1 && (
															<div style={{ width: "25%" }}>
																<button
																	className="btn btn-danger w-100"
																	onClick={() => handleDeleteOption(optionIndex)}
																>
																	Remove
																</button>
															</div>
														)}
													</div>
												</div>
											</div>
											{optionIndex + 1 === (formData?.options || []).length && (
												<div>
													<button className="btn btn-secondary" onClick={handleAddOption}>
														+ Add Option
													</button>
												</div>
											)}
										</>
									))}
								</div>
							)}
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
						<button
							className="btn btn-success py-2 fw-bolder px-4"
							disabled={
								isSubmittingRequest ||
								!formData?.question ||
								!formData?.type ||
								(formData?.type === "mcq" && !formData?.options[formData?.options.length - 1])
							}
							onClick={handleSubmit}
						>
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

			<Modal
				show={showViewModal}
				onHide={() => setShowViewModal(false)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">View Question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-md-12 mb-10">
							<div>
								<div className="col-md-12 mb-10">
									<div className="mb-2">
										<label className="required fw-bold fs-6 mb-0">Question Type*</label>
									</div>
									<Select
										name="questionType"
										required
										value={questionType.find((type) => type.value === formData?.type) || null}
										options={questionType}
										isDisabled={true}
									/>
								</div>
								{formData?.type === "mcq" && (
									<div className="row">
										{(formData?.options || []).map((option, optionIndex) => (
											<>
												<div key={optionIndex} className="col-md-6 mb-3">
													<div className="mb-10">
														<div className="d-flex align-items-center">
															<input
																type="text"
																name="option"
																className="form-control form-control-solid"
																placeholder="Option text"
																value={option || ""}
																disabled
															/>
														</div>
													</div>
												</div>
											</>
										))}
									</div>
								)}
								<div className="w-100 d-flex justify-content-between mb-5">
									<label className="required fw-bold fs-6 my-auto text-capitalize">
										{formData?.type ? formData?.type : "Short"} Question*
									</label>
								</div>
								<div className="mb-10">
									<input
										type="text"
										name="question"
										className="form-control form-control-solid mb-3"
										placeholder={`${formData?.type ? formData?.type : "Short"} question...`}
										value={formData?.question || ""}
										disabled
									/>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
						<button type="button" className="btn btn-light" onClick={() => setShowViewModal(false)}>
							Close
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Questions;
