import React, { useState, useEffect } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};

const OperatorsStation = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		operatorStation: {
			accessGrabRailsSteps: "",
			fireExtinguisher: "",
			seatsRestains: "",
			seatsBelts: "",
			others: "",
		},
		controlsIndicators: {
			controlsIdentified: "",
			instrumentsGauges: "",
			electricalSwitchesFunctions: "",
			horn: "",
			lights: "",
			accelerator: "",
			liftingControlsBackToNeutralPositionWhenReleased: "",
			others: "",
		},
		manualsDocuments: {
			operatorManual: "",
			operatingInstructDecals: "",
			others: "",
		},
	});

	useEffect(() => {
		updateFormData("operatorStation", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Operator's Station</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{Object.entries(formData).map(([key, value]) => (
					<Accordion key={key}>
						<AccordionSummary expandIcon={<IconExpand />}>
							<Typography>{key.replace(/([A-Z])/g, " $1")}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<>
								{Object.entries(formData[key]).map(([field, value]) => (
									<Box
										key={field}
										sx={{
											display: "flex",
											alignItems: "center",
											margin: "8px 0",
										}}
									>
										<Typography sx={{ width: "200px" }}>
											{field.replace(/([A-Z])/g, " $1")}
										</Typography>
										<RadioGroup
											row
											value={value}
											onChange={(e) => {
												setFormData((prevState) => ({
													...prevState,
													[key]: {
														...prevState[key],
														[field]: e.target.value,
													},
												}));
											}}
										>
											<FormControlLabel
												value="Pass"
												control={<Radio />}
												label="Pass"
											/>
											<FormControlLabel
												value="Fail"
												control={<Radio />}
												label="Fail"
											/>
											<FormControlLabel
												value="N/A"
												control={<Radio />}
												label="N/A"
											/>
										</RadioGroup>
									</Box>
								))}
							</>
						</AccordionDetails>
					</Accordion>
				))}
			</AccordionDetails>
		</Accordion>
	);
};

export default OperatorsStation;
