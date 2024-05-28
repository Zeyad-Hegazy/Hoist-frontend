import Header from "../../components/Header";
import { getAllReports } from "../../actions/client/defects";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ClientDefectTable from "../../components/Client-UI/defects/DefectsTable";

const coulmns = [
	{
		id: "departmentName",
		label: "Department",
		minWidth: 170,
		align: "center",
	},
	{
		id: "serialNumber",
		label: "Serial Number",
		minWidth: 170,
		align: "center",
	},
	{
		id: "categoryName",
		label: "Category",
		minWidth: 170,
		align: "center",
	},
	{
		id: "typeName",
		label: "Type",
		minWidth: 170,
		align: "center",
	},
	{
		id: "location",
		label: "Location",
		minWidth: 170,
		align: "center",
	},
	{
		id: "reportName",
		label: "Report Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "createdAt",
		label: "Created At",
		minWidth: 170,
		align: "center",
	},
	{
		id: "defectLevel",
		label: "Defect Level",
		minWidth: 170,
		align: "center",
	},
	{
		id: "isClientRespond",
		label: "Is Client Respond",
		minWidth: 170,
		align: "center",
	},
	{
		id: "isInspectorRespond",
		label: "Is Inspector Respond",
		minWidth: 170,
		align: "center",
	},
];

const DefectedReports = () => {
	const reports = useSelector((state) => state.defectedReports);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllReports());
	}, [dispatch]);

	return (
		<div>
			<Header label={"Reports"} setAction={null} />
			<main className="flex justify-center items-center">
				{reports && <ClientDefectTable columns={coulmns} rows={reports} />}
			</main>
		</div>
	);
};

export default DefectedReports;
