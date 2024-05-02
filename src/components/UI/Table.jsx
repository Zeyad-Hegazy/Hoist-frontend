/* eslint-disable react/prop-types */

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import DeleteDialog from "./DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { getone } from "../../actions/employees";

const TableComponent = ({ columns, rows, opneForm }) => {
	const dispatch = useDispatch();
	// const selected = useSelector((state) => state);
	// const [dataRow, setDataRow] = useState(rows);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openDialogId, setOpenDialogId] = useState(null);

	const getEmployeeHandlerAndView = (id) => {
		dispatch(getone(id));
		opneForm({
			action: "view",
			visible: true,
		});
	};
	const getEmployeeHandlerAndEdit = (id) => {
		dispatch(getone(id));
		opneForm({
			action: "edit",
			visible: true,
		});
	};

	const handleClickOpen = (id) => {
		setOpenDialogId(id);
	};

	const handleClose = () => {
		setOpenDialogId(null);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden", marginTop: "3rem" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((col) => (
								<TableCell
									key={col.id}
									align={col.align}
									style={{ minWidth: col.minWidth }}
								>
									{col.label}
								</TableCell>
							))}
							<TableCell align={"center"}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => (
								<TableRow hover key={row._id}>
									{columns.map((col) => (
										<TableCell key={col.id + row._id} align={col.align}>
											{row[col.id]}
										</TableCell>
									))}
									<TableCell>
										<div className="flex justify-center items-center gap-3">
											<p
												className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-blue-600 text-white"
												onClick={() => getEmployeeHandlerAndView(row._id)}
											>
												<FontAwesomeIcon icon={faEye} />
											</p>
											<p
												className="flex justify-center items-center p-4 w-2 h-2 rounded-full bg-yellow-500 text-white"
												onClick={() => getEmployeeHandlerAndEdit(row._id)}
											>
												<FontAwesomeIcon icon={faEdit} />
											</p>
											<p
												className="flex justify-center items-center p-4 w-2 h-2 rounded-full  bg-red-700 text-white"
												onClick={() => handleClickOpen(row._id)}
											>
												<FontAwesomeIcon icon={faTrash} />
											</p>
											<DeleteDialog
												key={row._id}
												setStateClose={handleClose}
												state={openDialogId === row._id}
												id={row._id}
												message={"Are You Sure To Delete This Employee?"}
											/>
										</div>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default TableComponent;
