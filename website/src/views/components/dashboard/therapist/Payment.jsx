import PlainDataTable from "../../../../styles/PlainDataTable";

const topics = [
	{
		"Payment ID": 1,
		Patient: " Smith",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling ",

		Status: "Succeeded",
	},
	{
		"Payment ID": 2,
		Patient: " Johnson",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 3,
		Patient: " Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 4,
		Patient: " Lee",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 5,
		Patient: " Patel",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 6,
		Patient: " Garcia",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 7,
		Patient: " Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 8,
		Patient: " Smith",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling ",

		Status: "Succeeded",
	},
	{
		"Payment ID": 9,
		Patient: " Johnson",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 10,
		Patient: " Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 11,
		Patient: " Lee",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 12,
		Patient: " Patel",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 13,
		Patient: " Garcia",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
	{
		"Payment ID": 14,
		Patient: " Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		Service: "Mindful Counseling",

		Status: "Succeeded",
	},
];

const Payment = () => {
	const handleDeleteItemButton = () => {};
	const handleAddUpdateButton = () => {};
	return (
		<div className="bg-white bg-opacity-75 round-10px fade-in dashboard-card-shadow p-5 h-100">
			<h2 className="fs-36px fw-medium mb-3 ps-0 mt-2">Payments</h2>
			<div className="d-flex align-items-center justify-content-between mb-4">
				<div className="d-flex align-items-center gap-2">
					<p className="fs-20px fw-medium mb-2 ps-0 mt-2 text-secondary">All Payments</p>
					<div className="bg-primary px-2 py-1 text-white round-5px fs-16px">
						<div className="px-1">7</div>
					</div>
				</div>
			</div>
			<PlainDataTable
				delete={handleDeleteItemButton}
				edit={handleAddUpdateButton}
				data={topics?.length ? topics : []}
				fieldNamesToShow={["Payment ID", "Patient", "Date & Time", "Service", "Status"]}
				fieldsToShow={["#", "Patient", "Date & Time", "Service", "Status"]}
			/>
		</div>
	);
};

export default Payment;
