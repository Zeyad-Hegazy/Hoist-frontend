import API from "../index";

export const getall = () => API.get("/admin/department");
export const create = (formData) => API.post("/admin/department", formData);
export const deleteone = (id) => API.delete("/admin/department/" + id);
export const getone = (id) => API.get("/admin/department/" + id);
export const getDDL = () => API.get("/admin/department/DDL");
export const updateone = (formData, id) =>
	API.patch("/admin/department/" + id, formData);

export const getByClient = (id) =>
	API.get("/admin/department/" + id + "/client");
