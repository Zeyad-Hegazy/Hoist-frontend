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

const Part4 = ({ onUpdate }) => {
	const textRefcranePedestal = useRef({ comment: "" });
	const textRefboomAssembly = useRef({ comment: "" });
	const textRefgantryAssembly = useRef({ comment: "" });
	const textRefslewBearing = useRef({ comment: "" });

	const [formData, setFormData] = useState({
		cranePedestal: { condition: "" },
		boomAssembly: { condition: "" },
		gantryAssembly: { condition: "" },
		slewBearing: { condition: "" },
	});

	const updateParent = useCallback(() => {
		onUpdate("part4", {
			cranePedestal: {
				...formData.cranePedestal,
				comment: textRefcranePedestal.current.comment,
			},
			boomAssembly: {
				...formData.boomAssembly,
				comment: textRefboomAssembly.current.comment,
			},
			gantryAssembly: {
				...formData.gantryAssembly,
				comment: textRefgantryAssembly.current.comment,
			},
			slewBearing: {
				...formData.slewBearing,
				comment: textRefslewBearing.current.comment,
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
		if (key === "cranePedestal") {
			textRefcranePedestal.current.comment = value;
		} else if (key === "boomAssembly") {
			textRefboomAssembly.current.comment = value;
		} else if (key === "gantryAssembly") {
			textRefgantryAssembly.current.comment = value;
		} else if (key === "slewBearing") {
			textRefslewBearing.current.comment = value;
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
				<Typography>Part 4</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{[
					{ label: "Crane Pedestal", key: "cranePedestal" },
					{ label: "Boom Assembly", key: "boomAssembly" },
					{ label: "Gantry Assembly", key: "gantryAssembly" },
					{ label: "Slew Bearing", key: "slewBearing" },
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

export default Part4;
