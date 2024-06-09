import { useState } from "react";
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

const OverHeadForm = ({ handleSubmit }) => {
	const [formData, setFormData] = useState({
		testInAccordanceWith: "",
		trolleyCrossTravel: {
			No1Crap: {
				XTGearbox: "",
				XTGears: "",
				Rollers: "",
				XTBrakes: "",
				XTMotor: "",
				OilLevels: "",
				HoistGears: "",
				Wheels: "",
			},
			No2Crap: {
				XTGearbox: "",
				XTGears: "",
				Rollers: "",
				XTBrakes: "",
				XTMotor: "",
				OilLevels: "",
				HoistGears: "",
				Wheels: "",
			},
		},
		controls: {
			cabJoystickControllers: "",
			cabMasterBrakeCyl: "",
			pendantStation: "",
		},
		hoistNo1: {
			gears: "",
			hook: "",
			ropeBlock: "",
			ropeGuide: "",
			pressureRing: "",
			motor: "",
			brake: "",
			limitSwitch: "",
			lubrication: "",
			oilLevels: "",
		},
		mainPanel: {
			freeMovement: "",
			inContactor: "",
			contactorsTimer: "",
			inProperSequence: "",
		},
		longTravel: {
			motor: "",
			brakes: "",
			spurWingsPinions: "",
			gearBox: "",
			wheels: "",
			lubrication: "",
			oilLevels: "",
		},
		electricalComponents: {
			loadLimitDevices: "",
			XTMotors: "",
			LTMotors: "",
			hoistMotors: "",
			slowSpeedMotors: "",
		},
		structuralCrab: {
			girder: "",
			endCarriages: "",
			handrails: "",
			platform: "",
			trackingFlats: "",
			cabin: "",
			bolts: "",
			paint: "",
		},
		general: {
			festoonSystem: "",
			wiring: "",
			trailingClamps: "",
		},
		hoistNo2: {
			gears: "",
			hook: "",
			ropeBlock: "",
			ropeGuide: "",
			pressureRing: "",
			motor: "",
			brake: "",
			limitSwitch: "",
			lubrication: "",
			oilLevels: "",
		},
		remarks: "",
	});

	const handleInputChange = (section, field, value) => {
		setFormData((prevData) => {
			const sectionParts = section.split(".");
			let updatedData = { ...prevData };

			if (sectionParts.length === 1) {
				updatedData[section] = {
					...prevData[section],
					[field]: value,
				};
			} else {
				let currentLevel = updatedData;
				for (let i = 0; i < sectionParts.length - 1; i++) {
					const part = sectionParts[i];
					currentLevel[part] = { ...currentLevel[part] };
					currentLevel = currentLevel[part];
				}
				currentLevel[sectionParts[sectionParts.length - 1]] = {
					...currentLevel[sectionParts[sectionParts.length - 1]],
					[field]: value,
				};
			}

			return updatedData;
		});
	};

	const renderRadioGroup = (section, fields) => (
		<>
			{Object.entries(fields).map(([field, value]) => (
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
						onChange={(e) => handleInputChange(section, field, e.target.value)}
					>
						<FormControlLabel value="A" control={<Radio />} label="A" />
						<FormControlLabel value="B" control={<Radio />} label="B" />
						<FormControlLabel value="C" control={<Radio />} label="C" />
					</RadioGroup>
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

			<Accordion>
				<AccordionSummary expandIcon={<IconExpand />}>
					<Typography>Trolley Cross Travel</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{Object.entries(formData.trolleyCrossTravel).map(([key, value]) => (
						<Accordion key={key}>
							<AccordionSummary>
								<Typography>{key.replace(/([A-Z])/g, " $1")}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{renderRadioGroup(`trolleyCrossTravel.${key}`, value)}
							</AccordionDetails>
						</Accordion>
					))}
				</AccordionDetails>
			</Accordion>

			{[
				"controls",
				"hoistNo1",
				"mainPanel",
				"longTravel",
				"electricalComponents",
				"structuralCrab",
				"general",
				"hoistNo2",
			].map((section) => (
				<Accordion key={section}>
					<AccordionSummary expandIcon={<IconExpand />}>
						<Typography>{section.replace(/([A-Z])/g, " $1")}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{renderRadioGroup(section, formData[section])}
					</AccordionDetails>
				</Accordion>
			))}

			<TextField
				label="Remarks"
				fullWidth
				margin="normal"
				multiline
				rows={4}
				value={formData.remarks}
				onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
			/>

			<Button
				type="button"
				variant="contained"
				color="primary"
				onClick={() => handleSubmit(formData)}
				className="w-full mt-2"
				style={{ marginTop: "1rem" }}
			>
				Add
			</Button>
		</Container>
	);
};

export default OverHeadForm;
