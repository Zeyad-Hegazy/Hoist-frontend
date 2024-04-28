/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Form = ({ title, fields, closeHandler }) => {
	const initialState = {};

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

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				setFormData((prevState) => ({
					...prevState,
					image: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className="max-w-lg mx-auto  rounded-lg shadow-md relative">
			<h2 className="text-2xl font-semibold mb-4">{title}</h2>
			<button className="absolute top-2 right-2" onClick={closeHandler}>
				<FontAwesomeIcon icon={faClose} className="text-2xl" />
			</button>
			<form onSubmit={handleSubmit}>
				{fields.map((field) =>
					field.type === "image" ? (
						<div key={field.name} className="mb-4">
							<label htmlFor={field.name} className="block mb-2">
								{field.label}
							</label>
							<input
								type="file"
								id={field.name}
								name={field.name}
								accept="image/*"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={imagePreview}
									alt="Preview"
									className="mt-2 w-32 h-32 object-cover"
								/>
							)}
						</div>
					) : (
						<TextField
							key={field.name}
							fullWidth
							label={field.label}
							name={field.name}
							type={field.type || "text"}
							variant="outlined"
							className="mb-4 mt-4"
							style={{ marginBlock: "1rem" }}
							value={formData[field.name]}
							onChange={handleChange}
						/>
					)
				)}
				<Button type="submit" variant="contained" color="primary" className="w-full">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default Form;
