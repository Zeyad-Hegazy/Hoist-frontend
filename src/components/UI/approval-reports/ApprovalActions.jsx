/* eslint-disable react/prop-types */
import {
	faCheck,
	faEdit,
	faEye,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteDialog from "../DeleteDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
	approveReport,
	getNonApprovedReports,
} from "../../../actions/admin/reports";

const ApprovalActions = ({ getEdit, getDelete, getView, id }) => {
	const [openDialogId, setOpenDialogId] = useState(null);
	const dispatch = useDispatch();

	const handleClickOpen = (id) => {
		setOpenDialogId(id);
	};

	const handleClose = () => {
		setOpenDialogId(null);
	};

	const approveHandler = async (id) => {
		await dispatch(approveReport(id));
		await dispatch(getNonApprovedReports());
	};

	return (
		<div className="flex justify-center items-center gap-3">
			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-green-500 text-white cursor-pointer"
				onClick={() => approveHandler(id)}
			>
				<FontAwesomeIcon icon={faCheck} />
			</p>
			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-blue-500 text-white cursor-pointer"
				onClick={getView}
			>
				<FontAwesomeIcon icon={faEye} />
			</p>
			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-yellow-500 text-white cursor-pointer"
				onClick={getEdit}
			>
				<FontAwesomeIcon icon={faEdit} />
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
		</div>
	);
};

export default ApprovalActions;
