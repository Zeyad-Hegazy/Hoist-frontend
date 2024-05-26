import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
	getAllTypes,
	createOneType,
	updateOneType,
} from "../../actions/admin/types";
import TableComponent from "../../components/UI/Table";
import TypeForm from "./../../components/UI/type-form/TypeForm";

const coulmns = [
	{
		id: "name",
		label: "Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "categoryName",
		label: "Category",
		minWidth: 170,
		align: "center",
	},
];

const Type = () => {
	const dispatch = useDispatch();
	const types = useSelector((state) => state.types);
	const selectedType = useSelector((state) => state.select);

	const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
		action: "create",
		visible: false,
	});

	useEffect(() => {
		dispatch(getAllTypes());
	}, [dispatch]);

	const toggleFormVisibility = () => {
		setFormVisibleAndAction({
			action: "create",
			visible: !FormVisibleAndAction,
		});
	};

	let form = (
		<TypeForm
			title={"Add New Type"}
			closeHandler={toggleFormVisibility}
			confirmHandler={createOneType}
			getAll={getAllTypes}
			formAction={FormVisibleAndAction.action}
		/>
	);

	if (FormVisibleAndAction.action === "view") {
		form = (
			<TypeForm
				title={"View Type Details"}
				closeHandler={toggleFormVisibility}
				selected={selectedType}
				confirmHandler={createOneType}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	if (FormVisibleAndAction.action === "edit") {
		form = (
			<TypeForm
				title={"Edit Type"}
				closeHandler={toggleFormVisibility}
				selected={selectedType}
				confirmHandler={updateOneType}
				getAll={getAllTypes}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	return (
		<div>
			<Header
				label={"Types"}
				confirmHandler={createOneType}
				setAction={setFormVisibleAndAction}
			/>
			{FormVisibleAndAction.visible && form && <div>{form}</div>}
			<main className="flex justify-center items-center">
				{types && (
					<TableComponent
						columns={coulmns}
						rows={types}
						openForm={setFormVisibleAndAction}
						formName="type"
					/>
				)}
			</main>
		</div>
	);
};

export default Type;
