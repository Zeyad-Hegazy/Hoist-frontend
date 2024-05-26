import { CREATE, GET, UPDATE, DELETE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_departments":
			return [...state, action.payload];
		case GET + "_departments":
			return [...action.payload];
		case UPDATE + "_departments":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_departments":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
