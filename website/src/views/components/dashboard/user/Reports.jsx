import PlainDataTable from "../../../../styles/PlainDataTable";

const topics = [
	{
		"Report ID": 1,
		Therapist: "Dr. Smith",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf ",
		Location: "Office",
	},
	{
		"Report ID": 2,
		Therapist: "Dr. Johnson",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 3,
		Therapist: "Dr. Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 4,
		Therapist: "Dr. Lee",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 5,
		Therapist: "Dr. Patel",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 6,
		Therapist: "Dr. Garcia",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 7,
		Therapist: "Dr. Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 8,
		Therapist: "Dr. Smith",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf ",
		Location: "Office",
	},
	{
		"Report ID": 9,
		Therapist: "Dr. Johnson",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 10,
		Therapist: "Dr. Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 11,
		Therapist: "Dr. Lee",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 12,
		Therapist: "Dr. Patel",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 13,
		Therapist: "Dr. Garcia",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
	{
		"Report ID": 14,
		Therapist: "Dr. Brown",
		"Date & Time": "May 15, 2024 - 10AM",
		"PDF File": "Report.pdf",
		Location: "Office",
	},
];

const Reports = () => {
	const handleDeleteItemButton = () => {};
	const handleAddUpdateButton = () => {};
	return (
		<div className="fade-in bg-white bg-opacity-75 round-10px dashboard-card-shadow p-5 h-100">
			<h2 className="fs-30px fw-medium mb-3 ps-0 mt-2">Reports</h2>
			<div className="d-flex align-items-center justify-content-between mb-4">
				<div className="d-flex align-items-center gap-2">
					<p className="fs-20px fw-medium mb-2 ps-0 mt-2 text-secondary">All Reports</p>
					<div className="bg-primary px-2 py-1 text-white round-5px fs-16px">
						<div className="px-1">7</div>
					</div>
				</div>
			</div>
			<PlainDataTable
				delete={handleDeleteItemButton}
				edit={handleAddUpdateButton}
				data={topics?.length ? topics : []}
				fieldNamesToShow={["Report ID", "Therapist", "Date & Time", "PDF File", "Location"]}
				fieldsToShow={["#", "Therapist", "Date & Time", "PDF File", "Location"]}
			/>
		</div>
	);
};

export default Reports;
