/* eslint-disable react/prop-types */
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormHelperText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import { schema } from "../../../utils/validation/installationVAlidator";
import useForm from "../../../utils/useForm";
import { useEffect, useState } from "react";
import { getDDL } from "../../../api/admin/clients";

const InstallationForm = ({
	title,
	closeHandler,
	confirmHandler,
	getAll,
	selected,
	formAction,
}) => {
	const initialState = {
		name: "",
		client: "",
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

	const [clientDDL, setClientDDL] = useState([]);

	useEffect(() => {
		const fetchclientDDL = async () => {
			try {
				const ddl = await getDDL();
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
								label={"Installation Name"}
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

						{/* Client */}
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

export default InstallationForm;
