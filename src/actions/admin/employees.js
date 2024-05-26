import { GET, CREATE, DELETE, GET_ONE, UPDATE } from "../../constants/crud";
import * as api from "../../api/admin/employees";
import { openToastar } from "../toastar";

export const getall = () => async (dispatch) => {
	try {
		const data = await api.getAll();
		dispatch({ type: GET + "_employee", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
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
		dispatch({ type: CREATE + "_employee", payload: data.data.result });
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

export const deleteEmployee = (id) => async (dispatch) => {
	try {
		const data = await api.deleteemployee(id);
		dispatch({ type: DELETE + "_employee", payload: id });
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

export const updatedEmployee = (formData, id) => async (dispatch) => {
	try {
		const data = await api.updatedemployee(formData, id);
		dispatch({ type: UPDATE + "_employee", payload: id });
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
