import API from "./index";

export const getAll = () => API.get("/admin/employees");

export const create = (formData) => API.post("/admin/employees", formData);
