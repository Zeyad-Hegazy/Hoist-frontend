import React, { useState } from "react";
import {
	Box,
	TextField,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	RadioGroup,
	FormControlLabel,
	Radio,
	Container,
	Button,
} from "@mui/material";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};
const emptyData = {
	testInAccordanceWith: "",
	engineHours: "",
	part1: {
		craneSpecifications: {
			condition: "",
			comment: "",
		},
		certification: {
			condition: "",
			comment: "",
		},
		plannedMaintenance: {
			condition: "",
			comment: "",
		},
	},
	part2: {
		craneOverall: {
			condition: "",
			comment: "",
		},
		engineHouse: {
			condition: "",
			comment: "",
		},
		operatorsCabin: {
			condition: "",
			comment: "",
		},
	},
	part3: {
		instrumentsControls: {
			condition: "",
			comment: "",
		},
		safetyDevices: {
			condition: "",
			comment: "",
		},
		communicationsSystem: {
			condition: "",
			comment: "",
		},
	},
	part4: {
		cranePedestal: {
			condition: "",
			comment: "",
		},
		boomAssembly: {
			condition: "",
			comment: "",
		},
		gantryAssembly: {
			condition: "",
			comment: "",
		},
		slewBearing: {
			condition: "",
			comment: "",
		},
	},
	part5: {
		wireRopes: {
			condition: "",
			comment: "",
		},
		hooks: {
			condition: "",
			comment: "",
		},
	},
	part6: {
		winchHoistBrakes: {
			condition: "",
			comment: "",
		},
		slewMachinery: {
			condition: "",
			comment: "",
		},
	},
	part7: {
		engine: {
			condition: "",
			comment: "",
		},
		clutch: {
			condition: "",
			comment: "",
		},
		tripleDrivePumpDrive: {
			condition: "",
			comment: "",
		},
	},
	part8: {
		pipingValvesFilters: {
			condition: "",
			comment: "",
		},
		hydraulicMotors: {
			condition: "",
			comment: "",
		},
		pressureVessel: {
			condition: "",
			comment: "",
		},
	},
	part9: {
		cablesPanels: {
			condition: "",
			comment: "",
		},
		lighting: {
			condition: "",
			comment: "",
		},
	},
};

const OffshoreForm = ({ handleSubmit }) => {
	const [formData, setFormData] = useState(emptyData);

	const handleInputChange = (part, field, subfield, value) => {
		setFormData((prevData) => {
			const updatedPart = {
				...prevData[part],
				[field]: {
					...prevData[part][field],
					[subfield]: value,
				},
			};
			return { ...prevData, [part]: updatedPart };
		});
	};

	const renderTextField = (part, field, label) => (
		<TextField
			key={field}
			label={label}
			fullWidth
			margin="normal"
			value={formData[part][field].comment}
			onChange={(e) =>
				handleInputChange(part, field, "comment", e.target.value)
			}
		/>
	);

	const renderRadioGroup = (part, field, label) => (
		<Box
			key={field}
			sx={{ display: "flex", alignItems: "center", margin: "8px 0" }}
		>
			<Typography sx={{ width: "200px" }}>{label}</Typography>
			<RadioGroup
				row
				value={formData[part][field].condition}
				onChange={(e) =>
					handleInputChange(part, field, "condition", e.target.value)
				}
			>
				<FormControlLabel value="green" control={<Radio />} label="Green" />
				<FormControlLabel value="amber" control={<Radio />} label="Amber" />
				<FormControlLabel value="red" control={<Radio />} label="Red" />
			</RadioGroup>
		</Box>
	);

	const renderSection = (part, section) => (
		<>
			{Object.entries(section).map(([field, data]) => (
				<Box key={field} sx={{ marginBottom: 2 }}>
					{renderRadioGroup(part, field, field.replace(/([A-Z])/g, " $1"))}
					{renderTextField(part, field, "Comment")}
				</Box>
			))}
		</>
	);

	return (
		<Container>
			<TextField
				label="Test In Accordance With"
				fullWidth
				margin="normal"
				value={formData.testInAccordanceWith}
				onChange={(e) =>
					setFormData({ ...formData, testInAccordanceWith: e.target.value })
				}
			/>
			<TextField
				label="Engine Hours"
				fullWidth
				margin="normal"
				type="number"
				value={formData.engineHours}
				onChange={(e) =>
					setFormData({ ...formData, engineHours: e.target.value })
				}
			/>

			{Object.entries(formData).map(
				([part, section]) =>
					part.startsWith("part") && (
						<Accordion key={part}>
							<AccordionSummary expandIcon={<IconExpand />}>
								<Typography>{part.replace(/([A-Z])/g, " $1")}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{renderSection(part, section)}
							</AccordionDetails>
						</Accordion>
					)
			)}
			<Button
				type="button"
				variant="contained"
				color="primary"
				onClick={() => handleSubmit(formData)}
				className="w-full mt-2"
			>
				Add
			</Button>
		</Container>
	);
};

export default OffshoreForm;
