/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const schema = Yup.object().shape({
	name: Yup.string().required("Account name is required").min(3),
	department: Yup.string().required("Department name is required").min(3),
	email: Yup.string().email().required(),
	password: Yup.string().min(6).max(16),
});
