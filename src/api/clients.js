import API from "./index";

export const getall = () => API.get("/admin/clients");
export const create = (formData) => API.post("/admin/clients", formData);
export const deletone = (id) => API.delete("/admin/clients/" + id);
export const getone = (id) => API.get("/admin/clients/" + id);
export const getDDL = () => API.get("/admin/clients/DDL");
export const updatone = (formData, id) =>
	API.patch("/admin/clients/" + id, formData);
