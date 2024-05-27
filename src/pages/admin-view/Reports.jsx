/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
	getAllReports,
	createOneReport,
	updateOneReport,
} from "../../actions/admin/reports";

import ReportTable from "../../components/UI/report-form/ReportTable";

import ReportHeader from "../../components/UI/report-form/ReportHeader";
import ReportForm from "./../../components/UI/report-form/ReportForm";

const coulmns = [
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
		id: "type",
		label: "Type",
		minWidth: 170,
		align: "center",
	},
	{
		id: "status",
		label: "Status",
		minWidth: 170,
		align: "center",
	},
	{
		id: "defectsCount",
		label: "Defects Count",
		minWidth: 170,
		align: "center",
	},
	{
		id: "reportsCount",
		label: "Reports Count",
		minWidth: 170,
		align: "center",
	},

	{
		id: "createdAt",
		label: "Created At",
		minWidth: 170,
		align: "center",
	},
];

const Reports = ({ equipmentId }) => {
	const dispatch = useDispatch();
	const reports = useSelector((state) => state.reports);
	const selectedReport = useSelector((state) => state.select);

	const disabledAddReports = reports.some(
		(report) => report.status === "Uncompleted"
	);

	const [FullFormVisible, setFullFormVisible] = useState({
		visible: false,
		action: "create",
	});

	const handleClickOpenFull = () => {
		setFullFormVisible((prevState) => {
			return {
				visible: true,
				action: prevState.action,
			};
		});
	};
	const handleClickCloseFull = () => {
		setFullFormVisible((prevState) => {
			return {
				visible: false,
				action: prevState.action,
			};
		});
	};

	useEffect(() => {
		dispatch(getAllReports(equipmentId));
	}, [dispatch, equipmentId]);

	let form = (
		<ReportForm
			title="Add New Report"
			state={FullFormVisible.visible}
			closeHandler={handleClickCloseFull}
			equipmentId={equipmentId}
			formAction={"create"}
			confirmHandler={createOneReport}
		/>
	);

	if (FullFormVisible.action === "view") {
		form = (
			<ReportForm
				title="View Report Details"
				state={FullFormVisible.visible}
				closeHandler={handleClickCloseFull}
				selected={selectedReport}
				equipmentId={equipmentId}
				formAction={"view"}
				confirmHandler={createOneReport}
			/>
		);
	}

	if (FullFormVisible.action === "edit") {
		form = (
			<ReportForm
				title="Edit Report"
				state={FullFormVisible.visible}
				closeHandler={handleClickCloseFull}
				selected={selectedReport}
				equipmentId={equipmentId}
				formAction={"edit"}
				confirmHandler={updateOneReport}
			/>
		);
	}

	return (
		<div>
			<ReportHeader
				label={"Reports"}
				confirmHandler={createOneReport}
				openFullForm={handleClickOpenFull}
				disabledAddReports={disabledAddReports}
			/>
			{FullFormVisible.visible && form}
			<main className="flex justify-center items-center">
				{reports && (
					<ReportTable
						columns={coulmns}
						rows={reports}
						openForm={setFullFormVisible}
					/>
				)}
			</main>
		</div>
	);
};

export default Reports;
