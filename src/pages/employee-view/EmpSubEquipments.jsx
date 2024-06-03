/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { getAllEquipments } from "./../../actions/employee/equipment";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import EmpSubEquipmentTable from "../../components/Employee-UI/equipment/EmpSubEquipmentTable";

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
		id: "parentEquipment",
		label: "Main Equipment",
		minWidth: 170,
		align: "center",
	},
];

const EmpSubEquipments = ({ closeHandler }) => {
	const equipments = useSelector((state) => state.equipment);
	const equipment = useSelector((state) => state.select);
	const dispatch = useDispatch();

	console.log(equipments);

	useEffect(() => {
		if (equipments.length === 0) {
			dispatch(getAllEquipments());
		}
	}, [dispatch, equipments]);

	return (
		<div>
			<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10">
				<div className="bg-gray-950 p-8 rounded-lg">
					<div className="w-full mx-auto rounded-lg shadow-md relative">
						<button
							className="absolute top-2 right-2"
							onClick={() => closeHandler(false)}
						>
							<FontAwesomeIcon icon={faClose} className="text-2xl" />
						</button>

						<Header label={"Sub Equipments"} setAction={null} />
						<main className="flex justify-center items-center">
							{equipments && (
								<EmpSubEquipmentTable
									columns={coulmns}
									rows={equipments}
									mainId={equipment?._id}
									closeHandler={closeHandler}
								/>
							)}
						</main>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmpSubEquipments;
