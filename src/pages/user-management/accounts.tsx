import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import * as React from 'react';
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomUpdatedDate } from '@mui/x-data-grid-generator';
import Breadcrumb from 'components/molecules/Breadcrumb';

const Accounts: NextPage = () => {
	return (
		<div className={styles.container}>
			<Breadcrumb title={'Clients'} />
			<main className={styles.main}>
				<div style={{ height: '60vh', width: '100%' }}>
					{false && <DataGrid rows={rows} columns={columns} experimentalFeatures={{ newEditingApi: true }} />}
				</div>
			</main>
		</div>
	);
};

export default Accounts;

const columns: GridColumns = [
	{ field: 'name', headerName: 'Name', width: 180, editable: true },
	{ field: 'age', headerName: 'Age', type: 'number', editable: true },
	{
		field: 'dateCreated',
		headerName: 'Date Created',
		type: 'date',
		width: 180,
		editable: true
	},
	{
		field: 'lastLogin',
		headerName: 'Last Login',
		type: 'dateTime',
		width: 220,
		editable: true
	}
];

const rows: GridRowsProp = [
	{
		id: 1,
		name: randomTraderName(),
		age: 25,
		dateCreated: randomCreatedDate(),
		lastLogin: randomUpdatedDate()
	},
	{
		id: 2,
		name: randomTraderName(),
		age: 36,
		dateCreated: randomCreatedDate(),
		lastLogin: randomUpdatedDate()
	},
	{
		id: 3,
		name: randomTraderName(),
		age: 19,
		dateCreated: randomCreatedDate(),
		lastLogin: randomUpdatedDate()
	},
	{
		id: 4,
		name: randomTraderName(),
		age: 28,
		dateCreated: randomCreatedDate(),
		lastLogin: randomUpdatedDate()
	},
	{
		id: 5,
		name: randomTraderName(),
		age: 23,
		dateCreated: randomCreatedDate(),
		lastLogin: randomUpdatedDate()
	}
];
