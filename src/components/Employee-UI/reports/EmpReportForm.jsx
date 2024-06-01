/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import {
	FormGroup,
	FormControlLabel,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Switch,
} from "@mui/material";

import { PCLTR, PTCR, PVCR } from "../../../constants/report-types";

import { getDDL as getWorkOrderDDL } from "../../../api/employee/workorder";

import { schema } from "../../../utils/validation/reportValidator";

import "../../Header.css";
import useForm from "../../../utils/useForm";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const EmpReportForm = ({
	title,
	closeHandler,
	state,
	equipmentId,
	confirmHandler,
	selected,
	formAction,
	getAll,
}) => {
	const initialState = {
		equipment: equipmentId,
		type: "",
		dateOfExamination: "",
		dateOfNextExamination: "",
		jobNumber: "",
		proofLoadApplied: "",
		foundDefectDangerToPerson: "",
		isImmediateDanger: false,
		isPotentialDanger: false,
		repairRenewalAlteration: "",
		testsCarriedOut: "",
		isFirstExamination: false,
		isEquipmentInstalledCorrectly: false,
		isEquipmentSafeToOperate: false,
	};

	const {
		formData,
		errors,
		handleChange,
		handleSubmit,
		validateField,
		setFormData,
	} = useForm({
		selected,
		formAction,
		initialState,
		closeHandler,
		confirmHandler,
		schema,
		getAll,
	});

	const [workOrdersDDL, setWorkOrdersDDL] = React.useState([]);

	React.useEffect(() => {
		const fetchWorkOrdersDDL = async () => {
			try {
				const ddl = await getWorkOrderDDL();
				setWorkOrdersDDL(ddl.data.result);
			} catch (error) {
				console.error("Error fetching list:", error);
			}
		};

		fetchWorkOrdersDDL();
	}, [formData]);

	const handleSwitchChange = (event) => {
		const { name, checked } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: checked,
		}));
	};
	return (
		<Dialog
			fullScreen
			open={state}
			onClose={closeHandler}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={closeHandler}
						aria-label="close"
					>
						<FontAwesomeIcon icon={faClose} />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{title}
					</Typography>
					{/* <Button autoFocus color="inherit" onClick={closeHandler}>
							Confirm
						</Button> */}
				</Toolbar>
			</AppBar>
			<div className="m-4">
				<div className="my-3">
					<form className="w-full" onSubmit={handleSubmit}>
						{/* Type  */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={true}
								variant="outlined"
								error={errors["type"] ? true : false}
							>
								<InputLabel id="type-label">Type</InputLabel>
								<Select
									fullWidth={true}
									labelId="type-label"
									id="type"
									name="type"
									value={formData["type"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="type"
									className="w-full"
								>
									{[PCLTR, PTCR, PVCR].map((type) => (
										<MenuItem key={type.value} value={type.value}>
											{type.name}
										</MenuItem>
									))}
								</Select>
								{errors["type"] && (
									<FormHelperText>{errors["type"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* FIXED VALUE NOT EDITABLE */}
						{/* Standard  */}
						{/* <div className={`mb-4`}>
								<FormControl fullWidth={true} variant="outlined">
									<InputLabel id="examinationStandard-label">
										Standard
									</InputLabel>
									<Select
										fullWidth={true}
										labelId="examinationStandard-label"
										id="examinationStandard"
										name="examinationStandard"
										value={formData["examinationStandard"]}
										disabled={true}
										label="Standard"
										className="w-full"
									>
										<MenuItem value={formData["examinationStandard"]}>
											{formData["examinationStandard"]}
										</MenuItem>
									</Select>
								</FormControl>
							</div> */}

						{/* Date Of Examination */}
						<div className="mb-4">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateField
									fullWidth={true}
									label="Date Of Examination"
									onChange={(dateOfExamination) =>
										handleChange({
											target: {
												name: "dateOfExamination",
												value: dateOfExamination,
											},
										})
									}
									renderInput={(params) => (
										<TextField
											{...params}
											value={formData["dateOfExamination"]}
											fullWidth={true}
											variant="outlined"
											disabled={formAction === "view"}
											error={errors["dateOfExamination"] ? true : false}
											helperText={errors["dateOfExamination"]}
										/>
									)}
								/>
							</LocalizationProvider>
						</div>

						{/* Date Of Next Examination */}
						<div className="mb-4">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DateField
									fullWidth={true}
									label="Date Of Next Examination"
									onChange={(dateOfNextExamination) =>
										handleChange({
											target: {
												name: "dateOfNextExamination",
												value: dateOfNextExamination,
											},
										})
									}
									renderInput={(params) => (
										<TextField
											{...params}
											value={formData["dateOfNextExamination"]}
											fullWidth={true}
											variant="outlined"
											disabled={formAction === "view"}
											error={errors["dateOfNextExamination"] ? true : false}
											helperText={errors["dateOfNextExamination"]}
										/>
									)}
								/>
							</LocalizationProvider>
						</div>

						{/* Job Order  */}
						<div className={`mb-4`}>
							<FormControl
								fullWidth={true}
								variant="outlined"
								error={errors["jobNumber"] ? true : false}
							>
								<InputLabel id="jobNumber-label">Job Number</InputLabel>
								<Select
									fullWidth={true}
									labelId="jobNumber-label"
									id="jobNumber"
									name="jobNumber"
									value={formData["jobNumber"]}
									onChange={handleChange}
									onBlur={(e) => validateField(e.target.name, e.target.value)}
									disabled={formAction === "view"}
									label="Job Number"
									className="w-full"
								>
									{workOrdersDDL.map((jobNumber) => (
										<MenuItem key={jobNumber._id} value={jobNumber._id}>
											{jobNumber.jobNumber}
										</MenuItem>
									))}
								</Select>
								{errors["jobNumber"] && (
									<FormHelperText>{errors["jobNumber"]}</FormHelperText>
								)}
							</FormControl>
						</div>

						{/* Proof Load Applied */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={true}
								label={"Proof Load Applied"}
								name={"proofLoadApplied"}
								type={"text"}
								variant="outlined"
								value={formData["proofLoadApplied"]}
								onChange={handleChange}
								onBlur={(e) => validateField(e.target.name, e.target.value)}
								disabled={formAction === "view"}
								error={errors["proofLoadApplied"] ? true : false}
								helperText={errors["proofLoadApplied"]}
							/>
						</div>

						{/* Found Defect Danger To Person */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={true}
								label={"Found Defect Danger To Person"}
								name={"foundDefectDangerToPerson"}
								type={"text"}
								variant="outlined"
								value={formData["foundDefectDangerToPerson"]}
								onChange={handleChange}
								disabled={formAction === "view"}
								helperText={"Leave it empty if has no defect"}
							/>
						</div>

						<div className="flex w-[30%] justify-between">
							{/* Is Immediate Danger */}
							<div className={`mb-4 w-fit`}>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch
												checked={formData["isImmediateDanger"]}
												onChange={handleSwitchChange}
												name="isImmediateDanger"
												color="primary"
												disabled={
													formAction === "view" ||
													!formData["foundDefectDangerToPerson"]
												}
											/>
										}
										label="Is Immediate Danger?"
									/>
								</FormGroup>
							</div>

							{/* Is Potential Danger */}
							<div className={`mb-4 w-fit`}>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch
												checked={formData["isPotentialDanger"]}
												onChange={handleSwitchChange}
												name="isPotentialDanger"
												color="primary"
												disabled={
													formAction === "view" ||
													!formData["foundDefectDangerToPerson"]
												}
											/>
										}
										label="Is Potential Danger?"
									/>
								</FormGroup>
							</div>
						</div>

						{/* Repair Renewal Alteration */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={true}
								label={"Repair Renewal Alteration"}
								name={"repairRenewalAlteration"}
								type={"text"}
								variant="outlined"
								value={formData["repairRenewalAlteration"]}
								onChange={handleChange}
								disabled={formAction === "view"}
							/>
						</div>

						{/* Tests Carried Out */}
						<div className={`mb-4`}>
							<TextField
								fullWidth={true}
								label={"Tests Carried Out"}
								name={"testsCarriedOut"}
								type={"text"}
								variant="outlined"
								value={formData["testsCarriedOut"]}
								onChange={handleChange}
								disabled={formAction === "view"}
							/>
						</div>

						<div className="flex w-[57%] justify-between">
							{/* Is First Examination */}
							<div className={`mb-4 w-fit`}>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch
												checked={formData["isFirstExamination"]}
												onChange={handleSwitchChange}
												name="isFirstExamination"
												color="primary"
												disabled={formAction === "view"}
											/>
										}
										label="Is First Examination?"
									/>
								</FormGroup>
							</div>

							{/* Is Equipment Installed Correctly */}
							<div className={`mb-4 w-fit`}>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch
												checked={formData["isEquipmentInstalledCorrectly"]}
												onChange={handleSwitchChange}
												name="isEquipmentInstalledCorrectly"
												color="primary"
												disabled={formAction === "view"}
											/>
										}
										label="Is Equipment Installed Correctly?"
									/>
								</FormGroup>
							</div>

							{/* Is Equipment Safe To Operate */}
							<div className={`mb-4 w-fit`}>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch
												checked={formData["isEquipmentSafeToOperate"]}
												onChange={handleSwitchChange}
												name="isEquipmentSafeToOperate"
												color="primary"
												disabled={formAction === "view"}
											/>
										}
										label="Is Equipment Safe To Operate?"
									/>
								</FormGroup>
							</div>
						</div>

						{formAction !== "view" && (
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="w-full mt-2"
							>
								{formAction === "edit" ? "Edit" : "Add"}
							</Button>
						)}
					</form>
				</div>
			</div>
		</Dialog>
	);
};

export default EmpReportForm;
