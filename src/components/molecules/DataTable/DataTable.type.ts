export interface IDataTable {
	onEditAction?: (data: any) => void;
	onDeleteAction?: (data: any) => void;
	rows: any[];
	rowsPerPage: number;
	page: number;
	rowCount: number;
	setPage: (value: number) => void;
	setRowsPerPage: (value: number) => void;
	columns: IColumn[];
	loading: boolean;
}

export interface IColumn {
	id: string;
	label: string;
	minWidth?: number;
	align?: 'right' | 'left';
	format?: (value: number) => string;
}

export interface IRows<T> {
	rows: T;
}

export interface IPagination {
	total: number;
	count: number;
	totalPages: number;
	currentPage: number;
}
