import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./../../actions/auth";
import Input from "../../components/UI/Input";

const initialState = {
	email: "",
	password: "",
};
const Login = () => {
	const [formData, setFormData] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const user = useSelector((state) => state.auth.profile);

	const handleShowPassword = () => {
		setShowPassword((prevShowPasswrd) => !prevShowPasswrd);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(login(formData));

		navigate("/dashboard");
	};

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center">
			<form onSubmit={handleSubmit}>
				<Input
					name="email"
					label="Emial Address"
					handleChange={handleChange}
					type="emial"
				/>
				<Input
					name="password"
					label="Password"
					handleChange={handleChange}
					type={showPassword ? "text" : "password"}
					handleShowPassword={handleShowPassword}
				/>

				<button type="submit" className="p-4 w-full bg-green-700">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
