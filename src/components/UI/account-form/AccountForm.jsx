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
import { schema } from "../../../utils/validation/accountValidator";
import useForm from "../../../utils/useForm";
import { useEffect, useState } from "react";
import { getDDL } from "../../../api/departments";

const AccountForm = ({
	title,
	closeHandler,
	confirmHandler,
	selected,
	getAll,
	formAction,
}) => {
	const initialState = {
		name: "",
		department: "",
		email: "",
		password: "",
	};

	const {
		formData,
		errors,
		isFormValid,
		imagePreview,
		handleChange,
		handleImageChange,
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

	const [departmentDDL, setDepartmentDDL] = useState([]);

	useEffect(() => {
		const fetchDepartmentDDL = async () => {
			try {
				const ddl = await getDDL();
				setDepartmentDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		fetchDepartmentDDL();
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
								label={"Account Name"}
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

						{/* Department */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={false}
								variant="outlined"
								error={errors["department"] ? true : false}
							>
								<InputLabel id="department-label">Department</InputLabel>
								<Select
									fullWidth={false}
									labelId="department-label"
									id="department"
									name="department"
									value={formData["department"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="Department"
									className="w-[12rem]"
								>
									{departmentDDL.map((department) => (
										<MenuItem key={department._id} value={department._id}>
											{department.name}
										</MenuItem>
									))}
								</Select>
								{errors["department"] && (
									<FormHelperText>{errors["department"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* Email */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Email"}
								name={"email"}
								type={"email"}
								variant="outlined"
								value={formData["email"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["email"] ? true : false}
								helperText={errors["email"]}
							/>
						</div>

						{/* Password */}
						{formAction === "create" && (
							<div className={`mb-4`}>
								<TextField
									fullWidth={false}
									label={"Password"}
									name={"password"}
									type={"password"}
									variant="outlined"
									value={formData["password"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view" || formAction === "edit"}
									error={errors["password"] ? true : false}
									helperText={errors["password"]}
								/>
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

export default AccountForm;
