import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
	getAllEquipments,
	createOneEquipment,
	updateOneEquipment,
} from "./../../actions/equipment";
import EquipmentTable from "../../components/UI/equipment-form/EquipmentTable";
import EquipmentForm from "../../components/UI/equipment-form/EquipmentForm";

const coulmns = [
	{
		id: "serialNumber",
		label: "Serial Number",
		minWidth: 170,
		align: "center",
	},
	{
		id: "departmentName",
		label: "Department",
		minWidth: 170,
		align: "center",
	},
	{
		id: "installationName",
		label: "Installation",
		minWidth: 170,
		align: "center",
	},
	{
		id: "categoryName",
		label: "Category",
		minWidth: 170,
		align: "center",
	},
	{
		id: "typeName",
		label: "Type",
		minWidth: 170,
		align: "center",
	},
	{
		id: "dateOfLastInsp",
		label: "Date Of Last Inspection",
		minWidth: 170,
		align: "center",
	},
	{
		id: "dateOfNextInsp",
		label: "Date Of Next Inspection",
		minWidth: 170,
		align: "center",
	},
	{
		id: "manufacturer",
		label: "Manufacturer",
		minWidth: 170,
		align: "center",
	},
];

const Equipments = () => {
	const dispatch = useDispatch();
	const equipments = useSelector((state) => state.equipment);
	const selectedEquipment = useSelector((state) => state.select);

	const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
		action: "create",
		visible: false,
	});

	useEffect(() => {
		dispatch(getAllEquipments());
	}, [dispatch]);

	const toggleFormVisibility = () => {
		setFormVisibleAndAction({
			action: "create",
			visible: !FormVisibleAndAction,
		});
	};

	let form = (
		<EquipmentForm
			title={"Add New Equipment"}
			closeHandler={toggleFormVisibility}
			confirmHandler={createOneEquipment}
			getAll={getAllEquipments}
			formAction={FormVisibleAndAction.action}
		/>
	);

	if (FormVisibleAndAction.action === "view") {
		form = (
			<EquipmentForm
				title={"View Equipment Details"}
				closeHandler={toggleFormVisibility}
				selected={selectedEquipment}
				confirmHandler={createOneEquipment}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	if (FormVisibleAndAction.action === "edit") {
		form = (
			<EquipmentForm
				title={"Edit Equipment"}
				closeHandler={toggleFormVisibility}
				selected={selectedEquipment}
				confirmHandler={updateOneEquipment}
				getAll={getAllEquipments}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	return (
		<div>
			<Header
				label={"Equipments"}
				confirmHandler={createOneEquipment}
				setAction={setFormVisibleAndAction}
			/>
			{FormVisibleAndAction.visible && form && <div>{form}</div>}
			<main className="flex justify-center items-center">
				{equipments && (
					<EquipmentTable
						columns={coulmns}
						rows={equipments}
						openForm={setFormVisibleAndAction}
					/>
				)}
			</main>
		</div>
	);
};

export default Equipments;
