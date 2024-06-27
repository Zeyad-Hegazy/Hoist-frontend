/* eslint-disable react/prop-types */

import { TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

import { schema } from "../../../utils/validation/categoryValidator";
import useForm from "../../../utils/useForm";
import { useState } from "react";

const CategoryForm = ({
	title,
	closeHandler,
	confirmHandler,
	selected,
	formAction,
	getAll,
}) => {
	const initialState = {
		name: "",
		types: [],
	};
	const [fieldCount, setFieldCount] = useState(1);

	const handleAddField = () => {
		setFieldCount((prev) => prev + 1);
	};

	const handleRemoveField = () => {
		setFieldCount((prev) => (prev > 1 ? prev - 1 : 1));
	};

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

	const handleChangeDepartmentName = (event, index) => {
		const { value } = event.target;
		setFormData((prev) => {
			const types = [...prev.types];
			types[index] = { name: value };
			return { ...prev, types };
		});
	};

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
			<div className="bg-gray-950 p-8 rounded-lg">
				<div className="max-w-lg mx-auto rounded-lg shadow-md relative">
					<h2 className="text-2xl font-semibold mb-4">{title}</h2>
					<button className="absolute top-2 right-2" onClick={closeHandler}>
						<FontAwesomeIcon icon={faClose} className="text-2xl" />
					</button>
					<form
						onSubmit={handleSubmit}
						className="flex flex-col justify-between items-start flex-wrap"
					>
						{/* Name */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Category Name"}
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

						{formAction === "create" && (
							<div className="my-4">
								<div className="flex gap-3 justify-between mb-2">
									<h3>Add Types</h3>
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
													label={`Type Name ${index + 1}`}
													name={`name${index}`}
													type="text"
													variant="outlined"
													value={formData.types[index]?.name || ""}
													onChange={(e) => handleChangeDepartmentName(e, index)}
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
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

export default CategoryForm;
