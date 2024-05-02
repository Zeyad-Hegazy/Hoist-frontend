/* eslint-disable react/prop-types */
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { closeToastar } from "../../actions/toastar";
import { useDispatch, useSelector } from "react-redux";

const Toastar = ({ openSnackbar, snackbarMessage }) => {
	const dispatch = useDispatch();

	const status = useSelector((state) => state.toastar.status);

	const handleCloseSnackbar = () => {
		dispatch(closeToastar());
	};

	return (
		<Snackbar
			open={openSnackbar}
			autoHideDuration={3000}
			onClose={handleCloseSnackbar}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
		>
			<MuiAlert
				elevation={6}
				variant="filled"
				onClose={handleCloseSnackbar}
				severity="success"
			>
				{snackbarMessage}
			</MuiAlert>
		</Snackbar>
	);
};

export default Toastar;
