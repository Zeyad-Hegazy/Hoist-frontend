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

const RotatingUpperStructure = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		structure: {
			turntable: "",
			counterweightFrame: "",
			counterweightMounting: "",
		},
		mechanisms: {
			electricalHydCollectorRing: "",
			swingMotorGearBox: "",
			hydraulicHosesTubesFittings: "",
			electricalWiring: "",
			mainHoistMotorValvesLines: "",
			mainHoistWrappingOnDrum: "",
			mainHoistMini2RopeWraps: "",
			wireRope: "",
		},
		decals: {
			electrocutionWarningSigns: "",
			conterweightWarningSign: "",
		},
	});

	useEffect(() => {
		updateFormData("rotatingUpperStructure", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Rotating Upper Structure</Typography>
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

export default RotatingUpperStructure;
