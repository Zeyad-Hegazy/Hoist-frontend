import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect } from "react";
import { getall } from "./../../actions/employees";
import TableComponent from "../../components/UI/Table";
import { createOne } from "./../../actions/employees";

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

const Employees = () => {
	const dispatch = useDispatch();
	const employees = useSelector((state) => state.employees.result);

	useEffect(() => {
		dispatch(getall());
	}, [dispatch]);

	const fields = [
		{ fullWidth: false, label: "Employee Name", name: "name" },
		{ fullWidth: false, label: "Employee Phone", name: "phone" },
		{ fullWidth: false, label: "Email", name: "email", type: "email" },
		{ fullWidth: false, label: "Password", name: "password", type: "password" },
		{ fullWidth: true, label: "Role", name: "role" },
		{ fullWidth: false, label: "Signature", name: "signeture", type: "image" },
	];

	return (
		<div>
			<Header label={"Employees"} fields={fields} confirmHandler={createOne} />
			<main className="flex justify-center items-center">
				{employees && <TableComponent columns={coulmns} rows={employees} />}
			</main>
		</div>
	);
};

export default Employees;
