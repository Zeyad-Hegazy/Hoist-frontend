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

const Forks = ({ updateFormData }) => {
	const textRef = useRef({
		numberOfForks: 0,
		capacity: "",
	});

	const [formData, setFormData] = useState({
		surfaceCracks: "",
		straightnessOfBladeShank: "",
		forkAngleDeviation: "",
		differenceInHeightOfTips: "",
		forkHeelWear: "",
		positioningLock: "",
		forkMarking: "",
		other: "",
	});

	useEffect(() => {
		updateFormData("forks", {
			...formData,
			numberOfForks: +textRef.current.numberOfForks,
			capacity: textRef.current.capacity,
		});
	}, [updateFormData, formData]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Forks</Typography>
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
					label={"Number Of Forks"}
					fullWidth
					margin="normal"
					defaultValue={+textRef.current["numberOfForks"]}
					onChange={(e) => (textRef.current["numberOfForks"] = +e.target.value)}
				/>
				<TextField
					label={"Capacity"}
					fullWidth
					margin="normal"
					defaultValue={textRef.current["capacity"]}
					onChange={(e) => (textRef.current["capacity"] = e.target.value)}
				/>
			</AccordionDetails>
		</Accordion>
	);
};

export default Forks;
