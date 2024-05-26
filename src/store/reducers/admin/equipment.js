import { CREATE, GET, UPDATE, DELETE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_equipment":
			return [...state, action.payload];
		case GET + "_equipment":
			return [...action.payload];
		case UPDATE + "_equipment":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_equipment":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
