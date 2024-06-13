import { useEffect, useState } from "react";
import SubReportHeader from "../../components/UI/Sub-reports/SubReportHeader";
import DefectForm from "../../components/UI/report-form/DefectForm";
import { addDefect } from "../../api/admin/reports";
import {
	getAllReports,
	getSubReports,
	createSubReport,
} from "../../actions/admin/reports";
import { useDispatch, useSelector } from "react-redux";
import SelectReportType from "../../components/UI/Sub-reports/SelectReportType";

import SubReportTable from "../../components/UI/Sub-reports/SubReportsTable";

const columns = [
	{
		id: "reportName",
		label: "Report Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "name",
		label: "Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "type",
		label: "Report Type",
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

const SubReports = () => {
	const dispatch = useDispatch();
	const [openDefectForm, setOpenDefectForm] = useState(false);
	const [openSelect, setOpenSelect] = useState(false);
	const report = useSelector((state) => state.select);
	const equipment = useSelector((state) => state.equipmentInfo)[0];

	const subReports = useSelector((state) => state.subReports);

	useEffect(() => {
		dispatch(getSubReports(report._id));
	}, [dispatch, report]);

	return (
		<div>
			<SubReportHeader
				openDefectForm={setOpenDefectForm}
				reportId={report._id}
				openSubReportForm={setOpenSelect}
			/>
			{openDefectForm && (
				<DefectForm
					closeHandler={setOpenDefectForm}
					addHandler={addDefect}
					getAll={getAllReports}
					title={"Add Defect"}
					formAction={"create"}
					selected={null}
					reportId={report._id}
					equipmentId={equipment._id}
					defectLevel={equipment.defectLevel}
				/>
			)}
			{openSelect && (
				<SelectReportType
					closeHandler={setOpenSelect}
					submitHandler={createSubReport}
					getAllHandler={getSubReports}
					reportId={report._id}
				/>
			)}
			<main className="flex justify-center items-center">
				{subReports && <SubReportTable rows={subReports} columns={columns} />}
			</main>
		</div>
	);
};

export default SubReports;
