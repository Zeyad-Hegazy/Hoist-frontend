/* eslint-disable no-case-declarations */
import { GET_ONE } from "../../constants/crud";

export default (state = { selected: {} }, action) => {
	switch (action.type) {
		case GET_ONE:
			const stateClone = { ...state };
			return (stateClone.selected = action.payload);

		default:
			return state;
	}
};
