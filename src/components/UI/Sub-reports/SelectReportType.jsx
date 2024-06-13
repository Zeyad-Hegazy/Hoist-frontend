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
import { useDispatch } from "react-redux";

import * as subs from "../../../constants/sub-report-types";

import ArticulatingForm from "./sub-report-froms/ArticulatingForm";
import OverHeadForm from "./sub-report-froms/OverHeadForm";
import ForkLiftForm from "./sub-report-froms/ForkLiftForm";
import OffshoreForm from "./sub-report-froms/OffshoreForm";
import MagneticForm from "./sub-report-froms/MagneticForm";
import TelescopicForm from "./sub-report-froms/TelescopicForm";

const SelectReportType = ({
	closeHandler,
	submitHandler,
	getAllHandler,
	reportId,
}) => {
	const dispatch = useDispatch();
	const [reportType, setReportType] = useState("Select Report Type");

	const handleChange = (event) => {
		setReportType(event.target.value);
	};

	const handleSubmit = async (formData) => {
		console.log("Report Type: ", reportType);
		console.log("Form Data Submitted: ", formData);
		await dispatch(submitHandler(formData, reportId, reportType));
		await dispatch(getAllHandler(reportId));
		closeHandler(false);
	};

	const renderForm = () => {
		switch (reportType) {
			case subs.ARTICULATING_BOOM_CRANE:
				return <ArticulatingForm handleSubmit={handleSubmit} />;
			// case subs.OVERHEAD_CRANE:
			// 	return <OverHeadForm handleSubmit={handleSubmit} />;
			// case subs.FORKLIFT_TRUCK_CHECKLIST:
			// 	return <ForkLiftForm handleSubmit={handleSubmit} />;
			// case subs.OFFSHORE_CRANE:
			// 	return <OffshoreForm handleSubmit={handleSubmit} />;
			// case subs.MAGNETIC_PARTICLE:
			// 	return <MagneticForm handleSubmit={handleSubmit} />;
			// case subs.TELESCOPIC_BOOM_CRANE:
			// 	return <TelescopicForm handleSubmit={handleSubmit} />;
			default:
				return null;
		}
	};

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
			<div className="bg-gray-950 p-8 rounded-lg max-h-screen overflow-y-scroll">
				<div className="min-w-80 mx-auto rounded-lg shadow-md relative mb-4">
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
								{/* <MenuItem value={subs.OVERHEAD_CRANE}>
									{subs.OVERHEAD_CRANE.split("_").join(" ")}
									</MenuItem>
									<MenuItem value={subs.FORKLIFT_TRUCK_CHECKLIST}>
										{subs.FORKLIFT_TRUCK_CHECKLIST.split("_").join(" ")}
									</MenuItem>
								<MenuItem value={subs.OFFSHORE_CRANE}>
									{subs.OFFSHORE_CRANE.split("_").join(" ")}
								</MenuItem>
								<MenuItem value={subs.MAGNETIC_PARTICLE}>
									{subs.MAGNETIC_PARTICLE.split("_").join(" ")}
								</MenuItem>
								<MenuItem value={subs.TELESCOPIC_BOOM_CRANE}>
									{subs.TELESCOPIC_BOOM_CRANE.split("_").join(" ")}
								</MenuItem> */}
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
