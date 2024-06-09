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
	result: "",
	miscellaneous: {
		guardsCovers: "",
		externalLights: "",
		housekeeping: "",
		safetyWarningDecalsLabels: "",
		paintConditionCorrosion: "",
		other: "",
	},
	operatorStation: {
		driverCab: {
			accessGrabRailsSteps: "",
			overheadGuard: "",
			glass: "",
			windshieldWipers: "",
			doorRestraints: "",
			mirrors: "",
			fireExtinguisher: "",
			seatsRestraints: "",
			seatsBelts: "",
		},
		controlsIndicators: {
			controlsIdentified: "",
			instrumentsGauges: "",
			electricalSwitchesFunctions: "",
			horn: "",
			lights: "",
			steering: "",
			engineClutch: "",
			accelerator: "",
			mainBrake: "",
			parkingBrake: "",
			liftingControlsBackToNeutralPositionWhenReleased: "",
		},
		manualsDocuments: {
			operatorsManual: "",
			operatingInstructionsDecals: "",
			other: "",
		},
	},
	powerPlant: {
		manufacturer: "",
		type: "",
		performance: "",
		exhaustSystemGuards: "",
		beltsHoses: "",
		guardsCoversRotatingReciprocatingParts: "",
		other: "",
	},
	attachmentCarriage: {
		structure: "",
		tiltCylinder: "",
		hydHosesTubesFittings: "",
		holdingDevices: "",
		slewingKit: "",
		oscillatingMechanism: "",
		attachmentPositioningLock: "",
		other: "",
	},
	carrier: {
		numberOfAxles: "",
		numberOfSteered: "",
		numberOfPowered: "",
		general: {
			transmission: "",
			driveLane: "",
			tireWheels: "",
			tireAirPressure: "",
			mainFrameMembers: "",
			mainBrake: "",
			parkingBrake: "",
			hydHosesTubesFittings: "",
			hydraulicFluidLevel: "",
			axleLockout: "",
			backupAlarm: "",
		},
	},
	loadCharts: {
		perConfiguration: "",
		durable: "",
		legible: "",
		visibleFromOperatorsStation: "",
		secured: "",
	},
	operationalAids: {
		loadIndicator: "",
		mastAngleIndicator: "",
		other: "",
	},
	mast: {
		mechanisms: {
			liftCylinders: "",
			tiltCylinders: "",
			chainsCables: "",
			hydHosesTubesFittings: "",
			holdingDevices: "",
		},
		structure: {
			matsSectionsAlignment: "",
			wearPadsSteelWheels: "",
			sheaves: "",
			matsHeadSection: "",
			structure: "",
			other: "",
		},
	},
	forks: {
		numberOfForks: "",
		capacity: "",
		surfaceCracks: "",
		straightnessOfBladeShank: "",
		forkAngleDeviation: "",
		differenceInHeightOfTips: "",
		forkHeelWear: "",
		positioningLock: "",
		forkMarking: "",
		other: "",
	},
	overloadTest: {
		loadTestReason: "",
		staticLoadTest: {
			testWeight: "",
			radius: "",
			height: "",
			duration: "",
			applianceWeightPosition: "",
		},
		dynamicLoadTest: {
			testWeight: "",
			radius: "",
			height: "",
			duration: "",
			applianceWeightPosition: "",
		},
		otherLoadTest: {
			testWeight: "",
			radius: "",
			height: "",
			duration: "",
			applianceWeightPosition: "",
			loadSupportDownDuringTest: "",
			residualBlendingOutAfterLoadRemoving: "",
		},
	},
};

