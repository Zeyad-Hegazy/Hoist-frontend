import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080/api/v1" });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).result.token
		}`;
	}
	return req;
});

export const logIn = (formData) => API.post("/auth/login", formData);
export const logOut = () => API.post("/auth/logout");
