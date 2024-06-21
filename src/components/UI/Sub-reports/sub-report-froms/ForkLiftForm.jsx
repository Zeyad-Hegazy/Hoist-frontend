import { useMemo, useRef, useState } from "react";
import { TextField, Container, Button } from "@mui/material";

import Miscellaneous from "./ArticulatingForm/Miscellaneous";
import OperatorStation from "./ForkLiftForm/OperatorStation";
import PowerPlant from "./ForkLiftForm/PowerPlant";
import AttachmentCarriage from "./ForkLiftForm/AttachmentCarriage";
import Carrier from "./ForkLiftForm/Carrier";
import LoadCharts from "./ArticulatingForm/LoadCharts";
import OperationalAids from "./ForkLiftForm/OperationalAids";
import Mast from "./ForkLiftForm/Mast";
import Forks from "./ForkLiftForm/Forks";
import OverloadTest from "./ForkLiftForm/OverloadTest";

const resultsAndTestData = {
	testInAccordanceWith: "",
	result: "",
};

const emptyData = {
	miscellaneous: {},
	operatorStation: {},
	powerPlant: {},
	attachmentCarriage: {},
	carrier: {},
	loadCharts: {},
	operationalAids: {},
	mast: {},
	forks: {},
	overloadTest: {},
};

const ForkLiftForm = ({ handleSubmit }) => {
	const resultsAndTestRef = useRef(resultsAndTestData);
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
			<OperatorStation updateFormData={updateFormData} />
			<PowerPlant updateFormData={updateFormData} />
			<AttachmentCarriage updateFormData={updateFormData} />
			<Carrier updateFormData={updateFormData} />
			<LoadCharts updateFormData={updateFormData} />
			<OperationalAids updateFormData={updateFormData} />
			<Mast updateFormData={updateFormData} />
			<Forks updateFormData={updateFormData} />
			<OverloadTest updateFormData={updateFormData} />

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