const ForkLiftForm = ({ handleSubmit }) => {
	const [formData, setFormData] = useState(emptyData);

	const handleInputChange = (section, field, value, subfield) => {
		if (subfield) {
			setFormData((prevData) => ({
				...prevData,
				[section]: {
					...prevData[section],
					[field]: {
						...prevData[section][field],
						[subfield]: value,
					},
				},
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[section]: {
					...prevData[section],
					[field]: value,
				},
			}));
		}
	};

	const renderRadioGroup = (section, fields, parentSection) => (
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
						onChange={(e) =>
							handleInputChange(
								parentSection || section,
								parentSection ? section : field,
								e.target.value,
								parentSection && field
							)
						}
					>
						<FormControlLabel value="Pass" control={<Radio />} label="Pass" />
						<FormControlLabel value="Fail" control={<Radio />} label="Fail" />
						<FormControlLabel value="N/A" control={<Radio />} label="N/A" />
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
			<TextField
				label="Result"
				fullWidth
				margin="normal"
				value={formData.result}
				onChange={(e) => setFormData({ ...formData, result: e.target.value })}
			/>

			<Accordion>
				<AccordionSummary expandIcon={<IconExpand />}>
					<Typography>Miscellaneous</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{renderRadioGroup("miscellaneous", formData.miscellaneous)}
				</AccordionDetails>
			</Accordion>

			<Accordion>
				<AccordionSummary expandIcon={<IconExpand />}>
					<Typography>Operator Station</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{Object.entries(formData.operatorStation).map(([key, value]) => (
						<Accordion key={key}>
							<AccordionSummary expandIcon={<IconExpand />}>
								<Typography>{key.replace(/([A-Z])/g, " $1")}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{renderRadioGroup(key, value, "operatorStation")}
							</AccordionDetails>
						</Accordion>
					))}
				</AccordionDetails>
			</Accordion>

			{[
				"powerPlant",
				"attachmentCarriage",
				"carrier",
				"loadCharts",
				"operationalAids",
				"mast",
				"forks",
			].map((section) => (
				<Accordion key={section}>
					<AccordionSummary expandIcon={<IconExpand />}>
						<Typography>{section.replace(/([A-Z])/g, " $1")}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{Object.entries(formData[section]).map(([key, value]) => {
							if (typeof value === "object" && !Array.isArray(value)) {
								return (
									<Accordion key={key}>
										<AccordionSummary expandIcon={<IconExpand />}>
											<Typography>{key.replace(/([A-Z])/g, " $1")}</Typography>
										</AccordionSummary>
										<AccordionDetails>
											{renderRadioGroup(key, value, section)}
										</AccordionDetails>
									</Accordion>
								);
							}
							return (
								<TextField
									key={key}
									label={key.replace(/([A-Z])/g, " $1")}
									fullWidth
									margin="normal"
									value={value}
									onChange={(e) =>
										handleInputChange(section, key, e.target.value)
									}
								/>
							);
						})}
					</AccordionDetails>
				</Accordion>
			))}

			<Accordion>
				<AccordionSummary expandIcon={<IconExpand />}>
					<Typography>Overload Test</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField
						label="Load Test Reason"
						fullWidth
						margin="normal"
						value={formData.overloadTest.loadTestReason}
						onChange={(e) =>
							handleInputChange(
								"overloadTest",
								"loadTestReason",
								e.target.value
							)
						}
					/>
					{["staticLoadTest", "dynamicLoadTest", "otherLoadTest"].map(
						(testType) => (
							<Box key={testType} sx={{ marginBottom: 2 }}>
								<Typography variant="h6">
									{testType.replace(/([A-Z])/g, " $1")}
								</Typography>
								{Object.entries(formData.overloadTest[testType]).map(
									([key, value]) => (
										<TextField
											key={key}
											label={key.replace(/([A-Z])/g, " $1")}
											fullWidth
											margin="normal"
											value={value}
											onChange={(e) =>
												handleInputChange(
													"overloadTest",
													testType,
													e.target.value,
													key
												)
											}
										/>
									)
								)}
							</Box>
						)
					)}
				</AccordionDetails>
			</Accordion>
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

export default ForkLiftForm;
