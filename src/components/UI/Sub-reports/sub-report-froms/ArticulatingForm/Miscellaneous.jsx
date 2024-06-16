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

const Miscellaneous = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		guardsCovers: "",
		externalLights: "",
		housekeeping: "",
		safetyWarningDecalsLabels: "",
		paintConditionCorrosion: "",
		other: "",
	});

	useEffect(() => {
		updateFormData("miscellaneous", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Miscellaneous</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<>
					{Object.entries(formData).map(([field, value]) => (
						<Box
							key={field}
							sx={{ display: "flex", alignItems: "center", margin: "8px 0" }}
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
										[field]: e.target.value,
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
								<FormControlLabel value="N/A" control={<Radio />} label="N/A" />
							</RadioGroup>
						</Box>
					))}
				</>
			</AccordionDetails>
		</Accordion>
	);
};

export default Miscellaneous;
