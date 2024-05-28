import { useEffect } from "react";
import Header from "../../components/Header";

import { getAllEquipments } from "../../actions/client/equipment";
import ClientAccountsTable from "../../components/Client-UI/accounts/ClientAccountsTable";
import { useDispatch, useSelector } from "react-redux";

const coulmns = [
	{
		id: "clientName",
		label: "Client",
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
		id: "typeName",
		label: "Type",
		minWidth: 170,
		align: "center",
	},
];

const ClientEquipments = () => {
	const equipments = useSelector((state) => state.equipment);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllEquipments());
	}, [dispatch]);

	return (
		<div>
			<Header label={"Equipments"} setAction={null} />
			<main className="flex justify-center items-center">
				{equipments && (
					<ClientAccountsTable columns={coulmns} rows={equipments} />
				)}
			</main>
		</div>
	);
};

export default ClientEquipments;
