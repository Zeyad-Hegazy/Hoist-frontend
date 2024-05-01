const initialState = {
	open: false,
	message: "",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "open":
			return { open: true, message: action.payload.message };

		case "close":
			return initialState;
		default:
			return state;
	}
};
