import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import employees from "./employees";
import toastar from "./toastar";

const rootReducer = combineReducers({ auth, employees, toastar });

export default rootReducer;
