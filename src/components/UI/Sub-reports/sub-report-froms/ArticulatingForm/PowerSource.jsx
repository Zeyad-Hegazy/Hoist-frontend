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

const PowerSource = ({ updateFormData }) => {
	const textRef = useRef({
		manufacturer: "",
		type: "",
	});

	const [formData, setFormData] = useState({
		performance: "",
		exhaustSystemGuards: "",
		beltsHoses: "",
		guardsCoversRotatRecipParts: "",
	});

	useEffect(() => {
		updateFormData("powerSource", {
			...formData,
			engineMotor: {
				manufacturer: textRef.current.manufacturer,
				type: textRef.current.type,
			},
		});
	}, [updateFormData, formData]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Power Source</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{Object.entries({
					...formData,
				}).map(([key, value]) => {
					if (typeof value === "string") {
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
									<FormControlLabel
										value="N/A"
										control={<Radio />}
										label="N/A"
									/>
								</RadioGroup>
							</Box>
						);
					}
				})}
				<TextField
					label={"Manufacturer"}
					fullWidth
					margin="normal"
					defaultValue={textRef.current["manufacturer"]}
					onChange={(e) => (textRef.current["manufacturer"] = e.target.value)}
				/>
				<TextField
					label={"Type"}
					fullWidth
					margin="normal"
					defaultValue={textRef.current["type"]}
					onChange={(e) => (textRef.current["type"] = e.target.value)}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

export default PowerSource;
