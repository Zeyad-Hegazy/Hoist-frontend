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
import { HIGH, LOW, MEDIUM } from "./../../../constants/defect-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";

const DefectLevelCell = ({ level }) => {
	const getBackgroundColor = (level) => {
		switch (level) {
			case LOW:
				return "#228B22";
			case MEDIUM:
				return "#FDDA0D";
			case HIGH:
				return "#D10000";
			default:
				return "transparent";
		}
	};

	const style = {
		backgroundColor: getBackgroundColor(level),
		paddingInline: "15px",
		paddingBlock: "10px",
		borderRadius: "5px",
		display: "inline-block",
		fontSize: "1.5rem",
	};

	return (
		<div style={style}>
			<FontAwesomeIcon icon={faNoteSticky} />
		</div>
	);
};

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
								Defect Level
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Serial Number
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Category
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Location
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								SWL
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								L.T Number
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								L.T Company
							</TableCell>
							<TableCell align={"center"} style={{ minWidth: "170px" }}>
								Type
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
												color:
													col.id === "serialNumber" ? "#07789B" : "inherit",
											}}
											onClick={() => {
												if (col.id === "serialNumber") {
													getViewHandler(row._id);
												}
											}}
										>
											{col.id === "defectLevel" ? (
												<DefectLevelCell level={row[col.id]} />
											) : (
												row[col.id]
											)}
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
