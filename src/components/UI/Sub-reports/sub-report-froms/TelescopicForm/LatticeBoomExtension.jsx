import {
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};
const LatticeBoomExtension = ({ updateFormData }) => {
	const [formData, setFormData] = useState({
		alignment: "",
		cords: "",
		lattices: "",
		endConnections: "",
		storageDevice: "",
		sheaves: "",
		wireRopeRetainer: "",
		structure: "",
		other: "",
	});

	useEffect(() => {
		updateFormData("latticeBoomExtension", formData);
	}, [updateFormData, formData]);

	return (
		<Accordion style={{ marginBlock: "10px" }}>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>Lattice Boom Extension</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<>
					{Object.entries(formData).map(([field, value]) => (
						<Box
							key={field}
							sx={{ display: "flex", alignItems: "center", margin: "8px 0" }}
						>
							<Typography sx={{ width: "200px" }}>
								{field.replace(/([A-Z])/g, " $1")}
							</Typography>
							<RadioGroup
								row
								value={value}
								onChange={(e) => {
									setFormData((prevState) => ({
										...prevState,
										[field]: e.target.value,
									}));
								}}
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
								<FormControlLabel value="N/A" control={<Radio />} label="N/A" />
							</RadioGroup>
						</Box>
					))}
				</>
			</AccordionDetails>
		</Accordion>
	);
};

export default LatticeBoomExtension;
