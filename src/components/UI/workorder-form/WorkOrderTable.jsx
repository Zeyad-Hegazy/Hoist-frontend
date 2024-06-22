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
import useTableActions from "../../../utils/useTableActions";
import TableActions from "../TableActions";
import { TextField } from "@mui/material";
import WorkOrderActions from "./WorkOrderActions";

const WorkOrderTable = ({ columns, rows, openForm, formName }) => {
	const { getViewHandler, getEditHandler, getDeleteHandler } = useTableActions(
		formName,
		openForm
	);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const filteredRows = rows.filter((row) => {
		return Object.values(row).some((value) =>
			String(value).toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	return (
		<Paper sx={{ width: "100%", overflow: "hidden", marginTop: "3rem" }}>
			<TextField
				label="Search"
				variant="outlined"
				margin="normal"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
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
						{filteredRows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => (
								<TableRow hover key={row._id}>
									{columns.map((col) => (
										<TableCell key={col.id + row._id} align={col.align}>
											{row[col.id]}
										</TableCell>
									))}
									<TableCell>
										<WorkOrderActions
											getView={() => getViewHandler(row._id)}
											getEdit={() => getEditHandler(row._id)}
											getDelete={() => getDeleteHandler(row._id)}
											id={row._id}
										/>
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
			{/* <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        rowsPerPageOptions={[10, 25, 100]}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        size="large"
                  /> */}
		</Paper>
	);
};

export default WorkOrderTable;
