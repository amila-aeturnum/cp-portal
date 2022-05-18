import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DataTableHeader, { IColumn } from './DataTableHeader';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent } from 'react';

interface IDataTable {
	onEditAction?: (data: object) => void;
	onDeleteAction?: () => void;
	rows: Object[];
	rowsPerPage: Number | any | bigint;
	page: Number | any | bigint;
	setPage: (value: Number) => void;
	setRowsPerPage: (value: Number) => void;
	columns: IColumn[];
}

export default function DataTable(props: IDataTable) {
	const { onEditAction, onDeleteAction, rows, rowsPerPage, page, setPage, setRowsPerPage, columns } = props;

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<DataTableHeader columns={columns} />
					<TableBody>
						{rows.map((row: Object, index: Number) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={index.toString()}>
									{columns.map((column) => {
										const value = row[column.id as keyof typeof row];
										return (
											<TableCell key={column.id} align={column.align}>
												{value.toString()}
											</TableCell>
										);
									})}
									<TableCell align={'right'}>
										{onEditAction && (
											<IconButton
												onClick={() => onEditAction(row)}
												sx={{ backgroundColor: 'rgba(31, 132, 255, 0.11)', borderRadius: 0 }}
											>
												<EditIcon htmlColor="blue" />
											</IconButton>
										)}
										{onDeleteAction && (
											<IconButton
												onClick={onDeleteAction}
												sx={{ backgroundColor: 'rgba(255, 31, 31, 0.11)', borderRadius: 0 }}
											>
												<DeleteOutlineIcon htmlColor="red" />
											</IconButton>
										)}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
