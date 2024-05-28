import { GET } from "../../constants/crud";
import * as api from "../../api/client/equipment";
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
