/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const schema = Yup.object().shape({
	name: Yup.string().required("Employee name is required").min(3),
	phone: Yup.string().matches(
		/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
		"Invalid phone number"
	),
	signeture: Yup.string(),
	email: Yup.string().email().required(),
	password: Yup.string().min(6).max(16),
	role: Yup.string().nullable().optional(),
});
