import { GET } from "../../constants/crud";

export default (state = {}, action) => {
	switch (action.type) {
		case GET + "_equipment_info":
			return { ...action.payload };
		default:
			return state;
	}
};
