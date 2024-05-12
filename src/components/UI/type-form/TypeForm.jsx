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

import { schema } from "../../../utils/validation/typesValidator";
import useForm from "../../../utils/useForm";
import { useEffect, useState } from "react";
import { getDDL } from "../../../api/category";

const TypeForm = ({
	title,
	closeHandler,
	confirmHandler,
	selected,
	formAction,
	getAll,
}) => {
	const initialState = {
		name: "",
		category: "",
	};

	const {
		formData,
		errors,
		isFormValid,
		handleChange,
		handleSubmit,
		validateField,
	} = useForm({
		selected,
		formAction,
		initialState,
		closeHandler,
		confirmHandler,
		schema,
		getAll,
	});

	const [categoryDDL, setCategoryDDL] = useState([]);

	useEffect(() => {
		const fetchCategoryDDL = async () => {
			try {
				const ddl = await getDDL();
				setCategoryDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		fetchCategoryDDL();
	}, []);

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
						className="flex justify-between items-start flex-wrap"
					>
						{/* Name */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Type Name"}
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

						{/* Category */}
						{formAction !== "edit" && (
							<div className={`mb-4`}>
								<FormControl
									fullWidth={false}
									variant="outlined"
									error={errors["category"] ? true : false}
								>
									<InputLabel id="category-label">Category</InputLabel>
									<Select
										fullWidth={false}
										labelId="category-label"
										id="category"
										name="category"
										value={formData["category"]}
										onChange={handleChange}
										onBlur={(e) => validateField(e.target.name, e.target.value)}
										disabled={formAction === "view"}
										label="Category"
										className="w-[12rem]"
									>
										{categoryDDL.map((category) => (
											<MenuItem key={category._id} value={category._id}>
												{category.name}
											</MenuItem>
										))}
									</Select>
									{errors["category"] && (
										<FormHelperText>{errors["category"]}</FormHelperText>
									)}
								</FormControl>
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

export default TypeForm;
