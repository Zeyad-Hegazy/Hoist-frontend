import {
	Radio,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControlLabel,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import { useRef, useEffect, useState } from "react";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
		capacityMarking: "",
		weightMarking: "",
		sheaves: "",
		safetyLatches: "",
		swivel: "",
		bearing: "",
		wedgeSocketEndFitting: "",
		reeving: "",
		ndtResults: "",
		asPerASMEB30102009: {
			zeroPercentDeformation: "",
			fivePercentHookThroatOpening: "",
			tenPercentHookWear: "",
			other: "",
		},
	});

	useEffect(() => {
		updateFormData("mainLoadBlockHook", {
			...formData,
			manufacturer: textRef.current.manufacturer,
			ratedCapacity: textRef.current.ratedCapacity,
			blockWeight: textRef.current.blockWeight,
			hookTramMeas: textRef.current.hookTramMeas,
		});
	}, [updateFormData, formData, textRef]);

	return (
		<Accordion style={{ marginBlock: "10px" }}>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Main Load Block Hook</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<>
					{Object.entries(textRef.current).map(([key, value]) => (
						<TextField
							key={key}
							label={key.replace(/([A-Z])/g, " $1")}
							fullWidth
							margin="normal"
							defaultValue={textRef.current[key]}
							onChange={(e) => (textRef.current[key] = e.target.value)}
						/>
					))}

					{Object.entries(formData).map(([key, value]) => {
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
						} else {
							return (
								<Accordion key={key}>
									<AccordionSummary expandIcon={<IconExpand />}>
										<Typography>{key.replace(/([A-Z])/g, " $1")}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										{Object.entries(formData[key]).map(([subKey, value]) => (
											<Box
												key={subKey}
												sx={{
													display: "flex",
													alignItems: "center",
													margin: "8px 0",
												}}
											>
												<Typography sx={{ width: "200px" }}>
													{subKey.replace(/([A-Z])/g, " $1")}
												</Typography>
												<RadioGroup
													row
													value={value}
													onChange={(e) =>
														setFormData((prevState) => ({
															...prevState,
															[key]: {
																...prevState[key],
																[subKey]: e.target.value,
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
									</AccordionDetails>
								</Accordion>
							);
						}
					})}
				</>
			</AccordionDetails>
		</Accordion>
	);
};

export default MainLoadBlockHook;
