import API from "../index";

export const getDDL = () => API.get("/employee/type/DDL");

export const getByCategory = (id) =>
	API.get("/employee/type/" + id + "/category");
