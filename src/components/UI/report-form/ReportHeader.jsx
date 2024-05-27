/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ReportHeader = ({ label, openFullForm, disabledAddReports }) => {
	return (
		<div className="flex justify-between items-center custom-border">
			<h1 className="text-[30px]">{label} Page</h1>
			<div className="flex gap-2">
				<button
					className={`px-4 py-2 ${
						disabledAddReports ? "bg-blue-400" : "bg-blue-700"
					}  text-white rounded-lg`}
					onClick={openFullForm}
					disabled={disabledAddReports}
				>
					<FontAwesomeIcon icon={faPlus} />
					<span className="ml-1">Add Report</span>
				</button>
			</div>
		</div>
	);
};

export default ReportHeader;
