import { AUTH, LOGOUT } from "../../constants/action-types";

export default (
	state = { profile: JSON.parse(localStorage.getItem("profile")) },
	action
) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
			return { ...state, profile: action?.data };
		case LOGOUT:
			localStorage.clear();
			return { ...state, profile: null };
		default:
			return state;
	}
};
