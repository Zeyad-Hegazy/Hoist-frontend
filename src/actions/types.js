import { GET, CREATE, DELETE, GET_ONE, UPDATE } from "../constants/crud";
import * as api from "../api/types";
import { openToastar } from "./toastar";

export const getAllTypes = () => async (dispatch) => {
	try {
		const data = await api.getall();
		dispatch({ type: GET + "_type", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const getOneType = (id) => async (dispatch) => {
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

export const createOneType = (formData) => async (dispatch) => {
	try {
		const data = await api.create(formData);
		dispatch({ type: CREATE + "_type", payload: data.data.result });
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

export const deleteOneType = (id) => async (dispatch) => {
	try {
		const data = await api.deleteone(id);
		dispatch({ type: DELETE + "_type", payload: id });
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

export const updateOneType = (formData, id) => async (dispatch) => {
	try {
		const data = await api.updateone(formData, id);
		dispatch({ type: UPDATE + "_type", payload: id });
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
