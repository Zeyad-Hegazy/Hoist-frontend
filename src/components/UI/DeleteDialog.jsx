/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../actions/employees";
import { getall } from "./../../actions/employees";

export default function DeleteDialog({ id, message, state, setStateClose }) {
	// const [open, setOpen] = React.useState(false);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setStateClose();
	};

	const dispatch = useDispatch();

	const handleDelete = async (id) => {
		await dispatch(deleteEmployee(id)); // Wait for delete operation to complete
		dispatch(getall()); // Dispatch getall action after delete
		handleClose(); // Close the dialog
	};

	return (
		<Dialog
			open={state}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} className="border-red-600">
					Cancel
				</Button>
				<Button
					onClick={() => handleDelete(id)}
					autoFocus
					className="bg-red-600"
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
