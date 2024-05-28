import { getOneReport, repondToDefect } from "../../actions/client/defects";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientDefectTable from "../../components/Client-UI/defects/ClientDefectTable";
import ClientDefectForm from "./../../components/Client-UI/defects/DefectForm";
import { useParams } from "react-router-dom";

const coulmns = [
	{
		id: "name",
		label: "Defect Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "priority",
		label: "Priority",
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
		id: "createdAt",
		label: "Created At",
		minWidth: 170,
		align: "center",
	},
];

const Defects = () => {
	const { reportId } = useParams();
	const [formVisible, setFormVisible] = useState(false);
	const [defectId, setDefectId] = useState(null);

	const dispatch = useDispatch();

	const defects = useSelector((state) => state.select);

	useEffect(() => {
		dispatch(getOneReport(reportId));
	}, [dispatch, reportId]);

	return (
		<div>
			{/* <Header label={"Reports"} setAction={null} /> */}
			<main className="flex justify-center items-center">
				{formVisible && (
					<ClientDefectForm
						closeHandler={setFormVisible}
						confirmHandler={repondToDefect}
						getAll={getOneReport}
						reportId={reportId}
						defectId={defectId}
					/>
				)}
				{defects.defect && (
					<ClientDefectTable
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

export default Defects;
