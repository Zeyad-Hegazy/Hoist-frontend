/* eslint-disable no-useless-escape */
import * as Yup from "yup";

export const schema = Yup.object().shape({
	inspector: Yup.string().required("Inspector name is required"),
	client: Yup.string().required("Client name is required"),
	department: Yup.string().required("Department name is required"),
	installation: Yup.string().required("Installation name is required"),
	startDate: Yup.string().required("Start Date is required"),
	endDate: Yup.string().required("End Date is required"),
	location: Yup.string().required("location is required"),
	workingDays: Yup.string().optional().nullable(),
	description: Yup.string().optional().nullable(),
});
