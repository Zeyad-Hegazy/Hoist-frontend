import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import employees from "./admin/employees";
import toastar from "./toastar";
import select from "./selected";
import standards from "./admin/standards";
import installations from "./admin/installations";
import clients from "./admin/clients";
import category from "./admin/category";
import types from "./admin/types";
import departments from "./admin/departments";
import accounts from "./admin/accounts";
import workorder from "./admin/workorder";
import equipment from "./admin/equipment";
import equipmentInfo from "./admin/equipmentInfo";
import reports from "./admin/reports";
import approvedReports from "./admin/approvedReports";

const rootReducer = combineReducers({
	auth,
	employees,
	select,
	toastar,
	standards,
	installations,
	clients,
	category,
	types,
	departments,
	accounts,
	workorder,
	equipment,
	equipmentInfo,
	reports,
	approvedReports,
});

export default rootReducer;
