import { GET, CREATE, DELETE, GET_ONE, UPDATE } from "../../constants/crud";
import * as api from "../../api/admin/account";
import { openToastar } from "../toastar";

export const getAllAccounts = () => async (dispatch) => {
	try {
		const data = await api.getall();
		dispatch({ type: GET + "_account", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const getOneAccount = (id) => async (dispatch) => {
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

export const createOneAccount = (formData) => async (dispatch) => {
	try {
		const data = await api.create(formData);
		dispatch({ type: CREATE + "_account", payload: data.data.result });
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

export const deleteOneAccount = (id) => async (dispatch) => {
	try {
		const data = await api.deleteone(id);
		dispatch({ type: DELETE + "_account", payload: id });
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

export const updateOneAccount = (formData, id) => async (dispatch) => {
	try {
		const data = await api.updateone(formData, id);
		dispatch({ type: UPDATE + "_account", payload: id });
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
