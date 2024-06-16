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

const MainLoadBlockHook = ({ updateFormData }) => {
	const textRef = useRef({
		manufacturer: "",
		ratedCapacity: "",
		blockWeight: "",
		hookTramMeas: "",
	});

	const [formData, setFormData] = useState({
		mainBlockHook: {
			capacityMarking: "",
			weightMarking: "",
			sheaves: "",
			safetyLatches: "",
			swivel: "",
			bearing: "",
			wedgeSocketEndFitting: "",
			reeving: "",
			ndtResults: "",
		},
		asPerASMEB30_10_2009: {
			zeroPercentDeformation: "",
			fivePercentHookThroatOpening: "",
			tenPercentHookWear: "",
			other: "",
		},
	});

	useEffect(() => {
		updateFormData("mainLoadBlockHook", {
			manufacturer: textRef.current.manufacturer,
			ratedCapacity: textRef.current.ratedCapacity,
			blockWeight: textRef.current.blockWeight,
			hookTramMeas: textRef.current.hookTramMeas,
			...formData,
		});
	}, [updateFormData, formData, textRef]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Main Load Block Hook</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{Object.entries({
					manufacturer: textRef.current.manufacturer,
					ratedCapacity: textRef.current.ratedCapacity,
					blockWeight: textRef.current.blockWeight,
					hookTramMeas: textRef.current.hookTramMeas,
					...formData,
				}).map(([key, value]) => {
					if (typeof value === "object" && !Array.isArray(value)) {
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
									</>{" "}
								</AccordionDetails>
							</Accordion>
						);
					}
					return (
						<TextField
							key={key}
							label={key.replace(/([A-Z])/g, " $1")}
							fullWidth
							margin="normal"
							defaultValue={textRef.current[key]}
							onChange={(e) => (textRef.current[key] = e.target.value)}
						/>
					);
				})}
			</AccordionDetails>
		</Accordion>
	);
};

export default MainLoadBlockHook;
