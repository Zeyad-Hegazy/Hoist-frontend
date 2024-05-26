import { GET, CREATE, DELETE, GET_ONE, UPDATE } from "../../constants/crud";
import * as api from "../../api/admin/standards";
import { openToastar } from "../toastar";

export const getAll = () => async (dispatch) => {
	try {
		const data = await api.getall();
		dispatch({ type: GET + "_standard", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const getOne = (id) => async (dispatch) => {
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
		dispatch({ type: CREATE + "_standard", payload: data.data.result });
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

export const deleteOne = (id) => async (dispatch) => {
	try {
		const data = await api.deletone(id);
		dispatch({ type: DELETE + "_standard", payload: id });
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

export const updateOne = (formData, id) => async (dispatch) => {
	try {
		const data = await api.updatone(formData, id);
		dispatch({ type: UPDATE + "_standard", payload: id });
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
