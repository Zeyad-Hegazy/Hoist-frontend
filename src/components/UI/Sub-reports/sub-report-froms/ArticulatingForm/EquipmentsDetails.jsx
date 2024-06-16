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

const EquipmentsDetails = ({ updateFormData }) => {
	const formDataRef = useRef({
		loadTestReason: "",
		staticLoadTest: {
			testWeight: "",
			radius: "",
			height: "",
			duration: "",
			applianceWeightPosition: "",
		},
		dynamicLoadTest: {
			testWeight: "",
			radius: "",
			height: "",
			duration: "",
			applianceWeightPosition: "",
		},
		otherLoadTest: {
			testWeight: "",
			radius: "",
			height: "",
			duration: "",
			applianceWeightPosition: "",
		},
	});

	const [loadSupportDownDuringTest, setLoadSupportDownDuringTest] =
		useState("");
	const [
		residualBlendingOutAfterLoadRemoving,
		setResidualBlendingOutAfterLoadRemoving,
	] = useState("");

	// const handleInputChange = (section, field, value) => {
	// 	formDataRef.current[section][field] = value;
	// 	updateFormData("equipmentsDetails", {
	// 		...formDataRef.current,
	// 		loadSupportDownDuringTest,
	// 		residualBlendingOutAfterLoadRemoving,
	// 	});
	// };

	useEffect(() => {
		updateFormData("equipmentsDetails", {
			...formDataRef.current,
			loadSupportDownDuringTest,
			residualBlendingOutAfterLoadRemoving,
		});
	}, [
		updateFormData,
		loadSupportDownDuringTest,
		residualBlendingOutAfterLoadRemoving,
	]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Equipment Details</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<TextField
					label="Load Test Reason"
					fullWidth
					margin="normal"
					defaultValue={formDataRef.current.loadTestReason}
					onChange={(e) =>
						(formDataRef.current.loadTestReason = e.target.value)
					}
				/>
				{["staticLoadTest", "dynamicLoadTest", "otherLoadTest"].map((test) => (
					<Accordion key={test}>
						<AccordionSummary expandIcon={<IconExpand />}>
							<Typography>{test.replace(/([A-Z])/g, " $1")}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{Object.entries(formDataRef.current[test]).map(([key, value]) => (
								<TextField
									key={key}
									label={key.replace(/([A-Z])/g, " $1")}
									fullWidth
									margin="normal"
									// defaultValue={value}
									// onChange={(e) => handleInputChange(test, key, e.target.value)}
									defaultValue={formDataRef.current[test].key}
									onChange={(e) => {
										console.log(key, formDataRef.current[test].key);
										formDataRef.current[test].key = e.target.value;
									}}
								/>
							))}
						</AccordionDetails>
					</Accordion>
				))}
				<Box sx={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
					<Typography sx={{ width: "200px" }}>
						Load Support Down During Test
					</Typography>
					<RadioGroup
						row
						value={loadSupportDownDuringTest}
						onChange={(e) => setLoadSupportDownDuringTest(e.target.value)}
					>
						<FormControlLabel value="true" control={<Radio />} label="Yes" />
						<FormControlLabel value="false" control={<Radio />} label="No" />
					</RadioGroup>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
					<Typography sx={{ width: "200px" }}>
						Residual Blending Out After Load Removing
					</Typography>
					<RadioGroup
						row
						value={residualBlendingOutAfterLoadRemoving}
						onChange={(e) =>
							setResidualBlendingOutAfterLoadRemoving(e.target.value)
						}
					>
						<FormControlLabel value="true" control={<Radio />} label="Yes" />
						<FormControlLabel value="false" control={<Radio />} label="No" />
					</RadioGroup>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default EquipmentsDetails;
