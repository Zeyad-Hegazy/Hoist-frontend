/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Input = ({
	half,
	name,
	handleChange,
	label,
	autoFocus,
	type,
	handleShowPassword,
}) => {
	return (
		<div className={`w-full ${half ? "sm:w-1/2" : "sm:w-full"} mb-4`}>
			<input
				className="relative w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
				name={name}
				onChange={handleChange}
				placeholder={label}
				autoFocus={autoFocus}
				type={type}
				required
			/>
			{name === "password" && (
				<button
					onClick={handleShowPassword}
					className="top-0 right-0 mt-2 mr-3 focus:outline-none"
				>
					<FontAwesomeIcon
						icon={type === "password" ? faEye : faEyeSlash}
						className="text-gray-500 hover:text-gray-700"
					/>
				</button>
			)}
		</div>
	);
};

export default Input;
