import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DataTableHeader from './DataTableHeader';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent } from 'react';
import Loader from 'components/atoms/Loader';
import { IDataTable } from './DataTable.type';

export default function DataTable(props: IDataTable) {
	const {
		onEditAction,
		onDeleteAction,
		rows,
		rowsPerPage,
		page,
		setPage,
		setRowsPerPage,
		columns,
		rowCount,
		loading = false
	} = props;

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
						{loading && (
							<TableRow>
								<TableCell colSpan={columns.length + 1}>
									<Loader />
								</TableCell>
							</TableRow>
						)}
						{!loading &&
							rows.map((row: Object, index: Number) => {
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
													onClick={() => onDeleteAction(row)}
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
			{!loading && (
				<TablePagination
					rowsPerPageOptions={[5, 10, 100]}
					component="div"
					count={rowCount}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</Paper>
	);
}
