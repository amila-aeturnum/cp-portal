import { TableCell, TableHead, TableRow } from '@mui/material';
import * as React from 'react';

interface IColumn {
	id: 'name' | 'code' | 'population' | 'size';
	label: string;
	minWidth?: number;
	align?: 'right' | 'left';
	format?: (value: number) => string;
}
export const columns: readonly IColumn[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
	{
		id: 'population',
		label: 'Population',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US')
	},
	{
		id: 'size',
		label: 'Size\u00a0(km\u00b2)',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US')
	}
];
export default function StickyHeadTable() {
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
