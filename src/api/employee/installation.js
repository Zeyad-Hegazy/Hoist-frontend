import API from "../index";

export const getDDL = () => API.get("/employee/installation/DDL");

export const getByClient = (id) =>
	API.get("/employee/installation/" + id + "/client");
