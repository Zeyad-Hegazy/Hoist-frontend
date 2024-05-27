/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, roles }) => {
	const auth = useSelector((state) => state.auth);

	const { isLoggedIn, profile } = auth;

	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	if (profile) {
		if (roles && !roles.includes(profile?.user?.role)) {
			return <Navigate to="/unauthorized" replace />;
		}
	}

	return element;
};

export default PrivateRoute;
