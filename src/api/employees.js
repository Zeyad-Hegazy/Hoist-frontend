import API from "./index";

export const getAll = () => API.get("/admin/employees");
export const create = (formData) => API.post("/admin/employees", formData);
export const deleteemployee = (id) => API.delete("/admin/employees/" + id);
export const getemployee = (id) => API.get("/admin/employees/" + id);
export const getDDL = () => API.get("/admin/employees/DDL");
export const updatedemployee = (formData, id) =>
	API.patch("/admin/employees/" + id, formData);
