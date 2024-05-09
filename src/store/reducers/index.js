import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import employees from "./employees";
import toastar from "./toastar";
import select from "./selected";
import standards from "./standards"

const rootReducer = combineReducers({ auth, employees, select, toastar,standards });

export default rootReducer;
