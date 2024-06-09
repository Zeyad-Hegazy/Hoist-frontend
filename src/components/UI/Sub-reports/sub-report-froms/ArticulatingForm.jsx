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
const ArticulatingForm = ({ handleSubmit }) => {
	const [formData, setFormData] = useState({
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
		operatorsStation: {
			operatorStation: {
				accessGrabRailsSteps: "",
				fireExtinguisher: "",
				seatsRestains: "",
				seatsBelts: "",
				others: "",
			},
			controlsIndicators: {
				controlsIdentified: "",
				instrumentsGauges: "",
				electricalSwitchesFunctions: "",
				horn: "",
				lights: "",
				accelerator: "",
				liftingControlsBackToNeutralPositionWhenReleased: "",
				others: "",
			},
			manualsDocuments: {
				operatorManual: "",
				operatingInstructDecals: "",
				others: "",
			},
		},
		powerSource: {
			engineMotor: {
				manufacturer: "",
				type: "",
			},
			performance: "",
			exhaustSystemGuards: "",
			beltsHoses: "",
			guardsCoversRotatRecipParts: "",
		},
		rotatingUpperStructure: {
			structure: {
				turntable: "",
				counterweightFrame: "",
				counterweightMounting: "",
			},
			mechanisms: {
				electricalHydCollectorRing: "",
				swingMotorGearBox: "",
				hydraulicHosesTubesFittings: "",
				electricalWiring: "",
				mainHoistMotorValvesLines: "",
				mainHoistWrappingOnDrum: "",
				mainHoistMini2RopeWraps: "",
				wireRope: "",
			},
			decals: {
				electrocutionWarningSigns: "",
				conterweightWarningSign: "",
			},
		},
		boom: {
			mechanisms: {
				liftCylinders: "",
				telescopicCylinders: "",
				hydraulicHosesTubesFittings: "",
				holdingDevices: "",
			},
			structure: {
				boomSectionsAlignment: "",
				wearPads: "",
				equalExtension: "",
				sheaves: "",
				hoistLineDeadEnd: "",
				wireRopeRetainer: "",
				boomHingePin: "",
				boomHeadSection: "",
				boomHead: "",
				structure: "",
				other: "",
			},
		},
		carrier: {
			numberOfAxles: "",
			numberOfSteered: "",
			numberOfPowered: "",
			general: {
				transmission: "",
				driveLane: "",
				travelSteering: "",
				tireWheels: "",
				tireAirPressure: "",
				mainFrameMembers: "",
				hydraulicHosesTubesFittings: "",
				hydraulicFluidLevel: "",
				axleLockout: "",
				backupAlarm: "",
			},
			outriggers: {
				numberOfFrontSide: "",
				numberOfRearSide: "",
				structure: "",
				cylinders: "",
				floatPads: "",
				hydraulicHosesTubesFittings: "",
				holdingValves: "",
				other: "",
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
			momentLimiter: "",
			boomAngleIndicator: "",
			boomLengthIndicator: "",
			antiTwoBlockDevice: "",
		},
		mainLoadBlockHook: {
			manufacturer: "",
			ratedCapacity: "",
			blockWeight: "",
			hookTramMeas: "",
			mainBlockHook: {
				capacityMarking: "",
				weightMarking: "",
				sheaves: "",
				safetyLatches: "",
				swivel: "",
				bearing: "",
				wedgeSocketEndFitting: "",
				reeving: "",
				ndtResults: "",
			},
			asPerASMEB30_10_2009: {
				zeroPercentDeformation: "",
				fivePercentHookThroatOpening: "",
				tenPercentHookWear: "",
				other: "",
			},
		},
		equipmentsDetails: {
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
			},
			loadSupportDownDuringTest: "",
			residualBlendingOutAfterLoadRemoving: "",
		},
	});

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
					<Typography>Operator's Station</Typography>
				</AccordionSummary>
				<AccordionDetails>
					{Object.entries(formData.operatorsStation).map(([key, value]) => (
						<Accordion key={key}>
							<AccordionSummary expandIcon={<IconExpand />}>
								<Typography>{key.replace(/([A-Z])/g, " $1")}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{renderRadioGroup(key, value, "operatorsStation")}
							</AccordionDetails>
						</Accordion>
					))}
				</AccordionDetails>
			</Accordion>

			{[
				"powerSource",
				"rotatingUpperStructure",
				"boom",
				"carrier",
				"loadCharts",
				"operationalAids",
				"mainLoadBlockHook",
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
					<Typography>Equipment Details</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TextField
						label="Load Test Reason"
						fullWidth
						margin="normal"
						value={formData.equipmentsDetails.loadTestReason}
						onChange={(e) =>
							handleInputChange(
								"equipmentsDetails",
								"loadTestReason",
								e.target.value
							)
						}
					/>
					{["staticLoadTest", "dynamicLoadTest", "otherLoadTest"].map(
						(test) => (
							<Accordion key={test}>
								<AccordionSummary expandIcon={<IconExpand />}>
									<Typography>{test.replace(/([A-Z])/g, " $1")}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									{Object.entries(formData.equipmentsDetails[test]).map(
										([key, value]) => (
											<TextField
												key={key}
												label={key.replace(/([A-Z])/g, " $1")}
												fullWidth
												margin="normal"
												value={value}
												onChange={(e) =>
													handleInputChange(
														"equipmentsDetails",
														test,
														e.target.value,
														key
													)
												}
											/>
										)
									)}
								</AccordionDetails>
							</Accordion>
						)
					)}
					<Box sx={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
						<Typography sx={{ width: "200px" }}>
							Load Support Down During Test
						</Typography>
						<RadioGroup
							row
							value={formData.equipmentsDetails.loadSupportDownDuringTest}
							onChange={(e) =>
								handleInputChange(
									"equipmentsDetails",
									"loadSupportDownDuringTest",
									e.target.value
								)
							}
						>
							<FormControlLabel value="true" control={<Radio />} label="Yes" />
							<FormControlLabel value="false" control={<Radio />} label="No" />
						</RadioGroup>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", margin: "8px 0" }}>
						<Typography sx={{ width: "200px" }}>
							Residual Blending Out After Load Removing
						</Typography>
						<RadioGroup
							row
							value={
								formData.equipmentsDetails.residualBlendingOutAfterLoadRemoving
							}
							onChange={(e) =>
								handleInputChange(
									"equipmentsDetails",
									"residualBlendingOutAfterLoadRemoving",
									e.target.value
								)
							}
						>
							<FormControlLabel value="true" control={<Radio />} label="Yes" />
							<FormControlLabel value="false" control={<Radio />} label="No" />
						</RadioGroup>
					</Box>
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

export default ArticulatingForm;
