import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getall, updatedEmployee } from "./../../actions/employees";
import TableComponent from "../../components/UI/Table";
import { createOne } from "./../../actions/employees";
import Form from "../../components/UI/Form";
import { schema } from "../../utils/validation/employeeValidator";

const coulmns = [
	{
		id: "name",
		label: "Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "email",
		label: "Email",
		minWidth: 170,
		align: "center",
	},
	{
		id: "phone",
		label: "Phone",
		minWidth: 170,
		align: "center",
	},
	{
		id: "role",
		label: "Role",
		minWidth: 170,
		align: "center",
	},
];

const fields = [
	{ fullWidth: false, label: "Employee Name", name: "name" },
	{ fullWidth: false, label: "Employee Phone", name: "phone" },
	{ fullWidth: false, label: "Email", name: "email", type: "email" },
	{ fullWidth: false, label: "Password", name: "password", type: "password" },
	{ fullWidth: true, label: "Role", name: "role" },
	{ fullWidth: false, label: "Signature", name: "signeture", type: "image" },
];

const Employees = () => {
	const dispatch = useDispatch();
	const employees = useSelector((state) => state.employees);
	const selectedEmployee = useSelector((state) => state.select);

	const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
		action: "create",
		visible: false,
	});

	useEffect(() => {
		dispatch(getall());
	}, [dispatch]);

	const toggleFormVisibility = () => {
		setFormVisibleAndAction({
			action: "create",
			visible: !FormVisibleAndAction,
		});
	};

	let form = (
		<Form
			title={"Add New Employee"}
			fields={fields}
			closeHandler={toggleFormVisibility}
			confirmHandler={createOne}
			formAction={FormVisibleAndAction.action}
			validationSchema={schema}
		/>
	);

	if (FormVisibleAndAction.action === "view") {
		form = (
			<Form
				title={"View Employee Details"}
				fields={fields}
				closeHandler={toggleFormVisibility}
				selected={selectedEmployee}
				confirmHandler={createOne}
				formAction={FormVisibleAndAction.action}
				validationSchema={schema}
			/>
		);
	}

	if (FormVisibleAndAction.action === "edit") {
		form = (
			<Form
				title={"Edit Employee"}
				fields={fields}
				closeHandler={toggleFormVisibility}
				selected={selectedEmployee}
				confirmHandler={updatedEmployee}
				formAction={FormVisibleAndAction.action}
				validationSchema={schema}
			/>
		);
	}
	return (
		<div>
			<Header
				label={"Employees"}
				fields={fields}
				confirmHandler={createOne}
				setAction={setFormVisibleAndAction}
			/>
			{FormVisibleAndAction.visible && form && <div>{form}</div>}
			<main className="flex justify-center items-center">
				{employees && (
					<TableComponent
						columns={coulmns}
						rows={employees}
						openForm={setFormVisibleAndAction}
						formName="employees"
					/>
				)}
			</main>
		</div>
	);
};

export default Employees;
