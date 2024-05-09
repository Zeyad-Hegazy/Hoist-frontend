import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getAll,createOne, updateOne } from "./../../actions/standards";
import TableComponent from "../../components/UI/Table";
import StandardForm from "../../components/UI/standard-form/StandardForm";


const coulmns = [	{
		id: "name",
		label: "Name",
		minWidth: 170,
		align: "center",
	}]

const Standards = () => {
  	const dispatch = useDispatch();
	const standards = useSelector((state) => state.standards);
	const selectedStandard = useSelector((state) => state.select);

  	const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
		action: "create",
		visible: false,
	});

  	useEffect(() => {
		dispatch(getAll());
	}, [dispatch]);

	const toggleFormVisibility = () => {
		setFormVisibleAndAction({
			action: "create",
			visible: !FormVisibleAndAction,
		});
	};

  	let form = (
		<StandardForm
			title={"Add New Standard"}
			closeHandler={toggleFormVisibility}
			confirmHandler={createOne}
			formAction={FormVisibleAndAction.action}
		/>
	);

	if (FormVisibleAndAction.action === "view") {
		form = (
			<StandardForm
				title={"View Standard Details"}
				closeHandler={toggleFormVisibility}
				selected={selectedStandard}
				confirmHandler={createOne}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	if (FormVisibleAndAction.action === "edit") {
		form = (
			<StandardForm
				title={"Edit Standard"}
				closeHandler={toggleFormVisibility}
				selected={selectedStandard}
				confirmHandler={updateOne}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

 return (
		<div>
			<Header
				label={"Standards"}
				confirmHandler={createOne}
				setAction={setFormVisibleAndAction}
			/>
			{FormVisibleAndAction.visible && form && <div>{form}</div>}
			<main className="flex justify-center items-center">
				{standards && (
					<TableComponent
						columns={coulmns}
						rows={standards}
						openForm={setFormVisibleAndAction}
						formName="standards"
					/>
				)}
			</main>
		</div>
	);
}

export default Standards