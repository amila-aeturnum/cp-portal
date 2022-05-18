import { TableCell, TableHead, TableRow } from '@mui/material';

export interface IColumn {
	id: string;
	label: string;
	minWidth?: number;
	align?: 'right' | 'left';
	format?: (value: number) => string;
}

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
					Action
				</TableCell>
			</TableRow>
		</TableHead>
	);
}
