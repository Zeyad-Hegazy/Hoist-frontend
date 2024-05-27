/* eslint-disable react/prop-types */

import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { schema } from "../../../utils/validation/defectValidator";
import useForm from "../../../utils/useForm";

import { HIGH, LOW, MEDIUM } from "./../../../constants/defect-types";
import { useState } from "react";
import convertToBase64, { isValidBase64 } from "../../../utils/convertToBase64";
import { useDispatch } from "react-redux";
import { openToastar } from "../../../actions/toastar";

import { addDefect } from "../../../api/admin/reports";

const DefectForm = ({
	title,
	closeHandler,
	confirmHandler,
	formAction,
	getAll,
	selected,
	reportId,
	equipmentId,
}) => {
	const initialState = {
		name: "",
		priority: "",
		description: "",
		image: "",
	};

	const [imagePreview, setImagePreview] = useState();
	const dispatch = useDispatch();

	const {
		formData,
		errors,
		isFormValid,
		handleChange,
		handleSubmit,
		validateField,
		setFormData,
	} = useForm({
		selected,
		formAction,
		initialState,
		closeHandler,
		confirmHandler,
		schema,
		getAll,
	});

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const base64 = await convertToBase64(file);
			if (isValidBase64(base64)) {
				setImagePreview(base64);
				setFormData((prevState) => ({
					...prevState,
					image: base64,
				}));
			} else {
				console.error("Invalid base64 string");
			}
		}
	};

	const createDefect = async (e) => {
		e.preventDefault();
		const response = await addDefect(formData, reportId);
		dispatch(openToastar({ message: response.data.message }));
		await dispatch(getAll(equipmentId));
		closeHandler(false);
	};

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
			<div className="bg-gray-950 p-8 rounded-lg">
				<div className="max-w-lg mx-auto rounded-lg shadow-md relative">
					<h2 className="text-2xl font-semibold mb-4">{title}</h2>
					<button
						className="absolute top-2 right-2"
						onClick={() => closeHandler(false)}
					>
						<FontAwesomeIcon icon={faClose} className="text-2xl" />
					</button>
					<form
						onSubmit={createDefect}
						className="flex justify-between items-start flex-wrap"
					>
						{/* Name */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Name"}
								name={"name"}
								type={"text"}
								variant="outlined"
								value={formData["name"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["name"] ? true : false}
								helperText={errors["name"]}
							/>
						</div>

						{/* Priority */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={false}
								variant="outlined"
								error={errors["priority"] ? true : false}
							>
								<InputLabel id="priority-label">Priority</InputLabel>
								<Select
									fullWidth={false}
									labelId="priority-label"
									id="priority"
									name="priority"
									value={formData["priority"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="Priority"
									className="w-[12rem]"
								>
									{[HIGH, MEDIUM, LOW].map((priority) => (
										<MenuItem key={priority} value={priority}>
											{priority}
										</MenuItem>
									))}
								</Select>
								{errors["priority"] && (
									<FormHelperText>{errors["priority"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* Description */}
						<div className={`mb-4 w-full`}>
							<TextField
								fullWidth={true}
								label={"Description"}
								name={"description"}
								type={"text"}
								variant="outlined"
								value={formData["description"]}
								onChange={handleChange}
								disabled={formAction === "view"}
							/>
						</div>

						{/* Image */}
						<div className="mb-4 flex flex-col">
							<label
								htmlFor={"image"}
								className="block mb-2 font-medium text-gray-700"
							>
								Defect Image
							</label>
							<div className="relative">
								<input
									type="file"
									id={"image"}
									name={"image"}
									accept="image/*"
									className="hidden"
									onChange={handleImageChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
								/>
								{formAction !== "view" && (
									<label
										htmlFor={"image"}
										className="px-4 py-2 bg-blue-400 text-black rounded-md cursor-pointer"
									>
										Choose File
									</label>
								)}
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview"
										className="mt-2 w-32 h-32 object-cover"
									/>
								)}
							</div>
						</div>

						{formAction !== "view" && (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="w-full mt-2"
								disabled={!isFormValid}
							>
								{formAction === "edit" ? "Edit" : "Add"}
							</Button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default DefectForm;
