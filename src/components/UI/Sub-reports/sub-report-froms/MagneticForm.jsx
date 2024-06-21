import React, { useRef } from "react";
import {
	Box,
	TextField,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Container,
	Button,
} from "@mui/material";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};

const emptyData = {
	reportDetails: {
		testInAccordanceWith: "",
		acceptanceStandard: "",
		hoistIntJobRefNo: "",
		clientAcceptanceStandard: "",
		customerOrderNo: "",
		hoistIntProcedureNo: "",
		surfaceCondition: "",
		material: "",
		poleSpacing: "",
	},
	equipmentDetails: {
		y6Yoke: {
			model: "",
			serialNo: "",
		},
		permanentMagnet: {
			model: "",
			serialNo: "",
		},
		coil: {
			model: "",
			serialNo: "",
		},
	},
	mediaDetails: {
		visibleBlackInk: {
			contrast: "",
			indicator: "",
		},
		fluorescentUVLight: {
			indicator: "",
			model: "",
			serialNo: "",
		},
	},
	inspectionReportDetails: {
		inspectorObservations: "",
		inspectorFindings: "",
		result: "",
	},
};

const MagneticFormTest = ({ handleSubmit }) => {
	const formDataRef = useRef(emptyData);

	const handleInputChange = (section, field, value, subfield) => {
		if (subfield) {
			formDataRef.current[section][field][subfield] = value;
		} else {
			formDataRef.current[section][field] = value;
		}
	};

	const renderAccordion = (section, title) => (
		<Accordion key={title + section}>
			<AccordionSummary expandIcon={<IconExpand />}>
				<Typography>{title.replace(/([A-Z])/g, " $1")}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box sx={{ width: "100%" }}>
					{Object.entries(section).map(([key, value]) =>
						typeof value === "object" && value !== null ? (
							renderAccordion(value, key)
						) : (
							<TextField
								key={key}
								label={key.replace(/([A-Z])/g, " $1")}
								fullWidth
								margin="normal"
								defaultValue={value}
								onChange={(e) => handleInputChange(title, key, e.target.value)}
							/>
						)
					)}
				</Box>
			</AccordionDetails>
		</Accordion>
	);

	return (
		<Container>
			{Object.entries(formDataRef.current).map(([section, data]) => (
				<React.Fragment key={section + data}>
					{typeof data === "object" && data !== null ? (
						renderAccordion(data, section)
					) : (
						<TextField
							label={section}
							fullWidth
							margin="normal"
							defaultValue={data}
							onChange={(e) => handleInputChange(section, "", e.target.value)}
						/>
					)}
				</React.Fragment>
			))}
			<Button
				type="button"
				variant="contained"
				color="primary"
				onClick={() => handleSubmit(formDataRef.current)}
				className="w-full mt-2"
				style={{ marginTop: "1rem" }}
			>
				Add
			</Button>
		</Container>
	);
};

export default MagneticFormTest;
