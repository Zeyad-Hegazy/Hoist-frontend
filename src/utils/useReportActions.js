import { useDispatch } from "react-redux";

import {
	getOneReport,
	getAllReports,
	deleteOneReport,
	getSubReports as getSUBS,
} from "../actions/admin/reports";
import { useNavigate } from "react-router-dom";

const useReportActions = (openForm) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const getSubReports = async (id) => {
		await dispatch(getOneReport(id));
		// dispatch(getSUBS(id));
		navigate("sub-reports");
	};

	return { getViewHandler, getEditHandler, getDeleteHandler, getSubReports };
};

export default useReportActions;
