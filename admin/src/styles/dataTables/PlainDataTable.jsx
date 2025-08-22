import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { convertToDate } from "../../utils/helpers";

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
				<div className="text-start d-flex align-items-center">
					<InputSwitch checked={value} className="me-2" onChange={(e) => props.handleSwitch(e, rowData)} />
					{value ? "Active" : "Inactive"}
				</div>
			);
		} else if (columnField === "createdAt" || columnField === "updatedAt") {
			return convertToDate(value, "yyyy-MM-dd hh:mm a");
		}
		if (columnField === "#") {
			return <div>{options.rowIndex + 1}</div>;
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
					body={(rowData, options) => (
						<div style={{ wordBreak: "break-word", minWidth: "100px" }}>
							{renderColumnBody(rowData, columnField, options)}
						</div>
					)}
					sortable
				/>
			);
		});

		columns.push(
			<Column
				key="actions"
				field="actions"
				header="Actions"
				body={(rowData) => (
					<div className="d-flex gap-2 ms-2 ">
						{props?.view && (
							<i
								className="fas fa-eye svg-icon svg-icon-5 svg-icon-gray-500 cursor-pointer me-3 "
								onClick={() => props?.view(rowData)}
								title="View"
							/>
						)}
						{props?.edit && (
							<i
								className="fas fa-edit svg-icon svg-icon-5 svg-icon-gray-500 cursor-pointer me-3"
								onClick={() => props?.edit(rowData)}
								title="Edit"
							/>
						)}
						{props?.delete && (
							<i
								className="fas fa-trash svg-icon svg-icon-5 svg-icon-gray-500 cursor-pointer me-3"
								onClick={() => props?.delete(rowData)}
								title="Delete"
							/>
						)}
						{props?.subscription && (
							<i
								className="fas fa-credit-card svg-icon svg-icon-5 svg-icon-gray-500 cursor-pointer me-3"
								onClick={() => props?.subscription(rowData)}
								title="Subscription"
							/>
						)}
					</div>
				)}
			/>
		);

		return columns;
	};

	return (
		<div className="col-12">
			<div className=" border-0 text-capitalize" style={{ background: "none" }}>
				<DataTable
					value={tableData}
					paginator
					removableSort
					showGridlines
					rows={10}
					loading={loading}
					className="border-2 rounded-2"
					dataKey="_id"
					globalFilter={globalFilterValue}
					header={
						<div className="p-d-flex p-jc-between p-ai-center w-100">
							<span className="p-input-icon-left">
								<i className="fa fa-search" />
								<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
							</span>
						</div>
					}
					emptyMessage="No record found."
				>
					{renderColumns()}
				</DataTable>
			</div>
		</div>
	);
});

PlainDataTable.displayName = "PlainDataTable";

export default PlainDataTable;
