import { CREATE, GET, UPDATE, DELETE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_workorder":
			return [...state, action.payload];
		case GET + "_workorder":
			return [...action.payload];
		case UPDATE + "_workorder":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_workorder":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
