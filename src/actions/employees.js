import { GET, CREATE, DELETE } from "../constants/crud";
import * as api from "../api/employees";

export const getall = () => async (dispatch) => {
	try {
		const data = await api.getAll();
		dispatch({ type: GET, payload: data.data });
	} catch (error) {
		console.log(error);
	}
};
export const createOne = (formData) => async (dispatch) => {
	try {
		const data = await api.create(formData);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteEmployee = (id) => async (dispatch) => {
	try {
		await api.deleteemployee(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error);
	}
};
