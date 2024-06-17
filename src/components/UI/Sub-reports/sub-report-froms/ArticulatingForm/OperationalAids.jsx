import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};

const OperationalAids = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		momentLimiter: "",
		boomAngleIndicator: "",
		boomLengthIndicator: "",
		antiTwoBlockDevice: "",
	});

	useEffect(() => {
		updateFormData("operationalAids", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Operational Aids</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{Object.entries(formData).map(([key, value]) => {
					return (
						<Box
							key={key}
							sx={{
								display: "flex",
								alignItems: "center",
								margin: "8px 0",
							}}
						>
							<Typography sx={{ width: "200px" }}>
								{key.replace(/([A-Z])/g, " $1")}
							</Typography>
							<RadioGroup
								row
								value={value}
								onChange={(e) =>
									setFormData((prevState) => ({
										...prevState,
										[key]: e.target.value,
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
								<FormControlLabel value="N/A" control={<Radio />} label="N/A" />
							</RadioGroup>
						</Box>
					);
				})}
			</AccordionDetails>
		</Accordion>
	);
};

export default OperationalAids;
