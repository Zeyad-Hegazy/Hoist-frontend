/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const schema = Yup.object().shape({
	name: Yup.string().required("Department name is required").min(3),
	client: Yup.string().required("Client name is required").min(3),
});
