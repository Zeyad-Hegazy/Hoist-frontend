/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckCircle,
	faTimesCircle,
	faHourglassHalf,
	faPauseCircle,
	faClose,
} from "@fortawesome/free-solid-svg-icons";

import { changestatus } from "../../../api/admin/workorder";
import { openToastar } from "../../../actions/toastar";
import { getWorkOrders } from "../../../actions/admin/workorder";

const workOrderStatusObject = {
	COMPLETED: "completed",
	CANCELED: "canceled",
	INPROGRESS: "inProgress",
	HOLD: "hold",
};

const workOrderStatusIcons = {
	completed: faCheckCircle,
	canceled: faTimesCircle,
	inProgress: faHourglassHalf,
	hold: faPauseCircle,
};

const workOrderStatus = [
	workOrderStatusObject.COMPLETED,
	workOrderStatusObject.CANCELED,
	workOrderStatusObject.INPROGRESS,
	workOrderStatusObject.HOLD,
];

const StatusForm = ({ closeHandler, id }) => {
	const [formData, setFormData] = useState({ status: "" });
	const dispatch = useDispatch();

	const changeStatusHandler = async (status, id) => {
		try {
			const response = await changestatus(status, id);
			dispatch(getWorkOrders());
			dispatch(
				openToastar({ message: response.data.message, status: response.status })
			);
			closeHandler();
		} catch (error) {
			dispatch(
				openToastar({ message: "Error updating status", status: "error" })
			);
		}
	};

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
			<div className="bg-gray-950 p-8 rounded-lg">
				<div className="max-w-lg mx-auto rounded-lg shadow-md relative">
					<h2 className="text-2xl font-semibold mb-4">Status</h2>
					<button className="absolute top-2 right-2" onClick={closeHandler}>
						<FontAwesomeIcon icon={faClose} className="text-2xl" />
					</button>
					<form
						className="flex justify-between items-start flex-wrap"
						onSubmit={(e) => {
							e.preventDefault();
							changeStatusHandler(formData.status, id);
						}}
					>
						<div className="mb-4 w-[13rem]">
							<FormControl fullWidth variant="outlined">
								<InputLabel id="status-label">Status</InputLabel>
								<Select
									labelId="status-label"
									id="status"
									name="status"
									value={formData.status}
									onChange={(e) => setFormData({ status: e.target.value })}
									label="Status"
									className="w-full"
								>
									{workOrderStatus.map((status) => (
										<MenuItem key={status} value={status}>
											<FontAwesomeIcon
												icon={workOrderStatusIcons[status]}
												className="mr-2"
											/>
											{status.charAt(0).toUpperCase() + status.slice(1)}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="w-full mt-2"
						>
							Change
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default StatusForm;
