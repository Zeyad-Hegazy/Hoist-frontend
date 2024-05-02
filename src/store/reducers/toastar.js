const initialState = {
	open: false,
	message: "",
	status: 200,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "open":
			return {
				open: true,
				message: action.payload.message,
				status: state.status,
			};

		case "close":
			return initialState;
		default:
			return state;
	}
};
