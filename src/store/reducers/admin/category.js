import { CREATE, GET, UPDATE, DELETE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_category":
			return [...state, action.payload];
		case GET + "_category":
			return [...action.payload];
		case UPDATE + "_category":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_category":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
