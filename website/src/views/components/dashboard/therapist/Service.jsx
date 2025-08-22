import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineStar } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../../store/hooks/useToast";
import { createService, deleteService, getServices, updateService } from "../../../../actions/services";
import { handleFormDataInput } from "../../../../utils/helpers";
import Select from "react-select";
import useDeleteWithConfirmation from "../../../../store/hooks/useDeleteWithConfirmation";

const Service = () => {
	const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
	const [formData, setFormData] = useState();
	const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const dispatch = useDispatch();
	const { notify } = useToast();

	const currentLoggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || false);
	const services = useSelector((state) => state?.services?.all || []);
	const deleteWithConfirmation = useDeleteWithConfirmation();

	const sessionDuration = [
		{ label: "30 Minute", value: "30 minute" },
		{ label: "1 Hour", value: "1 hour" },
		{ label: "2 Hour", value: "2 hour" },
	];
	const page = 1;
	const limit = 100;
	useEffect(() => {
		dispatch(getServices({ formData: { therapistID: currentLoggedInUserInfo?._id }, notify }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddUpdateButton = (item) => {
		setFormData(item?._id ? item : null);
		setIsUpdatingRecord(item?._id ? true : false);

		setShowAddUpdateModal(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);
		if (isUpdatingRecord) {
			await dispatch(
				updateService({
					formData: formData,
					notify,
				})
			);
		} else {
			await dispatch(
				createService({
					formData: { therapistID: currentLoggedInUserInfo?._id, ...formData },
					notify,
				})
			);
		}
		setShowAddUpdateModal(false);
		setIsSubmittingRequest(false);
		setIsUpdatingRecord(false);
	};

	const handleDeleteItemButton = (item) => {
		deleteWithConfirmation({
			deleteAction: deleteService,
			formData: { formData: { _id: item?._id }, notify },
		});
	};

	return (
		<>
			<div className="w-100 bg-white-50 fade-in round-10px dashboard-card-shadow p-2 p-xl-5 h-100">
				<h2 className="fs-36px fw-medium mb-4 ps-0 mt-2">Services</h2>
				<div className="d-flex align-items-center justify-content-between  flex-wrap">
					<div className="d-flex align-items-center gap-2">
						<p className="fs-20px fw-medium mb-2 ps-0 mt-2 text-secondary">All Services</p>
						<div className="bg-primary px-2 py-1 text-white round-5px fs-16px">
							<div className="px-1">{services?.length > 0 ? services?.length : "0"}</div>
						</div>
					</div>
					<button onClick={() => handleAddUpdateButton()} className="btn btn-primary py-2 bg-primary">
						+ New Service
					</button>
				</div>
				<div className="row pt-3">
					{services?.length > 0 ? (
						services.map((service, index) => (
							<div key={index} className="col-12 col-lg-6 col-xl-4 mb-3 d-flex">
								<div className="bg-white-50 dashboard-card-shadow round-10px h-100 d-flex flex-column w-100">
									<div className="d-flex justify-content-center">
										<p
											className="fs-20px fw-bold pt-4 mb-0 text-center text-capitalize truncate"
											style={{ width: "90%" }}
										>
											{service.title}
										</p>
									</div>
									<div className="w-full text-center my-3">
										<span className="fs-15px badge rounded-pill bg-primary fw-normal text-white text-capitalize py-2 px-4">
											{`$${service.price} per ${service.duration}`}
										</span>
									</div>
									<hr className="service-hr-secondary-line  mt-0 mb-3" />
									<div className="px-3">
										<div className="text-start">
											<div className="my-2">
												<h5 className="fs-16px fw-medium mb-0">Service Offered</h5>
												<span className="fs-15px text-secondary">{service.serviceOffer}</span>
											</div>
										</div>
										<div className="mt-2 mb-4">
											<p className="fs-16px fw-medium mb-0">Description</p>
											<p className="fs-15px text-secondary">{service.description}</p>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-center pb-4 px-3 mt-auto">
										<a
											onClick={() => handleAddUpdateButton(service)}
											className="btn btn-primary w-50 d-flex align-items-center justify-content-center gap-2 me-2 fs-14px py-2"
										>
											<FaEdit /> <span>Edit</span>
										</a>
										<a
											onClick={() => handleDeleteItemButton(service)}
											className="btn btn-primary w-50 d-flex align-items-center justify-content-center gap-2 fs-14px py-2"
										>
											<RiDeleteBin6Line />
											<span>Delete</span>
										</a>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-center">No Services Found</div>
					)}
				</div>

				<div className="row pt-5 justify-content-center gap-xxl-3">
					<div className="d-flex align-items-center gap-2">
						<p className="fs-20px fw-medium mb-2 ps-0 mt-2 text-secondary">Client Reviews</p>
						<div className="bg-primary px-2 py-1 text-white round-5px fs-16px">
							<div className="px-1">2</div>
						</div>
					</div>
					<div className="col-12  mb-3">
						<div className="bg-white-50 dashboard-card-shadow round-10px h-100 d-flex flex-column py-3 pt-5">
							<div className="px-4 d-flex flex-column flex-md-row gap-4 py-2">
								<div className="ms-2">
									<img src="/assets/images/user-2.png" alt="" width={62} />
								</div>
								<div>
									<p className="fs-26px mb-2">Eimly Richards</p>
									<div className="fs-20px d-flex my-2 gap-1">
										<MdOutlineStar className="text-warning" />
										<MdOutlineStar className="text-warning" />
										<MdOutlineStar className="text-warning" />
										<MdOutlineStar className="text-warning" />
										<MdOutlineStar className="text-secondary" />
									</div>
									<p className="fs-18px my-0 text-secondary">
										Benii has helped me stay on track with my mental wellness. It's empathetic, non-judgmental, and
										offers practical suggestions that have made a real difference
									</p>
								</div>
							</div>
							<hr />
							<div className="px-4 d-flex flex-column flex-md-row gap-4 py-2">
								<div className="ms-2">
									<img src="/assets/images/user-1.png" alt="" width={62} />
								</div>
								<div>
									<p className="fs-26px mb-2">Isabella</p>
									<div className="fs-20px d-flex my-2 gap-1">
										<MdOutlineStar className="text-warning" />
										<MdOutlineStar className="text-warning" />
										<MdOutlineStar className="text-warning" />
										<MdOutlineStar className="text-warning" />
										<MdOutlineStar className="text-secondary" />
									</div>
									<p className="fs-18px my-2 text-secondary">
										What I love most about Benii is the convenience. It's always there when I need to talk, and its
										personalized advice has been incredibly helpful for my mental health journey.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal
				show={showAddUpdateModal}
				onHide={() => setShowAddUpdateModal(false)}
				aria-labelledby="contained-modal-title-vcenter"
				size="lg"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title className="text-dark">{isUpdatingRecord ? "Update" : "Create New"} Service</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmit}>
					<Modal.Body>
						<div className="w-100 p-2">
							<div className="row">
								<div className="col-md-6 my-2">
									<label className="fs-6 mb-3">Service Name:</label>
									<input
										type="text"
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										name="title"
										placeholder="Service name"
										required
										value={formData?.title || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>

								<div className="col-md-6 my-2">
									<label className="fs-6 mb-3">Price:</label>
									<input
										type="text"
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										name="price"
										placeholder="Price"
										required
										value={formData?.price || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>

								<div className="col-md-6 my-2">
									<label className="fs-6 mb-3">Service Offer:</label>
									<input
										type="text"
										name="serviceOffer"
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										placeholder="Service Offer"
										value={formData?.serviceOffer || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>
								<div className="col-md-6 my-2">
									<label className="fs-6 mb-3">Session Time:</label>
									<Select
										name="duration"
										required
										value={sessionDuration.filter((item) => item.value === formData?.duration)}
										onChange={(selectedOption) =>
											setFormData({
												...formData,
												duration: selectedOption?.value,
											})
										}
										options={sessionDuration}
									/>
								</div>

								<div className="col-md-12 my-2">
									<label className="fs-6 mb-3">Description:</label>
									<textarea
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										placeholder="Service description"
										value={formData?.description || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
										name="description"
										rows={5}
									/>
								</div>
							</div>
						</div>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="delete" onClick={() => setShowAddUpdateModal(false)}>
							Close
						</Button>
						<Button variant="primary" type="submit" disabled={isSubmittingRequest || !formData?.title || !formData?.price}>
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
		</>
	);
};

export default Service;
