import { useEffect } from "react";
import Header from "../../components/Header";

import { getAllAccounts } from "../../actions/client/accounts";
import ClientAccountsTable from "../../components/Client-UI/accounts/ClientAccountsTable";
import { useDispatch, useSelector } from "react-redux";

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

const ClientAccounts = () => {
	const accounts = useSelector((state) => state.accounts);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllAccounts());
	}, [dispatch]);

	return (
		<div>
			<Header label={"Accounts"} setAction={null} />
			<main className="flex justify-center items-center">
				{accounts && <ClientAccountsTable columns={coulmns} rows={accounts} />}
			</main>
		</div>
	);
};

export default ClientAccounts;
