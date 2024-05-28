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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { DefectLevelCell } from "../../UI/equipment-form/EquipmentTable";

export const ResponseCell = ({ bool }) => {
	const getBackgroundColor = (bool) => {
		switch (bool) {
			case true:
				return "#228B22";
			case false:
				return "#D10000";
			default:
				return "transparent";
		}
	};

	const style = {
		backgroundColor: getBackgroundColor(bool),
		paddingInline: "10px",
		paddingBlock: "5px",
		borderRadius: "5px",
		display: "inline-block",
		fontSize: "1rem",
	};

	return <div style={style}>{bool ? "Yes" : "No"}</div>;
};

const ClientDefectTable = ({ columns, rows }) => {
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
											) : col.id === "isClientRespond" ||
											  col.id === "isInspectorRespond" ? (
												<ResponseCell bool={row[col.id]} />
											) : (
												row[col.id]
											)}
										</TableCell>
									))}
									<TableCell align={"center"}>
										<FontAwesomeIcon icon={faArrowRight} />
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

export default ClientDefectTable;
