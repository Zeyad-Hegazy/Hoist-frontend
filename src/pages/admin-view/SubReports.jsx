import { useState } from "react";
import SubReportHeader from "../../components/UI/Sub-reports/SubReportHeader";
import DefectForm from "../../components/UI/report-form/DefectForm";
import { addDefect } from "../../api/admin/reports";
import { getAllReports } from "../../actions/admin/reports";
import { useSelector } from "react-redux";

const SubReports = () => {
	const [openDefectForm, setOpenDefectForm] = useState(false);
	const report = useSelector((state) => state.select);
	const equipment = useSelector((state) => state.equipmentInfo)[0];

	return (
		<div>
			<SubReportHeader
				openDefectForm={setOpenDefectForm}
				reportId={report._id}
			/>
			{/* {FullFormVisible.visible && form} */}
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
			{/* Open SubReport Form Here */}
			<main className="flex justify-center items-center">
				{/* Sub Reports Table here  */}
			</main>
		</div>
	);
};

export default SubReports;
