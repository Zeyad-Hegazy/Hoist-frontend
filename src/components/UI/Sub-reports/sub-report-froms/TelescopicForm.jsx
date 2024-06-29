import { useMemo, useRef, useState } from "react";
import { TextField, Container, Button } from "@mui/material";

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
