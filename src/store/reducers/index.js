import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import employees from "./employees";
import toastar from "./toastar";
import select from "./selected";

const rootReducer = combineReducers({ auth, employees, select, toastar });

export default rootReducer;
