import { GET, CREATE } from "../constants/crud";
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
		dispatch({ type: CREATE, payload: data.data });
	} catch (error) {
		console.log(error);
	}
};
