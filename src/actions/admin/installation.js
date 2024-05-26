import { GET, CREATE, DELETE, GET_ONE, UPDATE } from "../../constants/crud";
import * as api from "../../api/admin/installation";
import { openToastar } from "../toastar";

export const getAllIns = () => async (dispatch) => {
	try {
		const data = await api.getall();
		dispatch({ type: GET + "_installation", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const getOneIns = (id) => async (dispatch) => {
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

export const createOne = (formData) => async (dispatch) => {
	try {
		const data = await api.create(formData);
		dispatch({ type: CREATE + "_installation", payload: data.data.result });
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

export const deleteOneIns = (id) => async (dispatch) => {
	try {
		const data = await api.deleteone(id);
		dispatch({ type: DELETE + "_installation", payload: id });
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

export const updateOneIns = (formData, id) => async (dispatch) => {
	try {
		const data = await api.updateone(formData, id);
		dispatch({ type: UPDATE + "_installation", payload: id });
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
