import API from "../index";

export const getall = (id) => API.get("/employee/report/" + id + "/report");
export const create = (formData) => API.post("/employee/report", formData);
export const deleteone = (id) => API.delete("/employee/report/" + id);
export const getone = (id) => API.get("/employee/report/" + id);
export const updateone = (formData, id) =>
	API.patch("/employee/report/" + id, formData);
export const completeReport = (id) =>
	API.patch("/employee/report/complete/" + id);

export const addDefect = (formData, id) =>
	API.post("/employee/report/defect/" + id, formData);
