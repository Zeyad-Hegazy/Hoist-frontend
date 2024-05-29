import { LOGOUT } from "../constants/action-types";
import { decodeJWT } from "../utils/decodeJWT";

const checkTokenExpirationMiddleware =
	({ dispatch }) =>
	(next) =>
	(action) => {
		if (action.type !== LOGOUT) {
			const profile = JSON.parse(localStorage.getItem("profile"));
			if (profile && profile.token) {
				const token = profile.token;
				const decodedToken = decodeJWT(token);

				if (decodedToken) {
					const expirationDate = new Date(decodedToken.exp * 1000);
					const currentDate = new Date();

					if (currentDate >= expirationDate) {
						dispatch({ type: LOGOUT });
					}
				}
			}
		}
		return next(action);
	};

export default checkTokenExpirationMiddleware;
