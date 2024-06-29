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

const HoistNo1 = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		gears: "",
		hook: "",
		ropeBlock: "",
		ropeGuide: "",
		pressureRing: "",
		motor: "",
		brake: "",
		limitSwitch: "",
		lubrication: "",
		oilLevels: "",
	});

	useEffect(() => {
		updateFormData("hoistNo1", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion style={{ marginBlock: "10px" }}>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Hoist No1</Typography>
			</AccordionSummary>
			<AccordionDetails>
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
							onChange={(e) =>
								setFormData((prevState) => ({
									...prevState,
									[field]: e.target.value,
								}))
							}
						>
							<FormControlLabel value="A" control={<Radio />} label="A" />
							<FormControlLabel value="B" control={<Radio />} label="B" />
							<FormControlLabel value="C" control={<Radio />} label="C" />
						</RadioGroup>
					</Box>
				))}
			</AccordionDetails>
		</Accordion>
	);
};

export default HoistNo1;
