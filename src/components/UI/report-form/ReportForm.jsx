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
import { TextField } from "@mui/material";

import { PCLTR, PTCR, PVCR } from "../../../constants/report-types";

import { getDDL as getWorkOrderDDL } from "../../../api/workorder";
import { getall as getStandardDDL } from "../../../api/standards";

import "../../Header.css";
import useForm from "../../../utils/useForm";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReportForm({ closeModal, state, equipmentId }) {
	const closeHandler = () => {
		closeModal(false);
	};

	const initialState = {
		equipment: equipmentId,
		type: "",
		examinationStandard: "",
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

	return (
		<React.Fragment>
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
							Add New Report
						</Typography>
						<Button autoFocus color="inherit" onClick={closeHandler}>
							Confirm
						</Button>
					</Toolbar>
				</AppBar>
				<div className="m-4">
					<div className="my-3 ">
						<form></form>
					</div>
				</div>
			</Dialog>
		</React.Fragment>
	);
}
