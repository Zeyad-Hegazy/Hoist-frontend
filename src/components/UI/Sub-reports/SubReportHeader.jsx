/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

import "../../Header.css"; // Import the CSS file
import { openToastar } from "../../../actions/toastar";
import { useDispatch } from "react-redux";

const SubReportHeader = ({
	openDefectForm,
	openSubReportForm,
	reportId,
	completeReport,
}) => {
	const dispatch = useDispatch();

	return (
		<div className="flex justify-between items-center custom-border">
			<h1 className="text-[30px]">Sub Reports Page</h1>

			<div className="flex justify-center items-center gap-4">
				<button
					className="px-4 py-2 bg-red-700 text-white rounded-lg"
					onClick={() => {
						openDefectForm(true);
					}}
				>
					<FontAwesomeIcon icon={faPlus} />
					<span className="ml-1">Add Defect</span>
				</button>
				<button
					className="px-4 py-2 bg-green-700 text-white rounded-lg"
					onClick={async () => {
						const response = await completeReport(reportId);
						dispatch(openToastar({ message: response.data.message }));
					}}
				>
					<FontAwesomeIcon icon={faCheck} />
					<span className="ml-1">Complete</span>
				</button>

				<button
					className="px-4 py-2 bg-blue-700 text-white rounded-lg"
					onClick={() => openSubReportForm(true)}
				>
					<FontAwesomeIcon icon={faPlus} />
					<span className="ml-1">Add Sub Report</span>
				</button>
			</div>
		</div>
	);
};

export default SubReportHeader;
