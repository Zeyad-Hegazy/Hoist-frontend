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

const OverloadTest = ({ updateFormData }) => {
	const formDataRef = useRef({
		loadTestReason: "",
		staticLoadTest: {
			testWeight: 0,
			radius: 0,
			height: 0,
			duration: 0,
			applianceWeightPosition: "",
		},
		dynamicLoadTest: {
			testWeight: 0,
			radius: 0,
			height: 0,
			duration: 0,
			applianceWeightPosition: "",
		},
		otherLoadTest: {
			testWeight: 0,
			radius: 0,
			height: 0,
			duration: 0,
			applianceWeightPosition: "",
		},
	});

	const [loadSupportDownDuringTest, setLoadSupportDownDuringTest] =
		useState(null);
	const [
		residualBlendingOutAfterLoadRemoving,
		setResidualBlendingOutAfterLoadRemoving,
	] = useState(null);

	useEffect(() => {
		updateFormData("overloadTest", {
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
				<Typography>Over load Test</Typography>
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
									onChange={(e) => {
										if (typeof value === "string")
											formDataRef.current[test][key] = e.target.value;
										else formDataRef.current[test][key] = +e.target.value;
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
						onChange={(e) =>
							setLoadSupportDownDuringTest(JSON.parse(e.target.value))
						}
					>
						<FormControlLabel value={true} control={<Radio />} label="Yes" />
						<FormControlLabel value={false} control={<Radio />} label="No" />
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
							setResidualBlendingOutAfterLoadRemoving(
								JSON.parse(e.target.value)
							)
						}
					>
						<FormControlLabel value={true} control={<Radio />} label="Yes" />
						<FormControlLabel value={false} control={<Radio />} label="No" />
					</RadioGroup>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default OverloadTest;
