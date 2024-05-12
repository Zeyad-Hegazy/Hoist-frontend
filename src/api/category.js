import API from "./index";

export const getall = () => API.get("/admin/category");
export const create = (formData) => API.post("/admin/category", formData);
export const deleteone = (id) => API.delete("/admin/category/" + id);
export const getone = (id) => API.get("/admin/category/" + id);
export const getDDL = () => API.get("/admin/category/DDL");
export const updateone = (formData, id) =>
	API.patch("/admin/category/" + id, formData);
