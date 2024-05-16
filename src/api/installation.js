import API from "./index";

export const getall = () => API.get("/admin/installation");
export const create = (formData) => API.post("/admin/installation", formData);
export const deleteone = (id) => API.delete("/admin/installation/" + id);
export const getone = (id) => API.get("/admin/installation/" + id);
export const getDDL = () => API.get("/admin/installation/DDL");
export const updateone = (formData, id) =>
	API.patch("/admin/installation/" + id, formData);
