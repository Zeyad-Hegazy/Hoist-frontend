import API from "../index";

export const getall = () => API.get("/client/report/defect");
export const getone = (id) => API.get("/client/report/defect/" + id);
export const respond = (formData, id) =>
	API.patch("/client/report/defect/" + id, formData);
