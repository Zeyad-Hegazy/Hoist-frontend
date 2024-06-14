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
import EmpReportActions from "./EmpReportActions";
import useEmpReportActions from "./../../../utils/useEmpReportsActions";

const StatusCell = ({ status }) => {
	const getBackgroundColor = (status) => {
		switch (status) {
			case "Uncompleted":
				return "#D10000";
			case "Completed":
				return "#228B22";
			default:
				return "transparent";
		}
	};

	const style = {
		backgroundColor: getBackgroundColor(status),
		paddingInline: "15px",
		paddingBlock: "10px",
		borderRadius: "5px",
		display: "inline-block",
	};

	return <span style={style}>{status}</span>;
};

const EmpReportTable = ({ columns, rows, openForm }) => {
	const { getViewHandler, getEditHandler, getDeleteHandler, getSubReports } =
		useEmpReportActions(openForm);

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
											{col.id === "status" ? (
												<StatusCell status={row[col.id]} />
											) : (
												row[col.id]
											)}
										</TableCell>
									))}
									<TableCell>
										<EmpReportActions
											getView={() => getViewHandler(row._id)}
											getEdit={() => getEditHandler(row._id)}
											getDelete={() => getDeleteHandler(row._id)}
											getSubReports={() => getSubReports(row._id)}
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
		</Paper>
	);
};

export default EmpReportTable;
