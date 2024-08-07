import { useDispatch } from "react-redux";
import { getone, getall, deleteEmployee } from "../actions/admin/employees";
import { getOne, deleteOne, getAll } from "../actions/admin/standards";
import {
	getOneIns,
	deleteOneIns,
	getAllIns,
} from "../actions/admin/installation";
import {
	getOneClient,
	deleteOneClient,
	getAllClients,
} from "../actions/admin/clients";

import {
	getOneCategory,
	deleteOneCategory,
	getAllCategories,
} from "../actions/admin/category";

import { getOneType, deleteOneType, getAllTypes } from "../actions/admin/types";

import {
	getOneDepartment,
	deleteOneDepartment,
	getAllDepartments,
} from "../actions/admin/departments";

import {
	getOneAccount,
	deleteOneAccount,
	getAllAccounts,
} from "../actions/admin/account";

import {
	getOneWorkOrder,
	deleteOneWorkOrder,
	getWorkOrders,
} from "../actions/admin/workorder";

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

		case "accounts":
			getViewHandler = (id) => {
				dispatch(getOneAccount(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getOneAccount(id));

				openForm({
					action: "edit",
					visible: true,
				});
			};

			getDeleteHandler = async (id) => {
				await dispatch(deleteOneAccount(id));
				dispatch(getAllAccounts());
			};

			break;

		case "workorder":
			getViewHandler = (id) => {
				dispatch(getOneWorkOrder(id));

				openForm({
					action: "view",
					visible: true,
				});
			};

			getEditHandler = (id) => {
				dispatch(getOneWorkOrder(id));

				openForm({
					action: "edit",
					visible: true,
				});
			};

			getDeleteHandler = async (id) => {
				await dispatch(deleteOneWorkOrder(id));
				dispatch(getWorkOrders());
			};

			break;
	}

	return { getViewHandler, getEditHandler, getDeleteHandler };
};

export default useTableActions;
