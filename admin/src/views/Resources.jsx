import { useEffect, useRef, useState } from "react";
import BreadCrumb from "./partials/BreadCrumb";
import ImageLoader from "../styles/loaders/ImageLoader";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../store/hooks/useToast";
import { createResource, deleteResource, getResources, updateResource } from "../actions/resources";
import { convertToDate, handleFormDataInput } from "../utils/helpers";
import DeleteModal from "../styles/modals/DeleteModal";
import ProcessingModal from "../styles/modals/ProcessingModal";
import { InputSwitch } from "primereact/inputswitch";
import TextEditor from "../styles/editors/TextEditor";
import useDeleteWithConfirmation from "../store/hooks/useDeleteWithConfirmation";

const Resources = () => {
	const dispatch = useDispatch();
	const { notify } = useToast();
	const [isFetchingApi, setIsFetchingApi] = useState(false);
	const hiddenImageFileInput = useRef(null);

	const [formData, setFormData] = useState();
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
	const [processingStatus, setProcessingStatus] = useState("");
	const [showProgressModal, setShowProgressModal] = useState(false);

	const resources = useSelector((state) => state.resources?.all || []);
	const deleteWithConfirmation = useDeleteWithConfirmation();

	const page = 1;
	const limit = 100;

	useEffect(() => {
		dispatch(getResources({ formData: { page: page, limit: limit }, notify }));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddUpdateButton = (item) => {
		setFormData(item?._id ? item : null);
		setIsUpdatingRecord(item?._id ? true : false);

		setShowAddUpdateModal(true);
	};

	const handleDeleteItemButton = (item) => {
		deleteWithConfirmation({
			deleteAction: deleteResource,
			formData: { formData: { _id: item?._id }, notify },
		});
	};

	const handleSwitch = (e, item) => {
		setIsFetchingApi(true);
		setIsSubmittingRequest(true);
		setFormData(item);

		dispatch(updateResource({ formData: { ...item, isActive: e.value }, notify }));

		setIsFetchingApi(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);
		setShowProgressModal(true);

		if (isUpdatingRecord) {
			await dispatch(
				updateResource({
					formData: formData,
					notify,
					uploadProgress: (progressEvent) => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						if (percentCompleted === 100) setProcessingStatus("Upload Successfully, Now Updating In Database");
						else setProcessingStatus(`Uploading ${percentCompleted.toFixed(0)}%`);
					},
				})
			).then(({ payload }) => {
				if (payload?._id) dispatch(getResources({ formData: { page: page, limit: limit }, notify }));
			});
		} else {
			await dispatch(
				createResource({
					formData: formData,
					notify,
					uploadProgress: (progressEvent) => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						if (percentCompleted === 100) setProcessingStatus("Upload Successfully, Now Saving In Database");
						else setProcessingStatus(`Uploading ${percentCompleted.toFixed(0)}%`);
					},
				})
			).then(({ payload }) => {
				if (payload?._id) dispatch(getResources({ formData: { page: page, limit: limit }, notify }));
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
				<BreadCrumb pageNames={["Resources"]} />

				<div className="container-xxl">
					<div className="row">
						<div className="d-flex flex-wrap flex-stack my-4">
							<div className="d-flex flex-wrap flex-stack">
								<div className="fw-bolder fs-4">Items</div>
								<span className="badge badge-square badge-success ms-2">
									{resources?.length > 0 ? resources?.length : "0"}
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
														onClick={handleAddUpdateButton}
														className="btn btn-icon py-2 btn-success py-2 fw-bolder w-100 px-4 btn-hover-scale ms-4"
													>
														<i className="las la-plus fs-2 me-1" />
														Add New Resource
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
						{resources?.length ? (
							resources.map((resource, index) => (
								<div className="col-md-6 col-lg-12 col-xl-4 d-flex" key={index}>
									<div className="card shadow-sm mb-6 mb-xl-9 w-100">
										<div style={{ height: "300px" }}>
											<ImageLoader
												src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${
													resource?.media?.filename
												}&mimetype=${resource?.media?.mimetype}&width=500`}
												className="w-100 rounded-2 object-fit-cover"
											/>
										</div>
										<div className="card-body p-3">
											<div className="row">
												<div className="col-lg-12 d-flex">
													<p> {convertToDate(resource?.updatedAt, "dd-MM-yyyy")}</p>
												</div>

												<div className="d-flex align-items-center justify-content-between mb-3">
													<div className="w-75">
														<h4 className="text-capitalize truncate"> {resource?.title}</h4>
													</div>
													<div className="d-flex">
														<p className="mt-1 mb-0">{resource?.isActive ? "Active" : "Inactive"}</p>
														<InputSwitch
															className="ms-2"
															checked={resource?.isActive}
															onChange={(e) => handleSwitch(e, resource)}
														/>
													</div>
												</div>
											</div>
											<div dangerouslySetInnerHTML={{ __html: resource?.description?.slice(0, 100) + "..." }} />
										</div>

										<div className="mt-auto d-flex justify-content-between gap-3 px-3 pb-4">
											<button
												onClick={() => handleAddUpdateButton(resource)}
												className="btn btn-icon plan-action-btn w-50"
											>
												<i className="fas fa-edit svg-icon svg-icon-5 me-1 text-white" />
												Edit
											</button>
											<button
												onClick={() => handleDeleteItemButton(resource)}
												className="btn btn-icon plan-action-btn w-50"
											>
												<i className="bi bi-trash-fill svg-icon svg-icon-5 me-1 text-white" />
												Delete
											</button>
										</div>
									</div>
								</div>
							))
						) : (
							<>No Resources Found</>
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
					<Modal.Title id="contained-modal-title-vcenter">
						{isUpdatingRecord ? "Update Resource" : "Add New Resource"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<>
						<div className="d-flex flex-column me-n7 pe-7 custom-modal">
							<div className="row">
								<div className="col-md-12 mb-10">
									<label className="required fw-bold fs-6 mb-2">Upload Blog Image</label>

									<input
										type="file"
										name="image"
										className="form-control form-control-solid mb-3 mb-lg-0"
										required=""
										accept="image/x-png,image/jpeg"
										onChange={(e) => setFormData({ ...formData, media: e.target.files[0] })}
									/>
								</div>
								<div className="col-md-12  mb-10">
									<label className="required fw-bold fs-6 mb-2">Title *</label>
									<input
										type="text"
										name="title"
										className="form-control form-control-solid mb-3 mb-lg-0"
										placeholder="Resources Title"
										value={formData?.title || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>

								<div className="col-12">
									<label className=" col-form-label required fw-bold fs-6">Resource content</label>
									<div className="fv-row">
										<TextEditor
											height="400"
											value={formData?.description}
											setValue={(e) => setFormData({ ...formData, description: e })}
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				</Modal.Body>
				<Modal.Footer>
					<div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
						<button
							className="btn btn-success py-2 fw-bolder px-4"
							disabled={isFetchingApi}
							data-kt-indicator={isFetchingApi}
							onClick={handleSubmit}
						>
							<span className="indicator-label">{isUpdatingRecord ? "Update" : "Submit"}</span>
							{isFetchingApi && (
								<span className="indicator-progress">
									Please wait...
									<span className="spinner-border spinner-border-sm align-middle ms-2" />
								</span>
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
				heading={isUpdatingRecord ? "Updating Topic" : "Adding Topic"}
				progress={processingStatus}
				message="Processing..."
				handleSubmit={() => window.location.reload()}
				description="Please wait for the process to complete, do not close browser."
			/>
		</>
	);
};

export default Resources;
