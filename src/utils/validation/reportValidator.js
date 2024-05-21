import * as Yup from "yup";
import { PCLTR, PTCR, PVCR } from "../../constants/report-types";

export const schema = Yup.object().shape({
	jobNumber: Yup.string().required("Job Number is required"),
	type: Yup.string()
		.trim()
		.oneOf([PCLTR.value, PTCR.value, PVCR.value], "Invalid type")
		.required("Type is required"),
	dateOfExamination: Yup.date().optional(),
	dateOfNextExamination: Yup.date()
		.optional()
		.test(
			"is-after-dateOfExamination",
			"dateOfNextExamination must be after dateOfExamination",
			function (value) {
				const { dateOfExamination } = this.parent;
				if (dateOfExamination && value) {
					return new Date(value) > new Date(dateOfExamination);
				}
				return true;
			}
		),

	proofLoadApplied: Yup.string().required("Proof Load Applied in required"),
});
