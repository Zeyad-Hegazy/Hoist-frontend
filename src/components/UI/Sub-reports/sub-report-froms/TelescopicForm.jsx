import React, { useMemo, useRef, useState } from "react";
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

import Miscellaneous from "./TelescopicForm/Miscellaneous";
import DriverCabStation from "./TelescopicForm/DriverCabStation";
import CarrierPowerPlant from "./TelescopicForm/CarrierPowerPlant";
import LoadCharts from "./ArticulatingForm/LoadCharts";
import SafetyDevicesOperationalAids from "./TelescopicForm/SafetyDevicesOperationalAids";
import PowerPlantUpper from "./TelescopicForm/PowerPlantUpper";
import RotatingUpperStructure from "./TelescopicForm/RotatingUpperStructure";
import MainBoom from "./TelescopicForm/MainBoom";
import Carrier from "./TelescopicForm/Carrier";
import OperatorsCabStation from "./TelescopicForm/OperatorsCabStation";
import BoomManualSection from "./TelescopicForm/BoomManualSection";
import LatticeBoomExtension from "./TelescopicForm/LatticeBoomExtension";
import MainLoadBlockHook from "./TelescopicForm/MainLoadBlockHook";
import OverhaulBallHook from "./TelescopicForm/OverhaulBallHook";
import OverloadTest from "./ForkLiftForm/OverloadTest";

const IconExpand = () => {
	return <FontAwesomeIcon icon={faArrowDown} />;
};

