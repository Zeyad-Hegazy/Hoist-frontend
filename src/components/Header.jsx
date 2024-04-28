/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Form from "./UI/Form";

const Header = ({ label, fields }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="flex justify-between items-center">
			<h1 className="text-[30px]">{label} Page</h1>
			<button
				className="px-4 py-2 bg-blue-700 text-white rounded-lg"
				onClick={openModal}
			>
				<FontAwesomeIcon icon={faPlus} /> <span className="ml-1">Add New</span>
			</button>
			{isModalOpen && (
				<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
					<div className="bg-gray-950 p-8 rounded-lg">
						<Form
							title={"Add New Employee"}
							fields={fields}
							closeHandler={closeModal}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
