import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};

const OperatorsCabStation = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		operatorsCab: {
			grabRailsStepsPlatform: "",
			antiSkidSurface: "",
			glass: "",
			windshieldWipers: "",
			doorsRestraints: "",
			mirrors: "",
			fireExtinguisher: "",
			seatsRestraints: "",
			seatsBelts: "",
		},
		controlsIndicators: {
			parkingBrake: "",
			swingBrake: "",
			positiveSwingLock: "",
			controlsForcesMovements: "",
			acceleratorThrottleControl: "",
			steering: "",
			hydraulicAirLeaks: "",
			hornWarningDevice: "",
			airPressure: "",
		},
		manualsDocuments: {
			operatorsManual: "",
			operatingInstructionsDecals: "",
			electrocutionWarningSign: "",
			handSignalChart: "",
		},
	});

	useEffect(() => {
		updateFormData("operatorsCabStation", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion style={{ marginBlock: "10px" }}>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Operators Cab Station</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{Object.entries(formData).map(([key, value]) => {
					return (
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
												onChange={(e) =>
													setFormData((prevState) => ({
														...prevState,
														[key]: {
															...prevState[key],
															[field]: e.target.value,
														},
													}))
												}
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
					);
				})}
			</AccordionDetails>
		</Accordion>
	);
};

export default OperatorsCabStation;
