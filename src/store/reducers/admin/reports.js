import { CREATE, GET, UPDATE, DELETE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_reports":
			return [...state, action.payload];
		case GET + "_reports":
			return [...action.payload];
		case UPDATE + "_reports":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		case DELETE + "_reports":
			return state.filter((standard) => standard.id !== action.payload.id);
		default:
			return state;
	}
};
