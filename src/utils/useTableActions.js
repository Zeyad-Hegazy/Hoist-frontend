import { useDispatch } from "react-redux";
import { getone, getall, deleteEmployee } from "../actions/employees";
import {getOne,deleteOne, getAll} from "../actions/standards"

const useTableActions = (formName, openForm) => {
	const dispatch = useDispatch();

	let getViewHandler;
	let getEditHandler;
	let getDeleteHandler

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
			
			getDeleteHandler = async (id) => {
				await dispatch(deleteEmployee(id)); // Wait for delete operation to complete
		    dispatch(getall()); // Dispatch getall action after delete
			}

			break

		case "standards":
			getViewHandler = (id) => {
				dispatch(getOne(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getOne(id));

				openForm({
					action: "edit",
					visible: true,
				});
			};

			getDeleteHandler =async (id) => {
        await dispatch(deleteOne(id))
				dispatch(getAll())
			}
	}

	return { getViewHandler, getEditHandler,getDeleteHandler };
};

export default useTableActions;
