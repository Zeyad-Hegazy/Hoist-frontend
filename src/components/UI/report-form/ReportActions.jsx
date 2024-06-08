/* eslint-disable react/prop-types */
import {
	faEdit,
	faEye,
	faClose,
	faTrash,
	faCheck,
	faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";

import { addDefect, completeReport } from "../../../api/admin/reports";
import { getAllReports } from "../../../actions/admin/reports";

import { useDispatch, useSelector } from "react-redux";
import { openToastar } from "../../../actions/toastar";
import DefectForm from "./DefectForm";

const ReportActions = ({ getView, getEdit, getDelete, getSubReports, id }) => {
	const [openDialogId, setOpenDialogId] = useState(null);
	const [openDefectForm, setOpenDefectForm] = useState(false);
	const equipmentId = useSelector((state) => state.equipmentInfo)[0];

	const dispatch = useDispatch();

	const handleClickOpen = (id) => {
		setOpenDialogId(id);
	};

	const handleClose = () => {
		setOpenDialogId(null);
	};
	return (
		<div className="flex justify-center items-center gap-3">
			{/* <p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-green-500 text-white cursor-pointer"
				onClick={async () => {
					const response = await completeReport(id);
					dispatch(getAllReports(equipmentId._id));
					dispatch(openToastar({ message: response.data.message }));
				}}
			>
				<FontAwesomeIcon icon={faCheck} />
			</p> */}
			{/* <p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-yellow-500 text-white cursor-pointer"
				onClick={() => setOpenDefectForm(true)}
			>
				<FontAwesomeIcon icon={faClose} />
			</p>
			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-blue-600 text-white cursor-pointer"
				onClick={getView}
			>
				<FontAwesomeIcon icon={faEye} />
			</p> */}

			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-yellow-500 text-white cursor-pointer"
				onClick={getSubReports}
			>
				<FontAwesomeIcon icon={faClipboardList} />
			</p>

			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full  bg-red-700 text-white cursor-pointer"
				onClick={() => handleClickOpen(id)}
			>
				<FontAwesomeIcon icon={faTrash} />
			</p>
			<DeleteDialog
				key={id}
				setStateClose={handleClose}
				state={openDialogId === id}
				id={id}
				message={"Are You Sure To Delete ?"}
				action={getDelete}
			/>

			{openDefectForm && (
				<DefectForm
					closeHandler={setOpenDefectForm}
					addHandler={addDefect}
					getAll={getAllReports}
					title={"Add Defect"}
					formAction={"create"}
					selected={null}
					reportId={id}
					equipmentId={equipmentId._id}
					defectLevel={equipmentId.defectLevel}
				/>
			)}
		</div>
	);
};

export default ReportActions;
