import axios from "axios";

import { productionHost } from "../constants/host";

const API = axios.create({ baseURL: `${productionHost}/api/v1` });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}
	return req;
});

export default API;
