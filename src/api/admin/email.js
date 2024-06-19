import API from "../index";

export const updateEmail = (formData, id) =>
	API.patch("/admin/email/" + id, formData);

export const getEmail = () => API.get("/admin/email");
