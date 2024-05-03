import { useDispatch } from "react-redux";
import { getone } from "../actions/employees";

const useTableActions = (formName, openForm) => {
	const dispatch = useDispatch();

	let getViewHandler;
	let getEditHandler;

	switch (formName) {
		case "employees":
			getViewHandler = (id) => {
				dispatch(getone(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getone(id));
				openForm({
					action: "edit",
					visible: true,
				});
			};
	}

	return { getViewHandler, getEditHandler };
};

export default useTableActions;
