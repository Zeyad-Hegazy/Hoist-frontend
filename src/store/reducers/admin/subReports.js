import { CREATE, GET, UPDATE, DELETE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_sub_reports":
			return [...state, action.payload];
		case GET + "_sub_reports":
			return [...action.payload];
		case UPDATE + "_sub_reports":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_sub_reports":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
