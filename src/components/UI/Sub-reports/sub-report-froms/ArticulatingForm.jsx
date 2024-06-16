/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from "react";
import { TextField, Container, Button } from "@mui/material";

import Miscellaneous from "./ArticulatingForm/Miscellaneous";
import OperatorsStation from "./ArticulatingForm/OperatorsStation";
import PowerSource from "./ArticulatingForm/PowerSource";
import RotatingUpperStructure from "./ArticulatingForm/RotatingUpperStructure";
import Boom from "./ArticulatingForm/Boom";
import Carrier from "./ArticulatingForm/Carrier";
import LoadCharts from "./ArticulatingForm/LoadCharts";
import OperationalAids from "./ArticulatingForm/OperationalAids";
import MainLoadBlockHook from "./ArticulatingForm/MainLoadBlockHook";
import EquipmentsDetails from "./ArticulatingForm/EquipmentsDetails";

const ArticulatingForm = ({ handleSubmit }) => {
	const resultsAndTestRef = useRef({
		testInAccordanceWith: "",
		result: "",
	});

	const [formData, setFormData] = useState({
		miscellaneous: {},
		operatorsStation: {},
		powerSource: {},
		rotatingUpperStructure: {},
		boom: {},
		carrier: {},
		loadCharts: {},
		operationalAids: {},
		mainLoadBlockHook: {},
		equipmentsDetails: {},
	});

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
				defaultValue={resultsAndTestRef.current.testInAccordanceWith}
				onChange={(e) =>
					(resultsAndTestRef.current.testInAccordanceWith = e.target.value)
				}
			/>
			<TextField
				label="Result"
				fullWidth
				margin="normal"
				defaultValue={resultsAndTestRef.current.result}
				onChange={(e) => (resultsAndTestRef.current.result = e.target.value)}
			/>

			<Miscellaneous updateFormData={updateFormData} />

			<OperatorsStation updateFormData={updateFormData} />

			<PowerSource updateFormData={updateFormData} />

			<RotatingUpperStructure updateFormData={updateFormData} />

			<Boom updateFormData={updateFormData} />

			<Carrier updateFormData={updateFormData} />

			<LoadCharts updateFormData={updateFormData} />

			<OperationalAids updateFormData={updateFormData} />

			<MainLoadBlockHook updateFormData={updateFormData} />

			<EquipmentsDetails updateFormData={updateFormData} />

			<Button
				type="button"
				variant="contained"
				color="primary"
				onClick={() =>
					handleSubmit({
						...formData,
						testInAccordanceWith:
							resultsAndTestRef.current.testInAccordanceWith,
						result: resultsAndTestRef.current.result,
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

export default ArticulatingForm;
