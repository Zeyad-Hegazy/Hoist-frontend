import { useDispatch } from "react-redux";

import {
	getOneEquipment,
	getAllEquipments,
	deleteOneEquipment,
	getEquipmentInfo,
} from "../actions/admin/equipment";
import { useNavigate } from "react-router-dom";

const useEquipmentActions = (openForm, openSubEquipments) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getViewHandler = (id) => {
		dispatch(getOneEquipment(id));
		dispatch(getEquipmentInfo(id));

		navigate("info/" + id);
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

	const getSubEquipemtns = (id) => {
		dispatch(getOneEquipment(id));
		openSubEquipments(true);
	};

	return { getViewHandler, getEditHandler, getDeleteHandler, getSubEquipemtns };
};

export default useEquipmentActions;
