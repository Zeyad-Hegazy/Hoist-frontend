import { CREATE, GET, UPDATE, DELETE } from "../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_standard":
			return [...state, action.payload];
		case GET +"_standard":
			return [...action.payload];
		case UPDATE + "_standard":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_standard":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
