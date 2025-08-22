import { useState } from "react";
import PlainDataTable from "../../../../styles/PlainDataTable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { convertToDate, handleFormDataInput } from "../../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import useToast from "../../../../store/hooks/useToast";
import { createAppointment, updateAppointment } from "../../../../actions/Appointments";
import { Navigate } from "react-router-dom";
import { setCurrentPage } from "../../../../store/redux/dashboardPreferences";
const topics = [
	{
		"Appointment ID": 1,
		Therapist: "Dr. Smith",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins ",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 2,
		Therapist: "Dr. Johnson",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 3,
		Therapist: "Dr. Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 4,
		Therapist: "Dr. Lee",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 5,
		Therapist: "Dr. Patel",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 6,
		Therapist: "Dr. Garcia",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 7,
		Therapist: "Dr. Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 8,
		Therapist: "Dr. Smith",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins ",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 9,
		Therapist: "Dr. Johnson",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 10,
		Therapist: "Dr. Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 11,
		Therapist: "Dr. Lee",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 12,
		Therapist: "Dr. Patel",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 13,
		Therapist: "Dr. Garcia",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
	{
		"Appointment ID": 14,
		Therapist: "Dr. Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
	},
];

const Appointment = () => {
	const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
	const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
	const [formData, setFormData] = useState();
	const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
	const dispatch = useDispatch();
	const { notify } = useToast();
	const loggedInUserInfo = useSelector((state) => state?.users?.loggedInUserInfo || false);

	const handleSubmitAppointments = async (e) => {
		e.preventDefault();
		setIsSubmittingRequest(true);

		if (isUpdatingRecord) {
			dispatch(
				updateAppointment({
					formData: formData,
					notify,
				})
			);
		} else {
			dispatch(
				createAppointment({
					therapistID: loggedInUserInfo?.isVerified?.verifiedByTherapist,
					clientID: loggedInUserInfo?._id,
					formData: formData,
					notify,
				})
			);
		}
		setShowAddUpdateModal(false);
		setIsSubmittingRequest(false);
		setIsUpdatingRecord(false);
	};

	const handleDeleteItemButton = () => {};
	const handleAddUpdateButton = (item) => {
		setFormData(item?.clientID?._id ? item?.clientID : {});
		setIsUpdatingRecord(item?._id ? true : false);
		setShowAddUpdateModal(true);
	};

	if (!loggedInUserInfo?._id || !loggedInUserInfo?.isVerified?.verifiedByTherapist) {
		dispatch(setCurrentPage("stats"));
	}
	return (
		<div className=" bg-white-50 fade-in round-10px dashboard-card-shadow p-5 h-100">
			<h2 className="fs-30px fw-medium mb-3 ps-0 mt-2">Appointment</h2>
			<div className="d-flex align-items-center justify-content-between mb-4 flex-wrap">
				<div className="d-flex align-items-center gap-2">
					<p className="fs-26px fw-medium mb-2 ps-0 mt-2 text-secondary">All Appointment</p>
					<div className="bg-primary px-2 text-white round-5px fs-21px">
						<div className="px-1">7</div>
					</div>
				</div>
				<button className="btn btn-primary py-2 bg-primary" onClick={() => handleAddUpdateButton()}>
					+ Appointment
				</button>
			</div>
			<PlainDataTable
				delete={handleDeleteItemButton}
				edit={handleAddUpdateButton}
				data={topics?.length ? topics : []}
				fieldNamesToShow={["Appointment ID", "Therapist", "Date & Time", "Duration", "Location", "Status"]}
				fieldsToShow={["#", "Therapist", "Date & Time", "Duration", "Location", "Status"]}
			/>

			<Modal
				show={showAddUpdateModal}
				onHide={() => setShowAddUpdateModal(false)}
				aria-labelledby="contained-modal-title-vcenter"
				size="lg"
				centered
			>
				<Modal.Header className="bg-primary" closeButton>
					<Modal.Title className="text-white ">{isUpdatingRecord ? "Update" : "Create New"} Appointment</Modal.Title>
				</Modal.Header>
				<form onSubmit={handleSubmitAppointments}>
					<Modal.Body>
						<>
							<div className="row">
								<div className="col-md-6 my-2">
									<label className="fs-6 mb-3">Date:</label>
									<input
										type="date"
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										name="schedule.date"
										value={convertToDate(formData?.schedule?.date)}
										required=""
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>
								<div className="col-md-6 my-2">
									<label className="fs-6 mb-3">Location:</label>
									<input
										className="w-100 rounded-3 border border-2 border-grey py-2 px-3 bg-white"
										placeholder="Location"
										type="text"
										name="schedule.location"
										value={formData?.schedule?.location || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
									/>
								</div>

								<div className="col-md-12 my-2">
									<label className="fs-6 mb-3">Description:</label>
									<textarea
										className="w-100 rounded-3 border  border-2  border-grey py-2 px-3  bg-white"
										placeholder="150 character limit"
										name="description"
										value={formData?.description || ""}
										onChange={(e) => handleFormDataInput(e, setFormData)}
										maxLength="150"
									/>
									<label
										className="ms-1"
										style={{
											color: formData?.description?.length >= 150 ? "red" : "green",
											fontSize: "12px",
										}}
									>
										{formData?.description?.length >= 150 && (
											<span className="me-2 fst-italic">You have Reached Max character limit</span>
										)}{" "}
										{formData?.description?.length || 0}/150
									</label>
								</div>
							</div>
						</>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="delete" onClick={() => setShowAddUpdateModal(false)}>
							Close
						</Button>
						<Button
							variant="primary"
							type="submit"
							disabled={isSubmittingRequest || !formData?.schedule?.date || !formData?.description}
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
		</div>
	);
};

export default Appointment;
