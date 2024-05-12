import { CREATE, GET, UPDATE, DELETE } from "../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_type":
			return [...state, action.payload];
		case GET + "_type":
			return [...action.payload];
		case UPDATE + "_type":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_type":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
