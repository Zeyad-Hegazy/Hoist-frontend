import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
	getAllAccounts,
	createOneAccount,
	updateOneAccount,
} from "../../actions/admin/account";
import TableComponent from "../../components/UI/Table";
import AccountForm from "../../components/UI/account-form/AccountForm";

const coulmns = [
	{
		id: "name",
		label: "Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "departmentName",
		label: "Department Name",
		minWidth: 170,
		align: "center",
	},
	{
		id: "email",
		label: "Email",
		minWidth: 170,
		align: "center",
	},
];

const Accounts = () => {
	const dispatch = useDispatch();
	const accounts = useSelector((state) => state.accounts);
	const selectedAccount = useSelector((state) => state.select);

	const [FormVisibleAndAction, setFormVisibleAndAction] = useState({
		action: "create",
		visible: false,
	});

	useEffect(() => {
		dispatch(getAllAccounts());
	}, [dispatch]);

	const toggleFormVisibility = () => {
		setFormVisibleAndAction({
			action: "create",
			visible: !FormVisibleAndAction,
		});
	};

	let form = (
		<AccountForm
			title={"Add New Account"}
			closeHandler={toggleFormVisibility}
			confirmHandler={createOneAccount}
			getAll={getAllAccounts}
			formAction={FormVisibleAndAction.action}
		/>
	);

	if (FormVisibleAndAction.action === "view") {
		form = (
			<AccountForm
				title={"View Account Details"}
				closeHandler={toggleFormVisibility}
				selected={selectedAccount}
				confirmHandler={createOneAccount}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	if (FormVisibleAndAction.action === "edit") {
		form = (
			<AccountForm
				title={"Edit Account"}
				closeHandler={toggleFormVisibility}
				selected={selectedAccount}
				confirmHandler={updateOneAccount}
				getAll={getAllAccounts}
				formAction={FormVisibleAndAction.action}
			/>
		);
	}

	return (
		<div>
			<Header
				label={"Accounts"}
				confirmHandler={createOneAccount}
				setAction={setFormVisibleAndAction}
			/>
			{FormVisibleAndAction.visible && form && <div>{form}</div>}
			<main className="flex justify-center items-center">
				{accounts && (
					<TableComponent
						columns={coulmns}
						rows={accounts}
						openForm={setFormVisibleAndAction}
						formName="accounts"
					/>
				)}
			</main>
		</div>
	);
};

export default Accounts;
