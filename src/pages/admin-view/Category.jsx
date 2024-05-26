import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
	getAllCategories,
	createOneCategory,
	updateOneCategory,
} from "../../actions/admin/category";
import TableComponent from "../../components/UI/Table";
import CategoryForm from "../../components/UI/category-form/CategoryForm";

const coulmns = [
	{
		id: "name",
		label: "Name",
		minWidth: 170,
		align: "center",
	},
];

const Category = () => {
	const dispatch = useDispatch();
	const category = useSelector((state) => state.category);
	const selectedCategory = useSelector((state) => state.select);

	const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
		action: "create",
		visible: false,
	});

	useEffect(() => {
		dispatch(getAllCategories());
	}, [dispatch]);

	const toggleFormVisibility = () => {
		setFormVisibleAndAction({
			action: "create",
			visible: !FormVisibleAndAction,
		});
	};

	let form = (
		<CategoryForm
			title={"Add New Category"}
			closeHandler={toggleFormVisibility}
			confirmHandler={createOneCategory}
			getAll={getAllCategories}
			formAction={FormVisibleAndAction.action}
		/>
	);

	if (FormVisibleAndAction.action === "view") {
		form = (
			<CategoryForm
				title={"View Category Details"}
				closeHandler={toggleFormVisibility}
				selected={selectedCategory}
				confirmHandler={createOneCategory}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	if (FormVisibleAndAction.action === "edit") {
		form = (
			<CategoryForm
				title={"Edit Categories"}
				closeHandler={toggleFormVisibility}
				selected={selectedCategory}
				confirmHandler={updateOneCategory}
				getAll={getAllCategories}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	return (
		<div>
			<Header
				label={"Categories"}
				confirmHandler={createOneCategory}
				setAction={setFormVisibleAndAction}
			/>
			{FormVisibleAndAction.visible && form && <div>{form}</div>}
			<main className="flex justify-center items-center">
				{category && (
					<TableComponent
						columns={coulmns}
						rows={category}
						openForm={setFormVisibleAndAction}
						formName="category"
					/>
				)}
			</main>
		</div>
	);
};

export default Category;
