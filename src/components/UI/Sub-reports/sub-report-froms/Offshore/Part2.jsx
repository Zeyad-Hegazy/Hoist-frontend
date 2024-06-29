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

const Part2 = ({ onUpdate }) => {
	const textRefCrane = useRef({ comment: "" });
	const textRefengineHouse = useRef({ comment: "" });
	const textRefoperatorsCabin = useRef({ comment: "" });

	const [formData, setFormData] = useState({
		craneOverall: { condition: "" },
		engineHouse: { condition: "" },
		operatorsCabin: { condition: "" },
	});

	const updateParent = useCallback(() => {
		onUpdate("part2", {
			craneOverall: {
				...formData.craneOverall,
				comment: textRefCrane.current.comment,
			},
			engineHouse: {
				...formData.engineHouse,
				comment: textRefengineHouse.current.comment,
			},
			operatorsCabin: {
				...formData.operatorsCabin,
				comment: textRefoperatorsCabin.current.comment,
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
		if (key === "craneOverall") {
			textRefCrane.current.comment = value;
		} else if (key === "engineHouse") {
			textRefengineHouse.current.comment = value;
		} else if (key === "operatorsCabin") {
			textRefoperatorsCabin.current.comment = value;
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
				<Typography>Part 2</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{[
					{ label: "Crane Overall", key: "craneOverall" },
					{ label: "Engine House", key: "engineHouse" },
					{ label: "Operators Cabin", key: "operatorsCabin" },
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

export default Part2;
