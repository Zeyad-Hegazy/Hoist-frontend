import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
	getWorkOrders,
	createWorkOrder,
	updateOneWorkOrder,
} from "../../actions/admin/workorder";
import TableComponent from "../../components/UI/Table";
import WorkOrderForm from "../../components/UI/workorder-form/WorkOrderForm";

const coulmns = [
	{
		id: "jobNumber",
		label: "Job Number",
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
		id: "startDate",
		label: "Start Date",
		minWidth: 170,
		align: "center",
	},
	{
		id: "endDate",
		label: "End Date",
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
		id: "status",
		label: "Status",
		minWidth: 170,
		align: "center",
	},
];

const WorkOrder = () => {
	const dispatch = useDispatch();
	const workOrders = useSelector((state) => state.workorder);
	const selectedWorkOrder = useSelector((state) => state.select);

	const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
		action: "create",
		visible: false,
	});

	useEffect(() => {
		dispatch(getWorkOrders());
	}, [dispatch]);

	const toggleFormVisibility = () => {
		setFormVisibleAndAction({
			action: "create",
			visible: !FormVisibleAndAction,
		});
	};

	let form = (
		<WorkOrderForm
			title={"Add New Work Order"}
			closeHandler={toggleFormVisibility}
			confirmHandler={createWorkOrder}
			getAll={getWorkOrders}
			formAction={FormVisibleAndAction.action}
		/>
	);

	if (FormVisibleAndAction.action === "view") {
		form = (
			<WorkOrderForm
				title={"View Work Order Details"}
				closeHandler={toggleFormVisibility}
				selected={selectedWorkOrder}
				confirmHandler={createWorkOrder}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	if (FormVisibleAndAction.action === "edit") {
		form = (
			<WorkOrderForm
				title={"Edit Work Order"}
				closeHandler={toggleFormVisibility}
				selected={selectedWorkOrder}
				confirmHandler={updateOneWorkOrder}
				getAll={getWorkOrders}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	return (
		<div>
			<Header
				label={"Work Orders"}
				confirmHandler={createWorkOrder}
				setAction={setFormVisibleAndAction}
			/>
			{FormVisibleAndAction.visible && form && <div>{form}</div>}
			<main className="flex justify-center items-center">
				{workOrders && (
					<TableComponent
						columns={coulmns}
						rows={workOrders}
						openForm={setFormVisibleAndAction}
						formName="workorder"
					/>
				)}
			</main>
		</div>
	);
};

export default WorkOrder;
