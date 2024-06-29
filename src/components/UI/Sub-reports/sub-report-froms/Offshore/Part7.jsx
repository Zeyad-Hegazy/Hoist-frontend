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

const Part7 = ({ onUpdate }) => {
	const textRefengine = useRef({ comment: "" });
	const textRefclutch = useRef({ comment: "" });
	const textReftripleDrivePumpDrive = useRef({ comment: "" });

	const [formData, setFormData] = useState({
		engine: { condition: "" },
		clutch: { condition: "" },
		tripleDrivePumpDrive: { condition: "" },
	});

	const updateParent = useCallback(() => {
		onUpdate("part7", {
			engine: {
				...formData.engine,
				comment: textRefengine.current.comment,
			},
			clutch: {
				...formData.clutch,
				comment: textRefclutch.current.comment,
			},
			tripleDrivePumpDrive: {
				...formData.tripleDrivePumpDrive,
				comment: textReftripleDrivePumpDrive.current.comment,
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
		if (key === "engine") {
			textRefengine.current.comment = value;
		} else if (key === "clutch") {
			textRefclutch.current.comment = value;
		} else if (key === "tripleDrivePumpDrive") {
			textReftripleDrivePumpDrive.current.comment = value;
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
				<Typography>Part 7</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{[
					{ label: "Engine", key: "engine" },
					{ label: "Clutch", key: "clutch" },
					{ label: "Triple Drive Pump Drive", key: "tripleDrivePumpDrive" },
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

export default Part7;
