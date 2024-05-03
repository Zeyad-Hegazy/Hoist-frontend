import { GET, CREATE, DELETE, GET_ONE, UPDATE } from "../constants/crud";
import * as api from "../api/employees";
import { openToastar } from "./toastar";

export const getall = () => async (dispatch) => {
	try {
		const data = await api.getAll();
		dispatch({ type: GET, payload: data.data.result });
	} catch (error) {
		console.log(error);
	}
};

export const getone = (id) => async (dispatch) => {
	try {
		const data = await api.getemployee(id);
		dispatch({ type: GET_ONE, payload: data.data.result });
	} catch (error) {
		console.log(error);
	}
};

export const createOne = (formData) => async (dispatch) => {
	try {
		const data = await api.create(formData);
		dispatch({ type: CREATE, payload: data.data.result });
		dispatch(openToastar({ message: data.data.message, status: data.status }));
	} catch (error) {
		console.log(error);
	}
};

export const deleteEmployee = (id) => async (dispatch) => {
	try {
		const data = await api.deleteemployee(id);
		dispatch({ type: DELETE, payload: id });
		dispatch(openToastar({ message: data.data.message }));
	} catch (error) {
		console.log(error);
	}
};

export const updatedEmployee = (formData, id) => async (dispatch) => {
	try {
		const data = await api.updatedemployee(formData, id);
		dispatch({ type: UPDATE, payload: id });
		dispatch(openToastar({ message: data.data.message }));
	} catch (error) {
		console.log(error);
	}
};
