/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./Header.css"; // Import the CSS file

const Header = ({ label, setAction }) => {
	return (
		<div className="flex justify-between items-center custom-border">
			<h1 className="text-[30px]">{label} Page</h1>
			{setAction && (
				<button
					className="px-4 py-2 bg-blue-700 text-white rounded-lg"
					onClick={() => {
						setAction({
							action: "create",
							visible: true,
						});
					}}
				>
					<FontAwesomeIcon icon={faPlus} />{" "}
					<span className="ml-1">Add New</span>
				</button>
			)}
		</div>
	);
};

export default Header;
