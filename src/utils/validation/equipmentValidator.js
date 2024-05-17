/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const schema = Yup.object().shape({
	client: Yup.string().required("Client name is required"),
	department: Yup.string().required("Department name is required"),
	installation: Yup.string().required("Installation name is required"),
	category: Yup.string().required("Category name is required"),
	type: Yup.string().required("Type name is required"),
	plantNumber: Yup.string().required("Plant Number is required"),
	serialNumber: Yup.string().required("Serial Number is required"),
	standard: Yup.string().required("Standard is required"),
	discription: Yup.string().required("Discription is required"),
	location: Yup.string().required("Location is required"),
	swl: Yup.string().required("SWL is required"),
	manufacturer: Yup.string().required("Manufacturer is required"),
	manufacturerDate: Yup.string().optional().nullable(),
});
