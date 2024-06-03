import { GET, CREATE, DELETE, GET_ONE, UPDATE } from "../../constants/crud";
import * as api from "../../api/employee/equipment";
import { openToastar } from "../toastar";

export const getAllEquipments = () => async (dispatch) => {
	try {
		const data = await api.getall();
		dispatch({ type: GET + "_equipment", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const getOneEquipment = (id) => async (dispatch) => {
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

export const createOneEquipment = (formData) => async (dispatch) => {
	try {
		const data = await api.create(formData);
		dispatch({ type: CREATE + "_equipment", payload: data.data.result });
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

export const deleteOneEquipment = (id) => async (dispatch) => {
	try {
		const data = await api.deleteone(id);
		dispatch({ type: DELETE + "_equipment", payload: id });
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

export const updateOneEquipment = (formData, id) => async (dispatch) => {
	try {
		const data = await api.updateone(formData, id);
		dispatch({ type: UPDATE + "_equipment", payload: id });
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

export const getEquipmentInfo = (id) => async (dispatch) => {
	try {
		const data = await api.getinfo(id);
		dispatch({ type: GET + "_equipment_info", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};

export const addSubEquipment = (formData, id) => async (dispatch) => {
	try {
		const data = await api.addSub(formData, id);
		dispatch({ type: UPDATE + "_equipment", payload: id });
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
