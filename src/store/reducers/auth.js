import { AUTH, LOGOUT } from "../../constants/action-types";

export default (
	state = {
		profile: JSON.parse(localStorage.getItem("profile")),
		isLoggedIn: false,
	},
	action
) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
			return { ...state, profile: action?.payload, isLoggedIn: true };
		case LOGOUT:
			localStorage.clear();
			return { ...state, profile: null, isLoggedIn: false };
		default:
			return state;
	}
};
