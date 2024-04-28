import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import employees from "./employees";

const rootReducer = combineReducers({ auth, employees });

export default rootReducer;
