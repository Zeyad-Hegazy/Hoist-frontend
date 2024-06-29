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

const MainPanel = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		freeMovement: "",
		inContactor: "",
		contactorsTimer: "",
		inProperSequence: "",
	});

	useEffect(() => {
		updateFormData("mainPanel", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion style={{ marginBlock: "10px" }}>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Main Panel</Typography>
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

export default MainPanel;
