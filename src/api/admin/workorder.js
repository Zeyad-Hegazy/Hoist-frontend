import API from "../index";

export const getall = () => API.get("/admin/workorder");
export const create = (formData) => API.post("/admin/workorder", formData);
export const deleteone = (id) => API.delete("/admin/workorder/" + id);
export const getone = (id) => API.get("/admin/workorder/" + id);
export const getDDL = () => API.get("/admin/workorder/DDL");
export const updateone = (formData, id) =>
	API.patch("/admin/workorder/" + id, formData);
export const changestatus = (status, id) =>
	API.patch(`/admin/workorder/${id}/changeStatus`, null, {
		params: { status },
	});
