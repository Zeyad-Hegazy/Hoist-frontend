import API from "../index";

export const getNotifications = () => API.get("/admin/report/defect");
export const getNotification = (id) => API.get("/admin/report/defect/" + id);
export const repondToNotification = (formData, id) =>
	API.patch("/admin/report/defect/" + id, formData);
