import API from "./index";

export const getall = () => API.get("/admin/account");
export const create = (formData) => API.post("/admin/account", formData);
export const deleteone = (id) => API.delete("/admin/account/" + id);
export const getone = (id) => API.get("/admin/account/" + id);
export const getDDL = () => API.get("/admin/account/DDL");
export const updateone = (formData, id) =>
	API.patch("/admin/account/" + id, formData);
