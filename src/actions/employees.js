import { GET } from "../constants/crud";
import * as api from "../api/employees";

export const getall = () => async (dispatch) => {
	try {
		const data = await api.getAll();
		dispatch({ type: GET, payload: data.data });
	} catch (error) {
		console.log(error);
	}
};
