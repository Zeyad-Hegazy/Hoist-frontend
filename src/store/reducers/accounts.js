import { CREATE, GET, UPDATE, DELETE } from "../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_account":
			return [...state, action.payload];
		case GET + "_account":
			return [...action.payload];
		case UPDATE + "_account":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_account":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
