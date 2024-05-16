/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const schema = Yup.object().shape({
	name: Yup.string().required("client name is required").min(3),
	email: Yup.string().email().required(),
	phone: Yup.string().matches(
		/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
		"Invalid phone number"
	),
	fax: Yup.string().nullable().optional(),
	address: Yup.string(),
	password: Yup.string(),
	country: Yup.string(),
	parentClient: Yup.string().optional().nullable(),
});
