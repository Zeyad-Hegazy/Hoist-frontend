import API from "../index";

export const getall = () => API.get("/admin/type");
export const create = (formData) => API.post("/admin/type", formData);
export const deleteone = (id) => API.delete("/admin/type/" + id);
export const getone = (id) => API.get("/admin/type/" + id);
export const getDDL = () => API.get("/admin/type/DDL");
export const updateone = (formData, id) =>
	API.patch("/admin/type/" + id, formData);

export const getByCategory = (id) => API.get("/admin/type/" + id + "/category");
