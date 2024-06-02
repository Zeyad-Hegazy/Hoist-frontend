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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	FIXED,
	IGNORED,
	QUARANTINED,
} from "./../../../constants/repsond-action";
import { HIGH, LOW, MEDIUM } from "../../../constants/defect-types";

const ClientDefectForm = ({
	closeHandler,
	confirmHandler,
	getAll,
	reportId,
	defectId,
	defectLevel,
}) => {
	const initialState = {
		clientName: "",
		comment: "",
		action: "",
	};

	const dispatch = useDispatch();

	const [formData, setFormData] = useState(initialState);

	const [actions, setActions] = useState([QUARANTINED, FIXED, IGNORED]);

	useEffect(() => {
		switch (defectLevel) {
			case LOW:
				setActions([FIXED, IGNORED]);
				break;
			case MEDIUM:
				setActions([FIXED, QUARANTINED]);
				break;
			case HIGH:
				setActions([QUARANTINED]);
				break;
			default:
				setActions([QUARANTINED, FIXED, IGNORED]);
		}
	}, [defectLevel]);

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
						{/* Client Name */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Client Name"}
								name={"clientName"}
								type={"text"}
								variant="outlined"
								value={formData["clientName"]}
								onChange={handleChange}
							/>
						</div>

						{/* Comment */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Comment"}
								name={"comment"}
								type={"text"}
								variant="outlined"
								value={formData["comment"]}
								onChange={handleChange}
							/>
						</div>

						{/* Action */}
						<div className={`mb-4 w-full`}>
							<FormControl fullWidth variant="outlined">
								<InputLabel id="action-label">Action</InputLabel>
								<Select
									labelId="action-label"
									id="action"
									name="action"
									value={formData["action"]}
									onChange={handleChange}
									label="Action"
								>
									{actions.map((action) => (
										<MenuItem
											key={action}
											value={action}
											className="capitalize"
										>
											{action}
										</MenuItem>
									))}
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

export default ClientDefectForm;
