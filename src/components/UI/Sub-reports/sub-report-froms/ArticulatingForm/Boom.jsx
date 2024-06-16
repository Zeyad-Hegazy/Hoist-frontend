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

const Boom = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		mechanisms: {
			liftCylinders: "",
			telescopicCylinders: "",
			hydraulicHosesTubesFittings: "",
			holdingDevices: "",
		},
		structure: {
			boomSectionsAlignment: "",
			wearPads: "",
			equalExtension: "",
			sheaves: "",
			hoistLineDeadEnd: "",
			wireRopeRetainer: "",
			boomHingePin: "",
			boomHeadSection: "",
			boomHead: "",
			structure: "",
			other: "",
		},
	});

	useEffect(() => {
		updateFormData("boom", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Boom</Typography>
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

export default Boom;
