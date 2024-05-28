import { GET } from "../../constants/crud";
import * as api from "../../api/client/accounts";
import { openToastar } from "../toastar";

export const getAllAccounts = () => async (dispatch) => {
	try {
		const data = await api.getall();
		dispatch({ type: GET + "_account", payload: data.data.result });
	} catch (error) {
		dispatch(
			openToastar({
				message: error.response.data.message,
				status: error.response.status,
			})
		);
	}
};
