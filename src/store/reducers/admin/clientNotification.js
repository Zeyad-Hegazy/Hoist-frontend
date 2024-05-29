import { GET, UPDATE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case GET + "_clientNotification":
			return [...action.payload];
		case UPDATE + "_clientNotification":
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
