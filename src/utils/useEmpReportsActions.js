import { useDispatch } from "react-redux";

import {
	getOneReport,
	getAllReports,
	deleteOneReport,
} from "../actions/employee/reports";

const useEmpReportActions = (openForm) => {
	const dispatch = useDispatch();

	const getViewHandler = (id) => {
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

export default useEmpReportActions;
