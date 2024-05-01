/* eslint-disable react/prop-types */
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { closeToastar } from "../../actions/toastar";
import { useDispatch } from "react-redux";

const Toastar = ({ openSnackbar, snackbarMessage }) => {
	const dispatch = useDispatch();

	const handleCloseSnackbar = () => {
		dispatch(closeToastar());
	};

	return (
		<Snackbar
			open={openSnackbar}
			autoHideDuration={3000}
			onClose={handleCloseSnackbar}
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
