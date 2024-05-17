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
import EquipmentActions from "./EquipmentActions";
import { TextField } from "@mui/material";
import useEquipmentActions from "./../../../utils/useEquipmentActions";

const EquipmentTable = ({ columns, rows, openForm }) => {
	const { getDeleteHandler, getEditHandler, getViewHandler } =
		useEquipmentActions(openForm);

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
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Serial Number
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Department
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Installation
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Category
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Type
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Date Of Last Inspection
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Date Of Next Inspection
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Manufacturer
							</TableCell>

							<TableCell align={"center"}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredRows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => (
								<TableRow hover key={row._id}>
									{columns.map((col) => (
										<TableCell
											key={col.id + row._id}
											align={col.align}
											style={{
												textDecoration:
													col.id === "serialNumber" ? "underline" : "inherit",
												cursor:
													col.id === "serialNumber" ? "pointer" : "inherit",
											}}
											onClick={() => {
												if (col.id === "serialNumber") {
													getViewHandler(row._id);
												}
											}}
										>
											{row[col.id]}
										</TableCell>
									))}
									<TableCell>
										<EquipmentActions
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

export default EquipmentTable;
