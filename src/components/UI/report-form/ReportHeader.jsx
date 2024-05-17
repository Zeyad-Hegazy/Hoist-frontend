/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";

const ReportHeader = ({ label, openFullForm }) => {
	return (
		<div className="flex justify-between items-center custom-border">
			<h1 className="text-[30px]">{label} Page</h1>
			<div className="flex gap-2">
				<button
					className="px-4 py-2 bg-blue-700 text-white rounded-lg"
					onClick={openFullForm}
				>
					<FontAwesomeIcon icon={faPlus} />
					<span className="ml-1">Add Report</span>
				</button>
			</div>
		</div>
	);
};

export default ReportHeader;
