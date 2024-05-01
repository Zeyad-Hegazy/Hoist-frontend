export const openToastar = (message) => async (dispatch) => {
	try {
		dispatch({ type: "open", payload: message });
	} catch (error) {
		console.log(error);
	}
};

export const closeToastar = () => async (dispatch) => {
	try {
		dispatch({ type: "close" });
	} catch (error) {
		console.log(error);
	}
};
