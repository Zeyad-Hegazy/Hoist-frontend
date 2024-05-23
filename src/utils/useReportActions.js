import { useDispatch } from "react-redux";

import {
	getOneReport,
	getAllReports,
	deleteOneReport,
} from "../actions/reports";

const useReportActions = (openForm) => {
	const dispatch = useDispatch();

	const getViewHandler = (id) => {
		console.log("report id", id);
		dispatch(getOneReport(id));
		openForm({
			action: "view",
			visible: true,
		});
	};

	const getEditHandler = (id) => {
		dispatch(getOneReport(id));
		openForm({
			action: "edit",
			visible: true,
		});
	};

	const getDeleteHandler = async (id) => {
		await dispatch(deleteOneReport(id));
		dispatch(getAllReports());
	};

	return { getViewHandler, getEditHandler, getDeleteHandler };
};

export default useReportActions;
