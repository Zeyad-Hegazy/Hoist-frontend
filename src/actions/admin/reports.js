import { GET, CREATE, DELETE, GET_ONE, UPDATE } from "../../constants/crud";
import * as api from "../../api/admin/reports";
import { openToastar } from "../toastar";

export const getAllReports = (id) => async (dispatch) => {
	try {
		const data = await api.getall(id);
		dispatch({ type: GET + "_reports", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const getOneReport = (id) => async (dispatch) => {
	try {
		const data = await api.getone(id);
		dispatch({ type: GET_ONE, payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const createOneReport = (formData) => async (dispatch) => {
	try {
		const data = await api.create(formData);
		dispatch({ type: CREATE + "_reports", payload: data.data.result });
		dispatch(openToastar({ message: data.data.message, status: data.status }));
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const deleteOneReport = (id) => async (dispatch) => {
	try {
		const data = await api.deleteone(id);
		dispatch({ type: DELETE + "_reports", payload: id });
		dispatch(openToastar({ message: data.data.message }));
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const updateOneReport = (formData, id) => async (dispatch) => {
	try {
		const data = await api.updateone(formData, id);
		dispatch({ type: UPDATE + "_reports", payload: id });
		dispatch(openToastar({ message: data.data.message, status: data.status }));
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const getNonApprovedReports = () => async (dispatch) => {
	try {
		const data = await api.getNotAuthReports();
		dispatch({ type: GET + "_reports_auth", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const approveReport = (id) => async (dispatch) => {
	try {
		const data = await api.approvereport(id);
		dispatch({ type: UPDATE + "_reports_auth", payload: data.data.result });
		dispatch(openToastar({ message: data.data.message }));
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};
