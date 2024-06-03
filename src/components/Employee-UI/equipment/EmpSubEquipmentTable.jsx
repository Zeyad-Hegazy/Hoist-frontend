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
import { TextField } from "@mui/material";
import { HIGH, LOW, MEDIUM } from "./../../../constants/defect-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import EmpSubEquipmentActions from "./EmpSubEquipmentActions";

export const DefectLevelCell = ({ level }) => {
	const getBackgroundColor = (level) => {
		switch (level) {
			case LOW:
			case null:
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

const EmpSubEquipmentTable = ({ columns, rows, mainId, closeHandler }) => {
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
							<TableCell align="center" style={{ minWidth: 170 }}>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredRows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => (
								<TableRow hover key={row._id}>
									{columns.map((col) => (
										<TableCell key={col.id + row._id} align={col.align}>
											{col.id === "defectLevel" ? (
												<DefectLevelCell level={row[col.id]} />
											) : (
												row[col.id]
											)}
										</TableCell>
									))}
									<TableCell>
										<EmpSubEquipmentActions
											subEquipmentId={row._id}
											mainEquipmentId={mainId}
											closeHandler={closeHandler}
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

export default EmpSubEquipmentTable;
