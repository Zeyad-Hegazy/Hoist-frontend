import { GET, GET_ONE, UPDATE } from "../../constants/crud";
import * as api from "../../api/employee/clientNotification";
import { openToastar } from "./../toastar";

export const getAllNotification = () => async (dispatch) => {
	try {
		const data = await api.getNotifications();
		dispatch({ type: GET + "_clientNotification", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const getOneNotification = (id) => async (dispatch) => {
	try {
		const data = await api.getNotification(id);
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

export const respondToDefect = (formData, id) => async (dispatch) => {
	try {
		const data = await api.repondToNotification(formData, id);
		dispatch({
			type: UPDATE + "_clientNotification",
			payload: data.data.result,
		});
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
