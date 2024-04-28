import { AUTH } from "../constants/action-types";
import * as api from "../api/index";

export const login = (formData) => async (dispatch) => {
	try {
		const { data } = await api.logIn(formData);
		dispatch({ type: AUTH, data });
	} catch (error) {
		console.log(error);
	}
};
