import API from "../index";

export const getNotifications = () => API.get("/employee/report/defect");
export const getNotification = (id) => API.get("/employee/report/defect/" + id);
export const repondToNotification = (formData, id) =>
	API.patch("/employee/report/defect/" + id, formData);
