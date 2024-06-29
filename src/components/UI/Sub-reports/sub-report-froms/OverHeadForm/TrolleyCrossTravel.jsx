/* eslint-disable react/prop-types */
import {
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};
const TrolleyCrossTravel = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		No1Crap: {
			XTGearbox: "",
			XTGears: "",
			Rollers: "",
			XTBrakes: "",
			XTMotor: "",
			OilLevels: "",
			HoistGears: "",
			Wheels: "",
		},
		No2Crap: {
			XTGearbox: "",
			XTGears: "",
			Rollers: "",
			XTBrakes: "",
			XTMotor: "",
			OilLevels: "",
			HoistGears: "",
			Wheels: "",
		},
	});

	useEffect(() => {
		updateFormData("trolleyCrossTravel", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion style={{ marginBlock: "10px" }}>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Trolley Cross Travel</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Accordion>
					<AccordionSummary>
						<Typography>No1 Crap</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{Object.entries(formData.No1Crap).map(([field, value]) => (
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
											No1Crap: {
												...prevState.No1Crap,
												[field]: e.target.value,
											},
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
				<Accordion>
					<AccordionSummary>
						<Typography>No2 Crap</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{Object.entries(formData.No2Crap).map(([field, value]) => (
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
											No2Crap: {
												...prevState.No2Crap,
												[field]: e.target.value,
											},
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
			</AccordionDetails>
		</Accordion>
	);
};

export default TrolleyCrossTravel;
