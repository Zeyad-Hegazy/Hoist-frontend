import { useCallback, useRef, useState } from "react";
import { TextField, Container, Button } from "@mui/material";

import Part1 from "./Offshore/Part1";
import Part2 from "./Offshore/Part2";
import Part3 from "./Offshore/Part3";
import Part4 from "./Offshore/Part4";
import Part5 from "./Offshore/Part5";
import Part6 from "./Offshore/Part6";
import Part7 from "./Offshore/Part7";
import Part8 from "./Offshore/Part8";
import Part9 from "./Offshore/Part9";

const emptyData = {
	part1: {},
	part2: {},
	part3: {},
	part4: {},
	part5: {},
	part6: {},
	part7: {},
	part8: {},
	part9: {},
};

const OffshoreForm = ({ handleSubmit }) => {
	const textRef = useRef({
		testInAccordanceWith: "",
		engineHours: 0,
	});
	const [formData, setFormData] = useState(emptyData);

	const handleStateUpdate = useCallback((key, value) => {
		setFormData((prevState) => ({
			...prevState,
			[key]: value,
		}));
	}, []);

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
				label="Engine Hours"
				fullWidth
				margin="normal"
				type="number"
				defaultValue={+textRef.current.engineHours}
				onChange={(e) => (textRef.current.engineHours = +e.target.value)}
			/>

			<Part1 onUpdate={handleStateUpdate} />
			<Part2 onUpdate={handleStateUpdate} />
			<Part3 onUpdate={handleStateUpdate} />
			<Part4 onUpdate={handleStateUpdate} />
			<Part5 onUpdate={handleStateUpdate} />
			<Part6 onUpdate={handleStateUpdate} />
			<Part7 onUpdate={handleStateUpdate} />
			<Part8 onUpdate={handleStateUpdate} />
			<Part9 onUpdate={handleStateUpdate} />

			<Button
				type="button"
				variant="contained"
				color="primary"
				onClick={() =>
					handleSubmit({
						...formData,
						testInAccordanceWith: textRef.current.testInAccordanceWith,
						engineHours: +textRef.current.engineHours,
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

export default OffshoreForm;
