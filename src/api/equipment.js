import API from "./index";

export const getall = () => API.get("/admin/equipment");
export const create = (formData) => API.post("/admin/equipment", formData);
export const deleteone = (id) => API.delete("/admin/equipment/" + id);
export const getone = (id) => API.get("/admin/equipment/" + id);
export const getDDL = () => API.get("/admin/equipment/DDL");
export const getinfo = (id) => API.get("/admin/equipment/info/" + id);
export const getsubs = (id) => API.get("/admin/equipment/sub-equipment/" + id);
export const updateone = (formData, id) =>
	API.patch("/admin/equipment/" + id, formData);
