import Header from "../../components/Header";
import { getNonApprovedReports } from "../../actions/admin/reports";
import ApprovedTable from "../../components/UI/approval-reports/ApprovedTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ReportForm from "./../../components/UI/report-form/ReportForm";

const coulmns = [
	{
		id: "defectLevel",
		label: " Defect Level",
		minWidth: 170,
		align: "center",
	},
	{
		id: "inspector",
		label: "Inspector",
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
		id: "dateOfLastInsp",
		label: "Date Of Last Inspiction",
		minWidth: 170,
		align: "center",
	},
	{
		id: "serialNumber",
		label: " Serial Number",
		minWidth: 170,
		align: "center",
	},
	{
		id: "categoryName",
		label: " Category",
		minWidth: 170,
		align: "center",
	},
	{
		id: "client",
		label: " Client",
		minWidth: 170,
		align: "center",
	},
];

const Auth = () => {
	const approvalReports = useSelector((state) => state.approvedReports);
	const selectedReport = useSelector((state) => state.select);
	const dispatch = useDispatch();

	const [FullFormVisible, setFullFormVisible] = useState({
		visible: false,
		action: "view",
	});

	const handleClickCloseFull = () => {
		setFullFormVisible((prevState) => {
			return {
				visible: false,
				action: prevState.action,
			};
		});
	};

	useEffect(() => {
		dispatch(getNonApprovedReports());
	}, [dispatch]);

	let form = (
		<ReportForm
			title="View Report Details"
			state={FullFormVisible.visible}
			closeHandler={handleClickCloseFull}
			selected={selectedReport}
			formAction={"view"}
		/>
	);

	if (FullFormVisible.action === "edit") {
		form = (
			<ReportForm
				title="Edit Report Details"
				state={FullFormVisible.visible}
				closeHandler={handleClickCloseFull}
				selected={selectedReport}
				formAction={"edit"}
			/>
		);
	}

	return (
		<div>
			<Header label={"Authentication"} />
			{FullFormVisible.visible && form}
			<ApprovedTable
				columns={coulmns}
				rows={approvalReports}
				openForm={setFullFormVisible}
			/>
		</div>
	);
};

export default Auth;
