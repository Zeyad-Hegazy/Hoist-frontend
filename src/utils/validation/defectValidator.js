/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const schema = Yup.object().shape({
	name: Yup.string().required("defect name is required").min(3),
	priority: Yup.string().nullable().optional(),
	description: Yup.string().nullable().optional(),
	image: Yup.string().nullable().optional(),
});
