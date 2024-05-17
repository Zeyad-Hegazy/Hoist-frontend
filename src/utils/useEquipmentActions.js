import { useDispatch } from "react-redux";

import {
	getOneEquipment,
	getAllEquipments,
	deleteOneEquipment,
	getEquipmentInfo,
} from "../actions/equipment";
import { useNavigate } from "react-router-dom";

const useEquipmentActions = (openForm) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getViewHandler = (id) => {
		dispatch(getOneEquipment(id));
		dispatch(getEquipmentInfo(id));

		navigate("info");
	};

	const getEditHandler = (id) => {
		dispatch(getOneEquipment(id));
		openForm({
			action: "edit",
			visible: true,
		});
	};

	const getDeleteHandler = async (id) => {
		await dispatch(deleteOneEquipment(id));
		dispatch(getAllEquipments());
	};

	return { getViewHandler, getEditHandler, getDeleteHandler };
};

export default useEquipmentActions;
