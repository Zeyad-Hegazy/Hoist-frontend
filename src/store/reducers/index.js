import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import employees from "./employees";
// import popup from "./popup";

const rootReducer = combineReducers({ auth, employees });

export default rootReducer;
