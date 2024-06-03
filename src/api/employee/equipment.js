import API from "../index";

export const getall = () => API.get("/employee/equipment");
export const create = (formData) => API.post("/employee/equipment", formData);
export const deleteone = (id) => API.delete("/employee/equipment/" + id);
export const getone = (id) => API.get("/employee/equipment/" + id);
export const getDDL = () => API.get("/employee/equipment/DDL");
export const getinfo = (id) => API.get("/employee/equipment/info/" + id);
export const addSub = (formData, id) =>
	API.patch("/employee/equipment/sub-equipment/" + id, formData);
export const getsubs = (id) =>
	API.get("/employee/equipment/sub-equipment/" + id);
export const updateone = (formData, id) =>
	API.patch("/employee/equipment/" + id, formData);
