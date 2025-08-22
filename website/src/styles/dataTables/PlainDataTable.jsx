import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";

const PlainDataTable = (props) => {
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

	const renderColumnBody = (rowData, columnField) => {
		const nestedFields = columnField.split(".");
		let value = rowData;

		// Traverse through nested fields
		for (let field of nestedFields) {
			if (value && value.hasOwnProperty(field)) {
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
			const date = new Date(value);
			return date.toLocaleString("en-US", { timeZone: "UTC" });
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
					body={(rowData) => <div style={{ wordBreak: "break-word" }}>{renderColumnBody(rowData, columnField)}</div>}
					sortable
				/>
			);
		});

		// Add a custom column for the edit and delete icons
		columns.push(
			<Column
				key="actions"
				field="actions"
				header="Actions"
				body={(rowData) => (
					<div className="d-flex">
						<i
							className={`fas  ${
								props?.edit ? "fa-edit" : props?.view && "fa-eye"
							} svg-icon svg-icon-5 svg-icon-gray-500 p-2 pe-5 pb-3 pt-3 cursor-pointer `}
							title={`${props?.edit ? "Edit" : props?.view && "User Detail"}`}
							onClick={() => (props?.edit ? props?.edit(rowData) : props?.view && props?.view(rowData))}
						/>
						<i
							className={`fas ${
								props?.delete ? "fa-trash" : props?.subscription && "fa-credit-card"
							}  svg-icon svg-icon-5 svg-icon-gray-500 pb-3 pt-3 cursor-pointer`}
							title={`${props?.delete ? "Delete" : props?.subscription && "Subscription"}`}
							onClick={() =>
								props?.delete ? props?.delete(rowData) : props?.subscription && props?.subscription(rowData)
							}
						/>
					</div>
				)}
			/>
		);

		return columns;
	};

	return (
		<div className="card border-0 rounded" style={{ background: "none" }}>
			<DataTable
				value={tableData}
				paginator
				removableSort
				showGridlines
				rows={10}
				loading={loading}
				dataKey="_id"
				globalFilter={globalFilterValue}
				header={
					<div className="p-d-flex p-jc-between p-ai-center">
						<span className="p-input-icon-left">
							<i className="pi pi-search" />
							<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
						</span>
					</div>
				}
				emptyMessage="No record found."
			>
				{renderColumns()}
			</DataTable>
		</div>
	);
};

export default PlainDataTable;
