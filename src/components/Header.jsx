/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = ({ label }) => {
	return (
		<div className="flex justify-between items-center">
			<h1 className="text-[30px]">{label} Page</h1>
			<button className="px-4 py-2 bg-blue-700 text-white rounded-lg">
				<FontAwesomeIcon icon={faPlus} /> <span className="ml-1">Add New</span>
			</button>
		</div>
	);
};

export default Header;
