/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const schema = Yup.object().shape({
	name: Yup.string().required("Category name is required").min(3),
});
