import API from "./index";

export const getall = () => API.get("/admin/standard");
export const create = (formData) => API.post("/admin/standard", formData);
export const deletone = (id) => API.delete("/admin/standard/" + id);
export const getone = (id) => API.get("/admin/standard/" + id);
export const updatone = (formData, id) =>
	API.patch("/admin/standard/" + id, formData);
