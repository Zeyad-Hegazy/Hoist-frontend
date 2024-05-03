/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getall } from "../../actions/employees";

const convertToBase64 = async (fileOrUrl) => {
	if (typeof fileOrUrl === "string" && /^data:image\//.test(fileOrUrl)) {
		return fileOrUrl;
	}

	if (typeof fileOrUrl === "string" && /^(http|https):\/\//.test(fileOrUrl)) {
		console.log(fileOrUrl);
		const response = await fetch(fileOrUrl);
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(fileOrUrl);
	});
};

const Form = ({
	title,
	fields,
	closeHandler,
	confirmHandler,
	selected,
	formAction,
}) => {
	const initialState = {};

	const dispatch = useDispatch();

	fields.forEach((field) => {
		initialState[field.name] = "";
	});

	const [formData, setFormData] = useState(initialState);
	const [imagePreview, setImagePreview] = useState("");

	useEffect(() => {
		if (selected) {
			setFormData(selected);
			if (selected.signeture) {
				setImagePreview(selected.signeture);
			}
		}
	}, [selected]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const base64 = await convertToBase64(file);
			if (isValidBase64(base64)) {
				setImagePreview(base64);
				setFormData((prevState) => ({
					...prevState,
					signeture: base64,
				}));
			} else {
				console.error("Invalid base64 string");
			}
		}
	};

	function isValidBase64(str) {
		return /^data:image\//.test(str);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formDataCopy = { ...formData };

		if (formAction === "edit" && !isValidBase64(formDataCopy.signeture)) {
			try {
				const base64Signature = await convertToBase64(formDataCopy.signeture);
				formDataCopy.signeture = base64Signature;
			} catch (error) {
				console.error("Error converting image to base64:", error);
			}
		}

		if (formAction === "create") {
			await dispatch(confirmHandler(formDataCopy));
		} else if (formAction === "edit") {
			delete formDataCopy.password;
			await dispatch(confirmHandler(formDataCopy, selected._id));
		}
		dispatch(getall());
		closeHandler();
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
						className="flex justify-between items-start flex-wrap gap-4"
					>
						{fields.map((field) =>
							field.type === "image" ? (
								<div key={field.name} className="mb-4 flex flex-col">
									<label
										htmlFor={field.name}
										className="block mb-2 font-medium text-gray-700"
									>
										{field.label}
									</label>
									<div className="relative">
										<input
											type="file"
											id={field.name}
											name={field.name}
											accept="image/*"
											className="hidden"
											onChange={handleImageChange}
										/>
										{formAction !== "view" && (
											<label
												htmlFor={field.name}
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
							) : (
								<TextField
									key={field.name}
									fullWidth={field.fullWidth}
									label={field.label}
									name={field.name}
									type={field.type || "text"}
									variant="outlined"
									value={formData[field.name]}
									onChange={handleChange}
									disabled={
										formAction === "view" ||
										(formAction === "edit" && field.name === "password")
									}
								/>
							)
						)}

						{formAction !== "view" && (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="w-full mt-2"
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

export default Form;
