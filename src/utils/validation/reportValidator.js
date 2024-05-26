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
	proofLoadApplied: Yup.string().optional().nullable(),
	foundDefectDangerToPerson: Yup.string().optional().nullable(),
	isImmediateDanger: Yup.boolean().optional().nullable(),
	isPotentialDanger: Yup.boolean().optional().nullable(),
	repairRenewalAlteration: Yup.string().optional().nullable(),
	testsCarriedOut: Yup.string().optional().nullable(),
	isFirstExamination: Yup.boolean().optional().nullable(),
	isEquipmentInstalledCorrectly: Yup.boolean().optional().nullable(),
	isEquipmentSafeToOperate: Yup.boolean().optional().nullable(),
});
