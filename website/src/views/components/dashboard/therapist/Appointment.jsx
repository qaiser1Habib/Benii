import { BsCalendarCheck } from "react-icons/bs";
import PlainDataTable from "../../../../styles/PlainDataTable";
import EventCalendar from "../../../../styles/EventCalendar";

const topics = [
	{
		"Appointment ID": 1,
		Client: " Smith",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins ",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 2,
		Client: " Johnson",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 3,
		Client: " Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 4,
		Client: " Lee",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 5,
		Client: " Patel",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 6,
		Client: " Garcia",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 7,
		Client: " Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 8,
		Client: " Smith",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins ",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 9,
		Client: " Johnson",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 10,
		Client: " Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 11,
		Client: " Lee",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 12,
		Client: " Patel",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 13,
		Client: " Garcia",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
	{
		"Appointment ID": 14,
		Client: " Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Duration: "60 mins",
		Location: "Office",
		Status: "Confirmed",
		Status_one: "Cancelled",
	},
];

const Appointment = () => {
	const handleDeleteItemButton = () => {};
	const handleAddUpdateButton = () => {};
	return (
		<div className=" bg-white  bg-opacity-75 round-10px fade-in dashboard-card-shadow px-3 py-4 p-md-5 h-100">
			<h2 className="fs-36px fw-medium mb-3 ps-0 mt-2">Appointments</h2>
			<div className="d-flex align-items-center justify-content-between mb-4 mt-5 flex-wrap">
				<div className="d-flex align-items-center gap-2">
					<p className="fs-20px fw-medium mb-2 ps-0 mt-2 text-secondary">All Appointments</p>
					<div className="bg-primary px-2 py-1 text-white round-5px fs-16px">
						<div className="px-1">7</div>
					</div>
				</div>
				<button className="btn btn-primary py-2 bg-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
					<BsCalendarCheck className="" /> Calendar
				</button>
			</div>
			<PlainDataTable
				delete={handleDeleteItemButton}
				edit={handleAddUpdateButton}
				data={topics?.length ? topics : []}
				fieldNamesToShow={["Appointment ID", "Client", "Date & Time", "Duration", "Location", "Status"]}
				fieldsToShow={["#", "Client", "Date & Time", "Duration", "Location", "Status"]}
			/>
			<div className="d-flex align-items-center justify-content-between mb-4 mt-5">
				<div className="d-flex align-items-center gap-2">
					<p className="fs-26px fw-medium mb-2 ps-0 mt-2 text-secondary">Cancelled Appointments</p>
					<div className="bg-primary px-2 text-white round-5px fs-21px">
						<div className="px-1">7</div>
					</div>
				</div>
			</div>
			<PlainDataTable
				delete={handleDeleteItemButton}
				edit={handleAddUpdateButton}
				data={topics?.length ? topics : []}
				fieldNamesToShow={["Appointment ID", "Client", "Date & Time", "Duration", "Location", "Status"]}
				fieldsToShow={["#", "Client", "Date & Time", "Duration", "Location", "Status_one"]}
			/>

			<div>
				{/* Button trigger modal */}

				{/* Modal */}
				<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
						<div className="modal-content">
							<div className="modal-header">
								<h1 className="modal-title fs-5" id="exampleModalLabel">
									Appointment Calendar
								</h1>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
							</div>
							<div className="modal-body">
								<EventCalendar />
							</div>
							<div className="modal-footer">
								<button type="button" className="bg-subtle border-0 rounded-pill text-dark px-3" data-bs-dismiss="modal">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Appointment;
