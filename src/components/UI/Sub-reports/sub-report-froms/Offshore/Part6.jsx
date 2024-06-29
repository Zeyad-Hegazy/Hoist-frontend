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
import { useCallback, useEffect, useRef, useState } from "react";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};

const Part6 = ({ onUpdate }) => {
	const textRefwinchHoistBrakes = useRef({ comment: "" });
	const textRefslewMachinery = useRef({ comment: "" });

	const [formData, setFormData] = useState({
		winchHoistBrakes: { condition: "" },
		slewMachinery: { condition: "" },
	});

	const updateParent = useCallback(() => {
		onUpdate("part6", {
			winchHoistBrakes: {
				...formData.winchHoistBrakes,
				comment: textRefwinchHoistBrakes.current.comment,
			},
			slewMachinery: {
				...formData.slewMachinery,
				comment: textRefslewMachinery.current.comment,
			},
		});
	}, [onUpdate, formData]);

	const debouncedUpdateParent = useCallback(_.debounce(updateParent, 300), [
		updateParent,
	]);

	useEffect(() => {
		debouncedUpdateParent();
		return () => {
			debouncedUpdateParent.cancel();
		};
	}, [formData, debouncedUpdateParent]);

	// Handle comment change
	const handleCommentChange = (key, value) => {
		if (key === "winchHoistBrakes") {
			textRefwinchHoistBrakes.current.comment = value;
		} else if (key === "slewMachinery") {
			textRefslewMachinery.current.comment = value;
		}
	};

	const handleRadioChange = (key, value) => {
		setFormData((prevData) => ({
			...prevData,
			[key]: { ...prevData[key], condition: value },
		}));
	};

	return (
		<Accordion style={{ marginBlock: "10px" }}>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Part 6</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{[
					{ label: "Winch Hoist Brakes", key: "winchHoistBrakes" },
					{ label: "Slew Machinery", key: "slewMachinery" },
				].map(({ label, key }) => (
					<Box key={key} sx={{ margin: "25px 0" }}>
						<Typography sx={{ width: "200px" }}>{label}</Typography>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<RadioGroup
								row
								value={formData[key].condition}
								onChange={(e) => handleRadioChange(key, e.target.value)}
							>
								<FormControlLabel
									value="green"
									control={<Radio />}
									label="Green"
								/>
								<FormControlLabel
									value="amber"
									control={<Radio />}
									label="Amber"
								/>
								<FormControlLabel value="red" control={<Radio />} label="Red" />
							</RadioGroup>
							<TextField
								label="Comment"
								variant="outlined"
								size="small"
								sx={{ marginLeft: 2 }}
								onChange={(e) => handleCommentChange(key, e.target.value)}
							/>
						</Box>
					</Box>
				))}
			</AccordionDetails>
		</Accordion>
	);
};

export default Part6;
