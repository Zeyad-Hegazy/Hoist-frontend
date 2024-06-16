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
import { useEffect, useRef } from "react";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};

const LoadCharts = ({ updateFormData }) => {
	const textRef = useRef({
		perConfiguration: "",
		durable: "",
		legible: "",
		visibleFromOperatorsStation: "",
		secured: "",
	});

	useEffect(() => {
		updateFormData("loadCharts", textRef.current);
	}, [updateFormData, textRef]);

	return (
		<Accordion>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Load Charts</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{Object.entries(textRef.current).map(([key, value]) => {
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

export default LoadCharts;
