import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
	getAllEquipments,
	createOneEquipment,
	updateOneEquipment,
} from "../../actions/admin/equipment";
import EquipmentTable from "../../components/UI/equipment-form/EquipmentTable";
import EquipmentForm from "../../components/UI/equipment-form/EquipmentForm";

const coulmns = [
	{
		id: "defectLevel",
		label: "Defect Level",
		minWidth: 170,
		align: "center",
	},
	{
		id: "serialNumber",
		label: "Serial Number",
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
		id: "location",
		label: "Location",
		minWidth: 170,
		align: "center",
	},
	{
		id: "swl",
		label: "SWL",
		minWidth: 170,
		align: "center",
	},
	{
		id: "loadTestNumber",
		label: "L.T Number",
		minWidth: 170,
		align: "center",
	},
	{
		id: "loadTestCompany",
		label: "L.T Company",
		minWidth: 170,
		align: "center",
	},
	{
		id: "typeName",
		label: "Type",
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
