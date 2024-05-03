/* eslint-disable react/prop-types */
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";

const TableActions = ({ getView, getEdit, id }) => {
	const [openDialogId, setOpenDialogId] = useState(null);

	const handleClickOpen = (id) => {
		setOpenDialogId(id);
	};

	const handleClose = () => {
		setOpenDialogId(null);
	};
	return (
		<div className="flex justify-center items-center gap-3">
			<p
				className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-blue-600 text-white cursor-pointer"
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
				message={"Are You Sure To Delete This Employee?"}
			/>
		</div>
	);
};

export default TableActions;
