/* eslint-disable react/prop-types */
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@mui/material";

import { createParentClient } from "../../../api/admin/clients";

import "../../Header.css";
import { useDispatch } from "react-redux";
import { openToastar } from "../../../actions/toastar";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullClientForm({ closeModal, state }) {
	const [fieldCount, setFieldCount] = useState(1);

	const [formData, setFormData] = useState({
		name: "",
		departments: [],
	});

	const dispatch = useDispatch();

	const handleAddField = () => {
		setFieldCount((prev) => prev + 1);
	};

	const handleRemoveField = () => {
		setFieldCount((prev) => (prev > 1 ? prev - 1 : 1));
	};

	const handleClose = () => {
		closeModal(false);
	};

	const handleChangeClientName = (event) => {
		setFormData((prev) => ({
			...prev,
			name: event.target.value,
		}));
	};

	const handleChangeDepartmentName = (event, index) => {
		const { value } = event.target;
		setFormData((prev) => {
			const departments = [...prev.departments];
			departments[index] = { name: value };
			return { ...prev, departments };
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = await createParentClient(formData);
		dispatch(
			openToastar({
				message: data.data.message,
				status: data.status,
			})
		);

		handleClose();
	};

	return (
		<Dialog
			fullScreen
			open={state}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<FontAwesomeIcon icon={faClose} />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						Add New Client
					</Typography>
					<Button autoFocus color="inherit" onClick={handleSubmit}>
						Confirm
					</Button>
				</Toolbar>
			</AppBar>
			<div className="m-4">
				<form onSubmit={handleSubmit}>
					<div className="my-3">
						<h3 className="mb-2">Add Client Name</h3>
						<div className="shadow-md custom-border p-3 bg-gray-700">
							{/* Client Name */}
							<div>
								<TextField
									fullWidth={false}
									label={"Client Name"}
									name={"name"}
									type={"text"}
									variant="outlined"
									value={formData.name}
									onChange={handleChangeClientName}
								/>
							</div>
						</div>
					</div>
					<div className="my-4">
						<div className="flex gap-3 justify-between mb-2">
							<h3>Add Departments</h3>
							<div className="flex gap-2">
								<div
									className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-blue-700 text-white cursor-pointer"
									onClick={handleAddField}
								>
									<FontAwesomeIcon icon={faPlus} />
								</div>
								<div
									className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-red-700 text-white cursor-pointer"
									onClick={handleRemoveField}
								>
									<FontAwesomeIcon icon={faMinus} />
								</div>
							</div>
						</div>
						<div className="shadow-md custom-border p-3 bg-gray-700">
							<div className="flex flex-wrap gap-2">
								{[...Array(fieldCount)].map((_, index) => (
									<div key={index}>
										<TextField
											fullWidth={false}
											label={`Department Name ${index + 1}`}
											name={`name${index}`}
											type="text"
											variant="outlined"
											value={formData.departments[index]?.name || ""}
											onChange={(e) => handleChangeDepartmentName(e, index)}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<Button type="submit" color="primary" variant="contained">
						Submit
					</Button>
				</form>
			</div>
		</Dialog>
	);
}