// const emptyData = {
// 	testInAccordanceWith: "",
// 	result: "",
// 	miscellaneous: {
// 		guardsCovers: "",
// 		externalLights: "",
// 		housekeeping: "",
// 		safetyWarningDecalsLabels: "",
// 		handSignalChartOutside: "",
// 		paintConditionCorrosion: "",
// 		other: "",
// 	},
// 	driverCabStation: {
// 		driversCab: {
// 			accessGrabRailsSteps: "",
// 			glass: "",
// 			windshieldWipers: "",
// 			doorsRestraints: "",
// 			mirrors: "",
// 			fireExtinguisher: "",
// 			seatsRestraints: "",
// 			seatsBelts: "",
// 		},
// 		controlsIndicators: {
// 			airPressure: "",
// 			controlsIdentified: "",
// 			instrumentsGauges: "",
// 			electricalSwitchesFunctions: "",
// 			horn: "",
// 			lights: "",
// 			steering: "",
// 			engineClutch: "",
// 			accelerator: "",
// 			mainBrake: "",
// 			emergencySteeringPump: "",
// 			liftingControlsBackToNeutralPositionWhenReleased: "",
// 			other: "",
// 		},
// 	},
// 	carrierPowerPlant: {
// 		manufacturer: "",
// 		type: "",
// 		performance: "",
// 		exhaustSystemGuards: "",
// 		beltsHoses: "",
// 		guardsCoversRotatRecipParts: "",
// 		other: "",
// 	},
// 	loadCharts: {
// 		perConfiguration: "",
// 		durable: "",
// 		legible: "",
// 		visibleFromOperatorsStation: "",
// 		secured: "",
// 	},
// 	safetyDevicesOperationalAids: {
// 		safetyDevices: {
// 			antiTwoBlockDevice: "",
// 			twoBlockWarningDevice: "",
// 		},
// 		operationalAids: {
// 			loadMomentIndicator: "",
// 			boomAngleIndicator: "",
// 			boomLengthIndicator: "",
// 			radiusIndicator: "",
// 			craneLevelIndicator: "",
// 			loadWeightIndicator: "",
// 			mainDrumRotationIndicator: "",
// 			auxiliaryDrumRotationIndicator: "",
// 		},
// 	},
// 	powerPlantUpper: {
// 		manufacturer: "",
// 		type: "",
// 		performance: "",
// 		exhaustSystemGuards: "",
// 		beltsHoses: "",
// 		guardsCoversRotatRecipParts: "",
// 		other: "",
// 	},
// 	rotatingUpperStructure: {
// 		structure: {
// 			turntable: "",
// 			counterweightFrame: "",
// 			counterweightMounting: "",
// 		},
// 		mechanisms: {
// 			electricalHydCollectorRing: "",
// 			swingMotorGearBox: "",
// 			hydraulicHosesTubesFittings: "",
// 			electricalWiring: "",
// 			mainHoistMotorValvesLines: "",
// 			mainHoistWrappingOnDrum: "",
// 			mainHoistMini2RopeWraps: "",
// 			auxHoistMotorValvesLines: "",
// 			auxHoistWrappingOnDrum: "",
// 			auxHoistMini2RopeWraps: "",
// 			wireRope: "",
// 		},
// 		decals: {
// 			electrocutionWarningSigns: "",
// 			counterweightWarningSign: "",
// 		},
// 		jib: {
// 			positiveStops: "",
// 			sheaves: "",
// 			wireRopeRetainer: "",
// 			structure: "",
// 			other: "",
// 		},
// 	},
// 	mainBoom: {
// 		mechanisms: {
// 			liftCylinders: "",
// 			telescopicCylinders: "",
// 			hydraulicHosesTubesFittings: "",
// 			holdingDevices: "",
// 		},
// 		structure: {
// 			boomSectionsAlignment: "",
// 			wearPads: "",
// 			equalExtension: "",
// 			sheaves: "",
// 			hoistLineDeadEnd: "",
// 			wireRopeRetainer: "",
// 			boomHingePin: "",
// 			boomHeadSection: "",
// 			auxiliaryBoomHead: "",
// 			structure: "",
// 			other: "",
// 		},
// 	},
// 	carrier: {
// 		numberOfAxles: 0,
// 		numberOfSteered: 0,
// 		numberOfPowered: 0,
// 		carrier: {
// 			transmission: "",
// 			driveLane: "",
// 			tireWheels: "",
// 			tireAirPressure: "",
// 			mainFrameMembers: "",
// 			hydraulicHosesTubesFittings: "",
// 			hydraulicFluidLevel: "",
// 			antiSkidSurface: "",
// 			axleLockout: "",
// 			backupAlarm: "",
// 		},
// 		outriggers: {
// 			boxes: "",
// 			beams: "",
// 			cylinders: "",
// 			floatPads: "",
// 			hydraulicHosesTubesFittings: "",
// 			holdingValves: "",
// 			positionLocks: "",
// 			warningSigns: "",
// 			other: "",
// 		},
// 	},
// 	operatorsCabStation: {
// 		operatorsCab: {
// 			grabRails: "",
// 			StepsPlatform: "",
// 			antiSkidSurface: "",
// 			glass: "",
// 			windshieldWipers: "",
// 			doorsRestraints: "",
// 			mirrors: "",
// 			fireExtinguisher: "",
// 			seatsRestraints: "",
// 			seatsBelts: "",
// 		},
// 		controlsIndicators: {
// 			parkingBrake: "",
// 			swingBrake: "",
// 			positiveSwingLock: "",
// 			controlsForcesMovements: "",
// 			acceleratorThrottleControl: "",
// 			steering: "",
// 			hydraulicAirLeaks: "",
// 			hornWarningDevice: "",
// 			airPressure: "",
// 		},
// 		manualsDocuments: {
// 			operatorsManual: "",
// 			operatingInstructionsDecals: "",
// 			electrocutionWarningSign: "",
// 			handSignalChart: "",
// 		},
// 	},
// 	boomManualSection: {
// 		alignment: "",
// 		lockingDevice: "",
// 		structure: "",
// 		other: "",
// 	},
// 	latticeBoomExtension: {
// 		alignment: "",
// 		cords: "",
// 		lattices: "",
// 		endConnections: "",
// 		storageDevice: "",
// 		sheaves: "",
// 		wireRopeRetainer: "",
// 		structure: "",
// 		other: "",
// 	},
// 	mainLoadBlockHook: {
// 		manufacturer: "",
// 		ratedCapacity: "",
// 		blockWeight: "",
// 		hookTramMeas: "",
// 		capacityMarking: "",
// 		weightMarking: "",
// 		sheaves: "",
// 		safetyLatches: "",
// 		swivel: "",
// 		bearing: "",
// 		wedgeSocketEndFitting: "",
// 		reeving: "",
// 		ndtResults: "",
// 		asPerASMEB30102009: {
// 			zeroPercentDeformation: "",
// 			fivePercentHookThroatOpening: "",
// 			tenPercentHookWear: "",
// 			other: "",
// 		},
// 	},
// 	overhaulBallHook: {
// 		manufacturer: "",
// 		ratedCapacity: "",
// 		blockWeight: "",
// 		hookTramMeas: "",
// 		capacityMarking: "",
// 		weightMarking: "",
// 		safetyLatches: "",
// 		zeroPercentDeformation: "",
// 		fivePercentHookThroatOpening: "",
// 		tenPercentHookWear: "",
// 		swivel: "",
// 		bearing: "",
// 		wedgeSocketEndFitting: "",
// 		ndtResults: "",
// 		other: "",
// 	},
// 	overloadTest: {
// 		loadTestReason: "",
// 		staticLoadTest: {
// 			testWeight: 0,
// 			radius: 0,
// 			boomLength: 0,
// 			duration: 0,
// 			applianceWeightPosition: "",
// 		},
// 		dynamicLoadTest: {
// 			testWeight: 0,
// 			radius: 0,
// 			boomLength: 0,
// 			duration: 0,
// 			applianceWeightPosition: "",
// 		},
// 		otherLoadTest: {
// 			testWeight: 0,
// 			radius: 0,
// 			boomLength: 0,
// 			duration: 0,
// 			applianceWeightPosition: "",
// 		},
// 		loadSupportDownDuringTest: false,
// 		residualBlendingOutAfterLoadRemoving: false,
// 	},
// };

