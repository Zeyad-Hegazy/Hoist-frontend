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

import { schema } from "../../../utils/validation/equipmentValidator";

import useForm from "../../../utils/useForm";
import { useEffect, useState } from "react";

import { getDDL } from "../../../api/admin/clients";
import { getDDL as getDepartmentsDDL } from "../../../api/admin/departments";
import { getDDL as getInstallationDDL } from "../../../api/admin/installation";
import { getDDL as getCategoryDDL } from "../../../api/admin/category";
import { getDDL as getTypeDDL } from "../../../api/admin/types";
import { getall as getStandardDDL } from "../../../api/admin/standards";

const EquipmentForm = ({
	title,
	closeHandler,
	confirmHandler,
	selected,
	formAction,
	getAll,
}) => {
	const initialState = {
		client: "",
		department: "",
		installation: "",
		type: "",
		category: "",
		plantNumber: "",
		serialNumber: "",
		standard: "",
		discription: "",
		location: "",
		swl: "",
		manufacturer: "",
		manufacturerDate: "",
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
	const [departmentsDDL, setDepartmentsDDL] = useState([]);
	const [installationDDL, setInstallationDDL] = useState([]);
	const [categoryDDL, setCategoryDDL] = useState([]);
	const [typeDDL, setTypeDDL] = useState([]);
	const [standardDDL, setStandardDDL] = useState([]);

	useEffect(() => {
		const fetchclientDDL = async () => {
			try {
				const ddl = await getDDL();
				setClientDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		const fetchDepartmentsDDL = async () => {
			try {
				const ddl = await getDepartmentsDDL();
				setDepartmentsDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		const fetchInstallaitonDDL = async () => {
			try {
				const ddl = await getInstallationDDL();
				setInstallationDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		const fetchCategoryDDL = async () => {
			try {
				const ddl = await getCategoryDDL();
				setCategoryDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		const fetchTypeDDL = async () => {
			try {
				const ddl = await getTypeDDL();
				setTypeDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		const fetchStandardDDL = async () => {
			try {
				const ddl = await getStandardDDL();
				setStandardDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		fetchclientDDL();
		fetchDepartmentsDDL();
		fetchInstallaitonDDL();
		fetchCategoryDDL();
		fetchTypeDDL();
		fetchStandardDDL();
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
									disabled={formAction === "view"}
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
									disabled={formAction === "view"}
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

						{/* Category  */}
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

						{/* Type  */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={false}
								variant="outlined"
								error={errors["type"] ? true : false}
							>
								<InputLabel id="type-label">Type</InputLabel>
								<Select
									fullWidth={false}
									labelId="type-label"
									id="type"
									name="type"
									value={formData["type"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="type"
									className="w-[12rem]"
								>
									{typeDDL.map((type) => (
										<MenuItem key={type._id} value={type._id}>
											{type.name}
										</MenuItem>
									))}
								</Select>
								{errors["type"] && (
									<FormHelperText>{errors["type"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* standard  */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={false}
								variant="outlined"
								error={errors["standard"] ? true : false}
							>
								<InputLabel id="standard-label">Standard</InputLabel>
								<Select
									fullWidth={false}
									labelId="standard-label"
									id="standard"
									name="standard"
									value={formData["standard"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="Standard"
									className="w-[12rem]"
								>
									{standardDDL.map((standard) => (
										<MenuItem key={standard._id} value={standard._id}>
											{standard.name}
										</MenuItem>
									))}
								</Select>
								{errors["standard"] && (
									<FormHelperText>{errors["standard"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* plantNumber */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Plant Number"}
								name={"plantNumber"}
								type={"text"}
								variant="outlined"
								value={formData["plantNumber"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["plantNumber"] ? true : false}
								helperText={errors["plantNumber"]}
							/>
						</div>

						{/* serialNumber */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Serial Number"}
								name={"serialNumber"}
								type={"text"}
								variant="outlined"
								value={formData["serialNumber"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["serialNumber"] ? true : false}
								helperText={errors["serialNumber"]}
							/>
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

						{/* Discription */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"discription"}
								name={"discription"}
								type={"text"}
								variant="outlined"
								value={formData["discription"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["discription"] ? true : false}
								helperText={errors["discription"]}
							/>
						</div>

						{/* SWL */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"SWL"}
								name={"swl"}
								type={"text"}
								variant="outlined"
								value={formData["swl"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["swl"] ? true : false}
								helperText={errors["swl"]}
							/>
						</div>

						{/* Manufacturer */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Manufacturer"}
								name={"manufacturer"}
								type={"text"}
								variant="outlined"
								value={formData["manufacturer"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["manufacturer"] ? true : false}
								helperText={errors["manufacturer"]}
							/>
						</div>

						{/* Manufacturer Date */}
						<div className="mb-4">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateField
									label="Manufacturer Date"
									onChange={(manufacturerDate) =>
										handleChange({
											target: {
												name: "manufacturerDate",
												value: manufacturerDate,
											},
										})
									}
									renderInput={(params) => (
										<TextField
											{...params}
											value={formData["manufacturerDate"]}
											fullWidth={false}
											variant="outlined"
											disabled={formAction === "view"}
											error={errors["manufacturerDate"] ? true : false}
											helperText={errors["manufacturerDate"]}
										/>
									)}
								/>
							</LocalizationProvider>
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

export default EquipmentForm;
