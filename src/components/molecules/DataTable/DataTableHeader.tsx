import { TableCell, TableHead, TableRow } from '@mui/material';
import { IColumn } from './DataTable.type';

interface ITableHeader {
	columns: IColumn[];
}
export default function DataTableHeader(props: ITableHeader) {
	const { columns } = props;

	return (
		<TableHead>
			<TableRow>
				{columns.map((column) => (
					<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
						{column.label}
					</TableCell>
				))}
				<TableCell align="right" style={{ minWidth: 170 }}>
					Actions
				</TableCell>
			</TableRow>
		</TableHead>
	);
}
