import { GET, GET_ONE, UPDATE } from "../../constants/crud";
import * as api from "../../api/client/defects";
import { openToastar } from "../toastar";

export const getAllReports = (id) => async (dispatch) => {
	try {
		const data = await api.getall(id);
		dispatch({ type: GET + "_defects", payload: data.data.result });
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

export const repondToDefect = (formData, id) => async (dispatch) => {
	try {
		const data = await api.respond(formData, id);
		dispatch({ type: UPDATE + "_defects", payload: id });
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
