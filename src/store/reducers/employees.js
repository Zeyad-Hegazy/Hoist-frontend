/* eslint-disable no-case-declarations */
import { CREATE, GET, GET_ONE, UPDATE, DELETE } from "../../constants/crud";

export default (state = {}, action) => {
	switch (action.type) {
		case CREATE:
			return {
				...state,
				result: [...state.result, action.payload],
			};
		case GET:
			return action.payload;
		case GET_ONE:
			return {
				...state,
				selectedEmployee: action.payload,
			};
		case UPDATE:
			return {
				...state,
				employees: state.result.map((employee) => {
					if (employee.id === action.payload.id) {
						return action.payload;
					}
					return employee;
				}),
			};
		case DELETE:
			return {
				...state,
				employees: state.result.filter(
					(employee) => employee.id !== action.payload.id
				),
			};
		default:
			return state;
	}
};
