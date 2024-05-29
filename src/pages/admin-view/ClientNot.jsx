import Header from "../../components/Header";

import { getAllNotification } from "../../actions/admin/clientNotification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AdminNotificationsTable from "../../components/UI/defect/AdminNotificationsTable";

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

const ClientNot = () => {
	const notifications = useSelector((state) => state.clientNotification);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllNotification());
	}, [dispatch]);

	return (
		<div>
			<Header label={"Notification"} setAction={null} />
			<main className="flex justify-center items-center">
				{notifications && (
					<AdminNotificationsTable columns={coulmns} rows={notifications} />
				)}
			</main>
		</div>
	);
};

export default ClientNot;
