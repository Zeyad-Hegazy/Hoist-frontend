import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	addSubEquipment,
	getAllEquipments,
} from "../../../actions/employee/equipment";
import { useDispatch } from "react-redux";

const EmpSubEquipmentActions = ({
	mainEquipmentId,
	subEquipmentId,
	closeHandler,
}) => {
	const dispatch = useDispatch();

	const addSubEquipmentHandler = async (mainId, subId) => {
		await dispatch(addSubEquipment({ subEquipmentId: subId }, mainId));
		await dispatch(getAllEquipments());
		closeHandler(false);
	};

	return (
		<div>
			<div className="flex justify-center items-center gap-3">
				<p
					className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-green-500 text-white cursor-pointer"
					onClick={() =>
						addSubEquipmentHandler(mainEquipmentId, subEquipmentId)
					}
				>
					<FontAwesomeIcon icon={faPlus} />
				</p>
			</div>
		</div>
	);
};

export default EmpSubEquipmentActions;
