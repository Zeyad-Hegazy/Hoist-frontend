import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import employees from "./employees";
import toastar from "./toastar";
import select from "./selected";
import standards from "./standards";
import installations from "./installations";
import clients from "./clients";
import category from "./category";
import types from "./types";
import departments from "./departments";
import accounts from "./accounts";

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
});

export default rootReducer;
