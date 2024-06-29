/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from "react";
import { TextField, Container, Button } from "@mui/material";

import TrolleyCrossTravel from "./OverHeadForm/TrolleyCrossTravel";
import Controls from "./OverHeadForm/Controls";
import HoistNo1 from "./OverHeadForm/HoistNo1";
import MainPanel from "./OverHeadForm/MainPanel";
import LongTravel from "./OverHeadForm/LongTravel";
import ElectricalComponents from "./OverHeadForm/ElectricalComponents";
import General from "./OverHeadForm/General";
import HoistNo2 from "./OverHeadForm/HoistNo2";

const emptyData = {
	trolleyCrossTravel: {},
	controls: {},
	hoistNo1: {},
	mainPanel: {},
	electricalComponents: {},
	structuralCrab: {},
	general: {},
	hoistNo2: {},
};

const OverHeadForm = ({ handleSubmit }) => {
	const textRef = useRef({
		testInAccordanceWith: "",
		remarks: "",
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

			<TrolleyCrossTravel updateFormData={updateFormData} />
			<Controls updateFormData={updateFormData} />
			<HoistNo1 updateFormData={updateFormData} />
			<MainPanel updateFormData={updateFormData} />
			<LongTravel updateFormData={updateFormData} />
			<ElectricalComponents updateFormData={updateFormData} />
			<General updateFormData={updateFormData} />
			<HoistNo2 updateFormData={updateFormData} />

			<TextField
				label="Remarks"
				fullWidth
				margin="normal"
				multiline
				rows={4}
				defaultValue={textRef.current.remarks}
				onChange={(e) => (textRef.current.remarks = e.target.value)}
			/>

			<Button
				type="button"
				variant="contained"
				color="primary"
				onClick={() =>
					handleSubmit({
						testInAccordanceWith: textRef.current.testInAccordanceWith,
						...formData,
						remarks: textRef.current.remarks,
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

export default OverHeadForm;
