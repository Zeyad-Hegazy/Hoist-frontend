import { useDispatch } from "react-redux";
import { getone, getall, deleteEmployee } from "../actions/employees";
import { getOne, deleteOne, getAll } from "../actions/standards";
import { getOneIns, deleteOneIns, getAllIns } from "../actions/installation";
import {
	getOneClient,
	deleteOneClient,
	getAllClients,
} from "../actions/clients";

import {
	getOneCategory,
	deleteOneCategory,
	getAllCategories,
} from "../actions/category";

import { getOneType, deleteOneType, getAllTypes } from "../actions/types";

import {
	getOneDepartment,
	deleteOneDepartment,
	getAllDepartments,
} from "../actions/departments";

const useTableActions = (formName, openForm) => {
	const dispatch = useDispatch();

	let getViewHandler;
	let getEditHandler;
	let getDeleteHandler;

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
			};

			break;

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

			getDeleteHandler = async (id) => {
				await dispatch(deleteOne(id));
				dispatch(getAll());
			};

			break;

		case "installations":
			getViewHandler = (id) => {
				dispatch(getOneIns(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getOneIns(id));

				openForm({
					action: "edit",
					visible: true,
				});
			};

			getDeleteHandler = async (id) => {
				await dispatch(deleteOneIns(id));
				dispatch(getAllIns());
			};

			break;

		case "clients":
			getViewHandler = (id) => {
				dispatch(getOneClient(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getOneClient(id));

				openForm({
					action: "edit",
					visible: true,
				});
			};

			getDeleteHandler = async (id) => {
				await dispatch(deleteOneClient(id));
				dispatch(getAllClients());
			};

			break;

		case "category":
			getViewHandler = (id) => {
				dispatch(getOneCategory(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getOneCategory(id));

				openForm({
					action: "edit",
					visible: true,
				});
			};

			getDeleteHandler = async (id) => {
				await dispatch(deleteOneCategory(id));
				dispatch(getAllCategories());
			};

			break;

		case "type":
			getViewHandler = (id) => {
				dispatch(getOneType(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getOneType(id));

				openForm({
					action: "edit",
					visible: true,
				});
			};

			getDeleteHandler = async (id) => {
				await dispatch(deleteOneType(id));
				dispatch(getAllTypes());
			};

			break;

		case "departments":
			getViewHandler = (id) => {
				dispatch(getOneDepartment(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getOneDepartment(id));

				openForm({
					action: "edit",
					visible: true,
				});
			};

			getDeleteHandler = async (id) => {
				await dispatch(deleteOneDepartment(id));
				dispatch(getAllDepartments());
			};

			break;
	}

	return { getViewHandler, getEditHandler, getDeleteHandler };
};

export default useTableActions;
