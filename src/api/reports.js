import API from "./index";

export const getall = (id) => API.get("/admin/report/" + id + "/report");
export const create = (formData) => API.post("/admin/report", formData);
export const deleteone = (id) => API.delete("/admin/report/" + id);
export const getone = (id) => API.get("/admin/report/" + id);
export const updateone = (formData, id) =>
	API.patch("/admin/report/" + id, formData);
