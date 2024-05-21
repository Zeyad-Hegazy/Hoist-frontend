/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
	getAllReports,
	createOneReport,
	updateOneReport,
} from "./../../actions/reports";

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

	const [FullFormVisible, setFullFormVisible] = useState(false);

	const handleClickOpenFull = () => {
		setFullFormVisible(true);
	};
	const handleClickCloseFull = () => {
		setFullFormVisible(false);
	};

	useEffect(() => {
		dispatch(getAllReports(equipmentId));
	}, [dispatch, equipmentId]);

	return (
		<div>
			<ReportHeader
				label={"Reports"}
				confirmHandler={createOneReport}
				openFullForm={handleClickOpenFull}
			/>
			{FullFormVisible && (
				<ReportForm
					state={FullFormVisible}
					closeModal={handleClickCloseFull}
					equipmentId={equipmentId}
				/>
			)}
			<main className="flex justify-center items-center">
				{reports && (
					<ReportTable
						columns={coulmns}
						rows={reports}
						openForm={handleClickOpenFull}
					/>
				)}
			</main>
		</div>
	);
};

export default Reports;
