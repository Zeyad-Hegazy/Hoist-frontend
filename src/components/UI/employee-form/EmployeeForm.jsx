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
import { schema } from "../../../utils/validation/employeeValidator";
import useForm from "../../../utils/useForm";

import {
	EMPLOYEE,
	SUPERVISOR,
	INSPECTOR,
	TECHNICIAN,
} from "../../../constants/user-roles";

const EmployeeForm = ({
	title,
	closeHandler,
	confirmHandler,
	selected,
	getAll,
	formAction,
}) => {
	const initialState = {
		name: "",
		phone: "",
		email: "",
		password: "",
		role: "",
		signeture: "",
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
								label={"Employee Name"}
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
						{/* Phone */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Phone Number"}
								name={"phone"}
								type={"text"}
								variant="outlined"
								value={formData["phone"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["phone"] ? true : false}
								helperText={errors["phone"]}
							/>
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
						{/* Role */}
						<div className={`mb-4 w-full`}>
							<FormControl
								fullWidth
								variant="outlined"
								error={errors["role"] ? true : false}
							>
								<InputLabel id="role-label">Role</InputLabel>
								<Select
									labelId="role-label"
									id="role"
									name="role"
									value={formData["role"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="Role"
								>
									<MenuItem value={SUPERVISOR}>Supervisor</MenuItem>
									<MenuItem value={INSPECTOR}>Inspector</MenuItem>
									<MenuItem value={TECHNICIAN}>Technician</MenuItem>
									<MenuItem value={EMPLOYEE}>Employee</MenuItem>
									{/* Add more MenuItem components for other roles */}
								</Select>
								{errors["role"] && (
									<FormHelperText>{errors["role"]}</FormHelperText>
								)}
							</FormControl>
						</div>
						{/* <div className={`mb-4 w-full`}>
							<TextField
								fullWidth={true}
								label={"Role"}
								name={"role"}
								type={"text"}
								variant="outlined"
								value={formData["role"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["role"] ? true : false}
								helperText={errors["role"]}
							/>
						</div> */}

						{/* Signeture */}
						<div className="mb-4 flex flex-col">
							<label
								htmlFor={"signeture"}
								className="block mb-2 font-medium text-gray-700"
							>
								Signeture
							</label>
							<div className="relative">
								<input
									type="file"
									id={"signeture"}
									name={"signeture"}
									accept="image/*"
									className="hidden"
									onChange={handleImageChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
								/>
								{formAction !== "view" && (
									<label
										htmlFor={"signeture"}
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

export default EmployeeForm;
