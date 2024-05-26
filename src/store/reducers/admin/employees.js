/* eslint-disable no-case-declarations */
import { CREATE, GET, UPDATE, DELETE } from "../../../constants/crud";

export default (state = [], action) => {
	switch (action.type) {
		case CREATE + "_employee":
			return [...state, action.payload];
		case GET + "_employee":
			return [...action.payload];
		case UPDATE + "_employee":
			return state.map((employee) => {
				if (employee.id === action.payload.id) {
					return action.payload;
				}
				return employee;
			});
		case DELETE + "_employee":
			return state.filter((employee) => employee.id !== action.payload.id);
		default:
			return state;
	}
};
