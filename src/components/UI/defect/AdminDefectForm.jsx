/* eslint-disable react/prop-types */

import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ACCEPTED, REJECTED } from "./../../../constants/repsond-action";

const AdminDefectForm = ({
	closeHandler,
	confirmHandler,
	getAll,
	reportId,
	defectId,
}) => {
	const initialState = {
		inspectorComment: "",
		inspectorResponse: "",
	};

	const dispatch = useDispatch();

	const [formData, setFormData] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await dispatch(confirmHandler(formData, defectId));
		dispatch(getAll(reportId));
		closeHandler(false);
	};

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
			<div className="bg-gray-950 p-8 rounded-lg">
				<div className="max-w-lg mx-auto rounded-lg shadow-md relative">
					<h2 className="text-2xl font-semibold mb-4">Repond To Defect</h2>
					<button
						className="absolute top-2 right-2"
						onClick={() => closeHandler(false)}
					>
						<FontAwesomeIcon icon={faClose} className="text-2xl" />
					</button>
					<form
						onSubmit={handleSubmit}
						className="flex justify-between items-start flex-wrap"
					>
						{/* Comment */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Comment"}
								name={"inspectorComment"}
								type={"text"}
								variant="outlined"
								value={formData["inspectorComment"]}
								onChange={handleChange}
							/>
						</div>

						{/* Response */}
						<div className={`mb-4 w-[12rem]`}>
							<FormControl fullWidth variant="outlined">
								<InputLabel id="inspectorResponse-label">Response</InputLabel>
								<Select
									labelId="inspectorResponse-label"
									id="inspectorResponse"
									name="inspectorResponse"
									value={formData["inspectorResponse"]}
									onChange={handleChange}
									label="Response"
								>
									<MenuItem value={ACCEPTED}>Accepted</MenuItem>
									<MenuItem value={REJECTED}>Rejected</MenuItem>
								</Select>
							</FormControl>
						</div>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="w-full mt-2"
						>
							Add
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminDefectForm;
