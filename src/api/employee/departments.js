import API from "../index";

export const getDDL = () => API.get("/employee/department/DDL");

export const getByClient = (id) =>
	API.get("/employee/department/" + id + "/client");
