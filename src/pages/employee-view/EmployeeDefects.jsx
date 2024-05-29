import {
	getOneNotification,
	respondToDefect,
} from "../../actions/employee/clientNotification";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDefectTable from "./../../components/UI/defect/AdminDefectTable";
import AdminDefectForm from "./../../components/UI/defect/AdminDefectForm";
import { useParams } from "react-router-dom";

const coulmns = [
	{
		id: "name",
		label: "Defect Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "description",
		label: "Description",
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
		id: "comment",
		label: "Comment",
		minWidth: 170,
		align: "center",
	},
	{
		id: "clientName",
		label: "Client Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "inspectorResponse",
		label: "Inspector Response",
		minWidth: 170,
		align: "center",
	},
];

const EmployeeDefects = () => {
	const { reportId } = useParams();
	const [formVisible, setFormVisible] = useState(false);
	const [defectId, setDefectId] = useState(null);

	const dispatch = useDispatch();

	const defects = useSelector((state) => state.select);

	useEffect(() => {
		dispatch(getOneNotification(reportId));
	}, [dispatch, reportId]);

	return (
		<div>
			{/* <Header label={"Reports"} setAction={null} /> */}
			<main className="flex justify-center items-center">
				{formVisible && (
					<AdminDefectForm
						closeHandler={setFormVisible}
						confirmHandler={respondToDefect}
						getAll={getOneNotification}
						reportId={reportId}
						defectId={defectId}
					/>
				)}
				{defects.defect && (
					<AdminDefectTable
						columns={coulmns}
						rows={defects.defect}
						openForm={setFormVisible}
						setDefectId={setDefectId}
					/>
				)}
			</main>
		</div>
	);
};

export default EmployeeDefects;
