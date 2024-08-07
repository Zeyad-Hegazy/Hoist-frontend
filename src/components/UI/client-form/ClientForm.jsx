/* eslint-disable react/prop-types */

import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Autocomplete,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { schema } from "../../../utils/validation/clientValidator";
import useForm from "../../../utils/useForm";
import { useEffect, useState } from "react";

import { getParentsDDL } from "../../../api/admin/clients";

import countries from "../../../utils/countriesList.js";

const ClientForm = ({
	title,
	closeHandler,
	confirmHandler,
	selected,
	formAction,
	getAll,
}) => {
	const initialState = {
		name: "",
		email: "",
		phone: "",
		fax: "",
		address: "",
		password: "",
		parentClient: null,
		country: "",
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

	useEffect(() => {
		const fetchclientDDL = async () => {
			try {
				const ddl = await getParentsDDL();
				setClientDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching client list:", error);
			}
		};

		fetchclientDDL();
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
								label={"Client Name"}
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

						{/*Email  */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Email"}
								name={"email"}
								type={"text"}
								variant="outlined"
								value={formData["email"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["email"] ? true : false}
								helperText={errors["email"]}
							/>
						</div>

						{/*Phone  */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Phone"}
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

						{/*Fax  */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Fax"}
								name={"fax"}
								type={"text"}
								variant="outlined"
								value={formData["fax"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["fax"] ? true : false}
								helperText={errors["fax"]}
							/>
						</div>

						{/*Address  */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={false}
								label={"Address"}
								name={"address"}
								type={"text"}
								variant="outlined"
								value={formData["address"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["address"] ? true : false}
								helperText={errors["address"]}
							/>
						</div>

						{/* Password */}
						{formAction !== "view" && (
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

						{/* Parent */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={false}
								variant="outlined"
								error={errors["parentClient"] ? true : false}
							>
								<InputLabel id="client-label">Client</InputLabel>
								<Select
									fullWidth={false}
									labelId="client-label"
									id="client"
									name="parentClient"
									value={formData["parentClient"]}
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
								{errors["parentClient"] && (
									<FormHelperText>{errors["parentClient"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* country */}
						<div className={`mb-4 w-[44%]`}>
							<Autocomplete
								options={countries}
								getOptionLabel={(option) => option}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Country"
										variant="outlined"
										error={errors["country"] ? true : false}
										helperText={errors["country"]}
									/>
								)}
								value={
									countries.find(
										(country) => country === formData["country"]
									) || null
								}
								onChange={(event, newValue) => {
									handleChange({
										target: {
											name: "country",
											value: newValue || "",
										},
									});
									validateField("country", newValue || "");
								}}
								disabled={formAction === "view"}
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
