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

const Part1 = ({ onUpdate }) => {
	const textRefCrane = useRef({ comment: "" });
	const textRefCertification = useRef({ comment: "" });
	const textRefPlanned = useRef({ comment: "" });

	const [formData, setFormData] = useState({
		craneSpecifications: { condition: "" },
		certification: { condition: "" },
		plannedMaintenance: { condition: "" },
	});

	const updateParent = useCallback(() => {
		onUpdate("part1", {
			craneSpecifications: {
				...formData.craneSpecifications,
				comment: textRefCrane.current.comment,
			},
			certification: {
				...formData.certification,
				comment: textRefCertification.current.comment,
			},
			plannedMaintenance: {
				...formData.plannedMaintenance,
				comment: textRefPlanned.current.comment,
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
		if (key === "craneSpecifications") {
			textRefCrane.current.comment = value;
		} else if (key === "certification") {
			textRefCertification.current.comment = value;
		} else if (key === "plannedMaintenance") {
			textRefPlanned.current.comment = value;
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
				<Typography>Part 1</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{[
					{ label: "Crane Specifications", key: "craneSpecifications" },
					{ label: "Certification", key: "certification" },
					{ label: "Planned Maintenance", key: "plannedMaintenance" },
				].map(({ label, key }) => (
					<Box key={key} sx={{ margin: "8px 0" }}>
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

export default Part1;
