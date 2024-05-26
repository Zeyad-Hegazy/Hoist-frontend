import { AUTH, LOGOUT } from "../../constants/action-types";

export default (
	state = { profile: JSON.parse(localStorage.getItem("profile")) },
	action
) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
			return { ...state, profile: action?.payload };
		case LOGOUT:
			localStorage.clear();
			return { ...state, profile: null };
		default:
			return state;
	}
};
