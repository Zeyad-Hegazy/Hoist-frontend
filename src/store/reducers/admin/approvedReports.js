import { GET, UPDATE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case GET + "_reports_auth":
			return [...action.payload];
		case UPDATE + "_reports_auth":
			return state.map((standard) => {
				if (standard.id === action.payload.id) {
					return action.payload;
				}
				return standard;
			});
		default:
			return state;
	}
};
