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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { schema } from "../../../utils/validation/workorderValidator";
import useForm from "../../../utils/useForm";
import { useEffect, useState } from "react";

import { getDDL } from "../../../api/admin/clients";
import { getDDL as getEmployeesDDL } from "../../../api/admin/employees";
import { getByClient as getDepartmentsDDL } from "../../../api/admin/departments";
import { getByClient as getInstallationDDL } from "../../../api/admin/installation";

const ClientForm = ({
	title,
	closeHandler,
	confirmHandler,
	selected,
	formAction,
	getAll,
}) => {
	const initialState = {
		inspector: "",
		client: "",
		department: "",
		installation: "",
		startDate: "",
		endDate: "",
		location: "",
		workingDays: "",
		description: "",
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

	const [clientDDL, setClientDDL] = useState([]);
	const [employeesDDL, setEmployeesDDL] = useState([]);
	const [departmentsDDL, setDepartmentsDDL] = useState([]);
	const [installationDDL, setInstallationDDL] = useState([]);

	useEffect(() => {
		const fetchclientDDL = async () => {
			try {
				const ddl = await getDDL();
				setClientDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		const fetchEmployeesDDL = async () => {
			try {
				const ddl = await getEmployeesDDL();
				setEmployeesDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		const fetchDepartmentsDDL = async () => {
			try {
				const ddl = await getDepartmentsDDL(formData.client);
				setDepartmentsDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		const fetchInstallaitonDDL = async () => {
			try {
				const ddl = await getInstallationDDL(formData.client);
				setInstallationDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		fetchEmployeesDDL();
		fetchclientDDL();
		formData.client && fetchDepartmentsDDL();
		formData.client && fetchInstallaitonDDL();
	}, [formData.client]);

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
						{/* Inspector */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={false}
								variant="outlined"
								error={errors["inspector"] ? true : false}
							>
								<InputLabel id="inspector-label">Inspector</InputLabel>
								<Select
									fullWidth={false}
									labelId="inspector-label"
									id="inspector"
									name="inspector"
									value={formData["inspector"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="Inspector"
									className="w-[12rem]"
								>
									{employeesDDL.map((inspector) => (
										<MenuItem key={inspector._id} value={inspector._id}>
											{inspector.name}
										</MenuItem>
									))}
								</Select>
								{errors["client"] && (
									<FormHelperText>{errors["client"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* Client  */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={false}
								variant="outlined"
								error={errors["client"] ? true : false}
							>
								<InputLabel id="client-label">Client</InputLabel>
								<Select
									fullWidth={false}
									labelId="client-label"
									id="client"
									name="client"
									value={formData["client"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="Client"
									className="w-[12rem]"
								>
									{clientDDL.map((client) => (
										<MenuItem key={client._id} value={client._id}>
											{client.name}
										</MenuItem>
									))}
								</Select>
								{errors["client"] && (
									<FormHelperText>{errors["client"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* Department  */}
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
									disabled={formAction === "view" || !formData.client}
									label="Department"
									className="w-[12rem]"
								>
									{departmentsDDL.map((department) => (
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

						{/* Installation  */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={false}
								variant="outlined"
								error={errors["installation"] ? true : false}
							>
								<InputLabel id="installation-label">Installation</InputLabel>
								<Select
									fullWidth={false}
									labelId="installation-label"
									id="installation"
									name="installation"
									value={formData["installation"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view" || !formData.client}
									label="Installation"
									className="w-[12rem]"
								>
									{installationDDL.map((installation) => (
										<MenuItem key={installation._id} value={installation._id}>
											{installation.name}
										</MenuItem>
									))}
								</Select>
								{errors["installation"] && (
									<FormHelperText>{errors["installation"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* Location */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Location"}
								name={"location"}
								type={"text"}
								variant="outlined"
								value={formData["location"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["location"] ? true : false}
								helperText={errors["location"]}
							/>
						</div>

						{/* Working Days */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Working Days"}
								name={"workingDays"}
								type={"number"}
								variant="outlined"
								value={formData["workingDays"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["workingDays"] ? true : false}
								helperText={errors["workingDays"]}
							/>
						</div>

						{/* TODO display date value on view mode */}
						{/* Start Date */}
						<div className="mb-4">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateField
									label="Start Date"
									onChange={(startDate) =>
										handleChange({
											target: { name: "startDate", value: startDate },
										})
									}
									format="DD MMM YYYY"
									readOnly={formAction === "view"}
									renderInput={(params) => (
										<TextField
											{...params}
											value={formData["startDate"]}
											fullWidth={false}
											variant="outlined"
											error={errors["startDate"] ? true : false}
											helperText={errors["startDate"]}
										/>
									)}
								/>
							</LocalizationProvider>
						</div>

						{/* End Date */}
						<div className="mb-4">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateField
									label="End Date"
									onChange={(endDate) =>
										handleChange({
											target: { name: "endDate", value: endDate },
										})
									}
									format="DD MMM YYYY"
									readOnly={formAction === "view"}
									renderInput={(params) => (
										<TextField
											{...params}
											value={formData["endDate"]}
											fullWidth={false}
											variant="outlined"
											disabled={formAction === "view"}
											error={errors["endDate"] ? true : false}
											helperText={errors["endDate"]}
										/>
									)}
								/>
							</LocalizationProvider>
						</div>

						{/* Description */}
						<div className={`mb-4 w-full`}>
							<TextField
								fullWidth={true}
								label={"description"}
								name={"description"}
								type={"text"}
								variant="outlined"
								value={formData["description"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["description"] ? true : false}
								helperText={errors["description"]}
							/>
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

export default ClientForm;
