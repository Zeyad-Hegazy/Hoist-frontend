import { AUTH, LOGOUT } from "../constants/action-types";
import * as api from "../api/auth";
import { openToastar } from "./toastar";

export const login = (formData) => async (dispatch) => {
	try {
		const data = await api.logIn(formData);
		dispatch({ type: AUTH, payload: data.data.result });
		dispatch(openToastar({ message: data.data.message, status: data.status }));
		if (data.status === 200) {
			return true;
		}
	} catch (error) {
		console.log(error);
	}
};

export const logout = () => async (dispatch) => {
	try {
		await api.logOut();
		dispatch({ type: LOGOUT });
	} catch (error) {
		console.log(error);
	}
};
