import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	getOneReport,
	getAllReports,
	deleteOneReport,
	getSubReports as getSUBS,
} from "../actions/employee/reports";

const useEmpReportActions = (openForm) => {
	const navigate = useNavigate();
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

	const getSubReports = (id) => {
		dispatch(getOneReport(id));
		dispatch(getSUBS(id));
		navigate("sub-reports");
	};

	return { getViewHandler, getEditHandler, getDeleteHandler, getSubReports };
};

export default useEmpReportActions;
