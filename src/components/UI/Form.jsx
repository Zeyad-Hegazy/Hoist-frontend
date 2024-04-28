/* eslint-disable react/prop-types */

import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

const Form = ({ title, fields, closeHandler, confirmHandler }) => {
	const initialState = {};

	const dispatch = useDispatch();

	fields.forEach((field) => {
		initialState[field.name] = "";
	});

	const [formData, setFormData] = useState(initialState);
	const [imagePreview, setImagePreview] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		console.log(file);
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

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(confirmHandler(formData));
		closeHandler();
		console.log(formData);
	};

	return (
		<div className="max-w-lg mx-auto rounded-lg shadow-md relative">
			<h2 className="text-2xl font-semibold mb-4">{title}</h2>
			<button className="absolute top-2 right-2" onClick={closeHandler}>
				<FontAwesomeIcon icon={faClose} className="text-2xl" />
			</button>
			<form onSubmit={handleSubmit}>
				{fields.map((field) =>
					field.type === "image" ? (
						<div key={field.name} className="mb-4 flex flex-col ">
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
								<label
									htmlFor={field.name}
									className="px-4 py-2 bg-blue-400 text-black rounded-md cursor-pointer"
								>
									Choose File
								</label>
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
							className="mb-4 mt-4 w-[50%]"
							// style={{ margin: "5px" }}
							value={formData[field.name]}
							onChange={handleChange}
						/>
					)
				)}

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mt-2"
				>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default Form;
