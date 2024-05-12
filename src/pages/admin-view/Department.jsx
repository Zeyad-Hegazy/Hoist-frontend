import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
	getAllDepartments,
	createOneDepartment,
	updateOneDepartment,
} from "./../../actions/departments";
import TableComponent from "../../components/UI/Table";
import DepartmentForm from "../../components/UI/department-form/DepartmentForm";

const coulmns = [
	{
		id: "name",
		label: "Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "clientName",
		label: "Client Name",
		minWidth: 170,
		align: "center",
	},
];

const Department = () => {
	const dispatch = useDispatch();
	const departments = useSelector((state) => state.departments);
	const selectedDepartment = useSelector((state) => state.select);

	const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
		action: "create",
		visible: false,
	});

	useEffect(() => {
		dispatch(getAllDepartments());
	}, [dispatch]);

	const toggleFormVisibility = () => {
		setFormVisibleAndAction({
			action: "create",
			visible: !FormVisibleAndAction,
		});
	};

	let form = (
		<DepartmentForm
			title={"Add New Department"}
			closeHandler={toggleFormVisibility}
			confirmHandler={createOneDepartment}
			getAll={getAllDepartments}
			formAction={FormVisibleAndAction.action}
		/>
	);

	if (FormVisibleAndAction.action === "view") {
		form = (
			<DepartmentForm
				title={"View Department Details"}
				closeHandler={toggleFormVisibility}
				selected={selectedDepartment}
				confirmHandler={createOneDepartment}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	if (FormVisibleAndAction.action === "edit") {
		form = (
			<DepartmentForm
				title={"Edit Department"}
				closeHandler={toggleFormVisibility}
				selected={selectedDepartment}
				confirmHandler={updateOneDepartment}
				getAll={getAllDepartments}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	return (
		<div>
			<Header
				label={"Departments"}
				confirmHandler={createOneDepartment}
				setAction={setFormVisibleAndAction}
			/>
			{FormVisibleAndAction.visible && form && <div>{form}</div>}
			<main className="flex justify-center items-center">
				{departments && (
					<TableComponent
						columns={coulmns}
						rows={departments}
						openForm={setFormVisibleAndAction}
						formName="departments"
					/>
				)}
			</main>
		</div>
	);
};

export default Department;