const emptyData = {
	miscellaneous: {},
	driverCabStation: {},
	carrierPowerPlant: {},
	loadCharts: {},
	safetyDevicesOperationalAids: {},
	powerPlantUpper: {},
	rotatingUpperStructure: {},
	mainBoom: {},
	carrier: {},
	operatorsCabStation: {},
	boomManualSection: {},
	latticeBoomExtension: {},
	mainLoadBlockHook: {},
	overhaulBallHook: {},
	overloadTest: {},
};

const TelescopicForm = ({ handleSubmit }) => {
	const textRef = useRef({
		testInAccordanceWith: "",
		result: "",
	});

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

	const renderAccordion = (section, title) => (
		<Accordion key={title}>
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
								label={key.replace(/([A-Z])/g, " $1").trim()}
								fullWidth
								margin="normal"
								value={value}
								onChange={(e) => handleInputChange(title, key, e.target.value)}
							/>
						)
					)}
				</Box>
			</AccordionDetails>
		</Accordion>
	);

	const updateFormData = useMemo(() => {
		return (section, data) => {
			setFormData((prevData) => ({
				...prevData,
				[section]: data,
			}));
		};
	}, [setFormData]);

	return (
		<Container>
			<TextField
				label="Test In Accordance With"
				fullWidth
				margin="normal"
				defaultValue={textRef.current.testInAccordanceWith}
				onChange={(e) =>
					(textRef.current.testInAccordanceWith = e.target.value)
				}
			/>
			<TextField
				label="Result"
				fullWidth
				margin="normal"
				defaultValue={textRef.current.result}
				onChange={(e) => (textRef.current.result = e.target.value)}
			/>

			<Miscellaneous updateFormData={updateFormData} />
			<DriverCabStation updateFormData={updateFormData} />
			<CarrierPowerPlant updateFormData={updateFormData} />
			<LoadCharts updateFormData={updateFormData} />
			<SafetyDevicesOperationalAids updateFormData={updateFormData} />
			<PowerPlantUpper updateFormData={updateFormData} />
			<RotatingUpperStructure updateFormData={updateFormData} />
			<MainBoom updateFormData={updateFormData} />
			<Carrier updateFormData={updateFormData} />
			<OperatorsCabStation updateFormData={updateFormData} />
			<BoomManualSection updateFormData={updateFormData} />
			<LatticeBoomExtension updateFormData={updateFormData} />
			<MainLoadBlockHook updateFormData={updateFormData} />
			<OverhaulBallHook updateFormData={updateFormData} />
			<OverloadTest updateFormData={updateFormData} />

			<Button
				type="button"
				variant="contained"
				color="primary"
				onClick={() =>
					handleSubmit({
						testInAccordanceWith: textRef.current.testInAccordanceWith,
						result: textRef.current.result,
						...formData,
					})
				}
				className="w-full mt-2"
				style={{ marginTop: "1rem" }}
			>
				Add
			</Button>
		</Container>
	);
};

export default TelescopicForm;
