/* eslint-disable react/prop-types */
import {
	faEdit,
	faEye,
	faClose,
	faTrash,
	faCheck,
	faClipboardList,
	faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteDialog from "../../UI/DeleteDialog";
import { useRef, useState } from "react";

import {
	addDefect,
	completeReport,
	downloadPDF,
} from "../../../api/employee/reports";
import { openToastar } from "../../../actions/toastar";

import { getAllReports } from "../../../actions/employee/reports";

import { useDispatch, useSelector } from "react-redux";

import DefectForm from "../../UI/report-form/DefectForm";

const EmpReportActions = ({
	getView,
	getEdit,
	getDelete,
	getSubReports,
	id,
}) => {
	const [openDialogId, setOpenDialogId] = useState(null);
	const [openDefectForm, setOpenDefectForm] = useState(false);
	const equipmentId = useSelector((state) => state.equipmentInfo)[0];
	const downloadLinkRef = useRef(null);

	const dispatch = useDispatch();

	const handleClickOpen = (id) => {
		setOpenDialogId(id);
	};

	const handleClose = () => {
		setOpenDialogId(null);
	};

	const handleDownloadPdf = async (id) => {
		try {
			const response = await downloadPDF(id);
			const blob = new Blob([response.data], { type: "application/pdf" });
			const url = URL.createObjectURL(blob);
			const a = downloadLinkRef.current;
			a.href = url;
			a.download = `${equipmentId.serialNumber}.pdf`;
			a.click();
			URL.revokeObjectURL(url);
		} catch (error) {
			console.error(
				"There has been a problem with your fetch operation:",
				error
			);
			dispatch(openToastar({ message: "Error downloading PDF" }));
		}
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
			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-green-500 text-white cursor-pointer"
				onClick={() => handleDownloadPdf(id)}
			>
				<FontAwesomeIcon icon={faDownload} />
			</p>

			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-yellow-500 text-white cursor-pointer"
				onClick={getSubReports}
			>
				<FontAwesomeIcon icon={faClipboardList} />
			</p>
			{/* <p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-yellow-500 text-white cursor-pointer"
				onClick={() => setOpenDefectForm(true)}
			>
				<FontAwesomeIcon icon={faClose} />
			</p> */}
			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-blue-600 text-white cursor-pointer"
				onClick={getView}
			>
				<FontAwesomeIcon icon={faEye} />
			</p>
			{/* <p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-yellow-500 text-white cursor-pointer"
				onClick={getEdit}
			>
				<FontAwesomeIcon icon={faEdit} />
			</p> */}

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
			<a
				ref={downloadLinkRef}
				style={{ display: "none" }}
				target="_blank"
				rel="noopener noreferrer"
			>
				Download PDF
			</a>
		</div>
	);
};

export default EmpReportActions;
