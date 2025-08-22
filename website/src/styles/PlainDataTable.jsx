import React from "react";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
// import { convertToDate } from "../../utils/helpers";
import { FaSearch } from "react-icons/fa";
import { convertToDate } from "../utils/helpers";

const PlainDataTable = React.memo((props) => {
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [globalFilterValue, setGlobalFilterValue] = useState("");

	useEffect(() => {
		setTableData(props.data || []);
	}, [props.data]);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		setGlobalFilterValue(value);
	};

	const renderColumnBody = (rowData, columnField, options) => {
		const nestedFields = columnField.split(".");
		let value = rowData;

		// Traverse through nested fields
		for (let field of nestedFields) {
			if (value && value?.hasOwnProperty(field)) {
				value = value[field];
			} else {
				value = null;
				break;
			}
		}

		if (columnField === "media") {
			return (
				<img
					className=""
					style={{ height: "50px" }}
					src={`${import.meta.env.VITE_APP_API_URL}/v1/guests/media?filename=${value?.filename}&mimetype=${
						value?.mimetype
					}&width=500`}
					alt="Image"
					loading="lazy"
				/>
			);
		} else if (columnField === "isActive") {
			return (
				<div className="form-check form-switch">
					<input
						className="form-check-input"
						checked={value}
						type="checkbox"
						onChange={(e) => props?.handleSwitch(e, rowData)}
						role="switch"
						id="flexSwitchCheckChecked"
					/>
					<label className="form-check-label" htmlFor="flexSwitchCheckChecked">
						{value ? "Enable" : "Disable"}
					</label>
				</div>
			);
		} else if (columnField === "createdAt" || columnField === "updatedAt") {
			return convertToDate(value, "yyyy-MM-dd hh:mm a");
		} else if (columnField === "activityStatus") {
			return value ? "Active" : "Pending";
		} else if (columnField === "about.phone") {
			return value ? value : "Not Provided";
		}
		if (columnField === "#") {
			return <div className="">{options.rowIndex + 1}</div>;
		}

		return value;
	};

	const renderColumns = () => {
		const columns = props.fieldsToShow.map((columnField, index) => {
			return (
				<Column
					key={index}
					field={columnField}
					header={props?.fieldNamesToShow[index]}
					headerStyle={{ padding: "10px", color: "#7A7F85", backgroundColor: "white" }}
					body={(rowData, options) => (
						<div style={{ wordBreak: "break-word" }} className="py-4 px-3 text-secondary">
							{renderColumnBody(rowData, columnField, options)}
						</div>
					)}
				/>
			);
		});

		columns.push(
			<Column
				key="actions"
				field="actions"
				header="Actions"
				headerStyle={{ color: "#7A7F85", backgroundColor: "white" }}
				body={(rowData) => (
					<div className="d-flex gap-2 ms-3">
						{props?.view && (
							<a
								onClick={() => props?.view && props?.view(rowData)}
								className="cursor-pointer btn-icon text-secondary"
								title="View"
							>
								<i className="fas fa-eye" />
							</a>
						)}
						{props?.edit && (
							<a
								onClick={() => props?.edit && props?.edit(rowData)}
								className="cursor-pointer btn-icon text-secondary"
								title="Edit"
							>
								<i className="fas fa-edit" />
							</a>
						)}
						{props?.delete && (
							<a
								onClick={() => props?.delete && props?.delete(rowData)}
								className="cursor-pointer btn-icon text-secondary"
								title="Delete"
							>
								<i className="fas fa-trash" />
							</a>
						)}
						{props?.subscription && (
							<a
								onClick={() => props?.subscription && props?.subscription(rowData)}
								className="cursor-pointer btn-icon text-secondary"
								title="Subscription"
							>
								<i className="fas fa-credit-card" />
							</a>
						)}
					</div>
				)}
			/>
		);

		return columns;
	};

	return (
		<div className="col-12">
			<div className="card border-0" style={{ background: "none" }}>
				<div className="table-responsive ">
					<DataTable
						value={tableData}
						paginator
						removableSort
						showGridlines
						rows={7}
						loading={loading}
						dataKey="_id"
						globalFilter={globalFilterValue}
						style={{ border: "1px solid #ccc" }}
						className="custom-paginator rounded-2"
						header={
							<div className="d-flex justify-content-between align-items-center py-4 ps-4 bg-white">
								<span className="p-input-icon-left">
									<FaSearch className="end-5 text-secondary-light" />
									<InputText
										className="border border-secondary-light rounded-2 outline-none py-1 px-2"
										value={globalFilterValue}
										onChange={onGlobalFilterChange}
										placeholder="Keyword Search"
									/>
								</span>
							</div>
						}
						emptyMessage="No record found."
					>
						{renderColumns()}
					</DataTable>
				</div>
			</div>
		</div>
	);
});

PlainDataTable.displayName = "PlainDataTable";

export default PlainDataTable;
