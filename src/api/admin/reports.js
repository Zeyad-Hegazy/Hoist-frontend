import API from "../index";

export const getall = (id) => API.get("/admin/report/" + id + "/report");
export const create = (formData) => API.post("/admin/report", formData);
export const deleteone = (id) => API.delete("/admin/report/" + id);
export const getone = (id) => API.get("/admin/report/" + id);
export const updateone = (formData, id) =>
	API.patch("/admin/report/" + id, formData);
export const completeReport = (id) => API.patch("/admin/report/complete/" + id);

export const addDefect = (formData, id) =>
	API.post("/admin/report/defect/" + id, formData);

export const getNotAuthReports = () => API.get("/admin/report/approval");
export const approvereport = (id) => API.patch("/admin/report/approval/" + id);

export const getSubReports = (id) =>
	API.get("/admin/report/" + id + "/sub-report");
