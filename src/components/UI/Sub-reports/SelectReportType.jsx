/* eslint-disable react/prop-types */
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useState } from "react";

import * as subs from "../../../constants/sub-report-types";

import ArticulatingForm from "./sub-report-froms/ArticulatingForm";
import OverHeadForm from "./sub-report-froms/OverHeadForm";

const SelectReportType = ({ closeHandler }) => {
	const [reportType, setReportType] = useState("Select Report Type");

	const handleChange = (event) => {
		setReportType(event.target.value);
	};

	const handleSubmit = (formData) => {
		console.log("Form Data Submitted: ", formData);
	};

	const renderForm = () => {
		switch (reportType) {
			case subs.ARTICULATING_BOOM_CRANE:
				return <ArticulatingForm handleSubmit={handleSubmit} />;
			case subs.OVERHEAD_CRANE:
				return <OverHeadForm handleSubmit={handleSubmit} />;
			default:
				return null;
		}
	};

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
			<div className="bg-gray-950 p-8 rounded-lg max-h-screen overflow-y-scroll">
				<div className="mx-auto rounded-lg shadow-md relative mb-4">
					<h2 className="text-2xl font-semibold mb-4">
						{reportType.split("_").join(" ")}
					</h2>
					<button
						className="absolute top-2 right-2"
						onClick={() => closeHandler(false)}
					>
						<FontAwesomeIcon icon={faClose} className="text-2xl" />
					</button>
					<form>
						<FormControl fullWidth>
							<InputLabel id="select-report-type-label">Report Type</InputLabel>
							<Select
								labelId="select-report-type-label"
								id="select-report-type"
								value={reportType}
								label="Report Type"
								onChange={handleChange}
							>
								<MenuItem value={subs.ARTICULATING_BOOM_CRANE}>
									{subs.ARTICULATING_BOOM_CRANE.split("_").join(" ")}
								</MenuItem>
								<MenuItem value={subs.OVERHEAD_CRANE}>
									{subs.OVERHEAD_CRANE.split("_").join(" ")}
								</MenuItem>
							</Select>
						</FormControl>
						{renderForm()}
					</form>
				</div>
			</div>
		</div>
	);
};

export default SelectReportType;
