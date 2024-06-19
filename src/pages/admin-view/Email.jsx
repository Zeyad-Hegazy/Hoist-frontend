import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { updateEmail, getEmail } from "../../api/admin/email";
import { openToastar } from "../../actions/toastar";
import { useDispatch } from "react-redux";

const Email = () => {
	const [formData, setFormData] = useState({
		_id: "",
		email: "",
		password: "",
	});

	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await updateEmail(
				{ email: formData.email, password: formData.password },
				formData._id
			);
			dispatch(
				openToastar({ message: response.data.message, status: response.status })
			);
		} catch (error) {
			dispatch(
				openToastar({
					message: error.response?.data?.message || "An error occurred",
					status: error.response?.status || 500,
				})
			);
		}
	};

	const handleChange = (key, value) => {
		setFormData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	useEffect(() => {
		const fetchEmailData = async () => {
			const response = await getEmail();
			setFormData({
				_id: response.data.result._id,
				email: response.data.result.email,
				password: response.data.result.password,
			});
		};

		fetchEmailData();
	}, [dispatch]);

	return (
		<div className="flex justify-center items-center mt-12">
			<form
				onSubmit={handleSubmit}
				className="w-64 flex flex-col justify-between items-center flex-wrap"
			>
				{/* Email */}
				<div className="mb-4">
					<TextField
						fullWidth={false}
						label="Email"
						name="email"
						type="text"
						variant="outlined"
						value={formData.email}
						onChange={(e) => handleChange("email", e.target.value)}
					/>
				</div>

				{/* Password */}
				<div className="mb-4">
					<TextField
						fullWidth={false}
						label="Password"
						name="password"
						type="password"
						variant="outlined"
						value={formData.password}
						onChange={(e) => handleChange("password", e.target.value)}
					/>
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mt-2"
				>
					Update
				</Button>
			</form>
		</div>
	);
};

export default Email;
