import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import Breadcrumb from 'components/molecules/Breadcrumb';
import ResponsiveDialog from 'components/molecules/ResponsiveDialog';
import { Button, Grid, OutlinedInput, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from 'components/molecules/DataTable';
import CPButton from 'components/atoms/CPButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SearchIcon from '@mui/icons-material/Search';
import CPTextField from 'components/atoms/CPTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { get } from 'lodash';
import { deleteEndpointPromise, getEndpointPromise } from 'services/apiServices';
import fileDownload from 'js-file-download';
import { IColumn } from 'components/molecules/DataTable/DataTable.type';
import { IClient, IUserAccount } from 'types/client.type';
import { useSnackbar } from 'notistack';

interface IClientForm {
	name?: string;
	email: string;
}

const Clients: NextPage = () => {
	const [open, setOpen] = useState(false);
	const [clientsList, setClientsList] = useState<IUserAccount[]>([]);
	const [selectedClient, setSelectedClient] = useState<IUserAccount>();
	const { t } = useTranslation();
	const [rowCount, setRowCount] = useState<number>(0);
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [keyword, setKeyword] = useState<string>('');
	const [tableLoading, setTableLoading] = useState<boolean>(false);
	const debouncedKeyword = useDebounce<string>(keyword, 1000);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		getAllClients();
	}, [page, rowsPerPage, debouncedKeyword]);

	const getAllClients = async () => {
		try {
			setTableLoading(true);
			const response = await getEndpointPromise<IClient>(
				`/entitymanager/client-account/all?count=${rowsPerPage}&page=${page}&keyword=${keyword}`
			);
			setRowCount(get(response, 'data.pagination.total'));
			setClientsList(get(response, 'data.userAccountList'));
		} catch (error) {
			console.log(error);
		} finally {
			setTableLoading(false);
		}
	};

	const columns: IColumn[] = [
		{ id: 'clientName', label: 'Client Name', minWidth: 170 },
		{ id: 'email', label: 'Email', minWidth: 100 },
		{
			id: 'isConversionRate',
			label: 'Is Conversion Rate',
			minWidth: 170,
			align: 'right'
		},
		{
			id: 'isCostPerAcquisition',
			label: 'Is Cost Per Acquisition',
			minWidth: 170,
			align: 'right'
		}
	];

	const handleOpen = () => {
		setOpen(true);
	};

	const handleEdit = (data: IUserAccount) => {
		handleOpen();
		setSelectedClient(data);
		//alert(JSON.stringify(data));
	};

	const handleDelete = async (data: any) => {
		try {
			const response = await deleteEndpointPromise(`/entitymanager/user/delete?id=${data.id}`);
			getAllClients();
			enqueueSnackbar('Successfully Deleted', { variant: 'success' });
		} catch (error) {
			console.log(error);
		} finally {
			setTableLoading(false);
		}
	};

	const handleClose = () => {
		clientForm.handleReset(clientForm);
		setOpen(false);
	};
	const handleDataExport = async () => {
		try {
			const response = await getEndpointPromise(`/entitymanager/client-account/download`);
			fileDownload(response.data, 'accounts.csv');
		} catch (error) {
			console.log(error);
		}
	};

	const validationSchema = yup.object({
		name: yup.number().required(t('Name Required')),
		email: yup.string().required('Email required')
	});

	const clientForm = useFormik({
		initialValues: {
			name: selectedClient?.clientName ? selectedClient?.clientName : '',
			email: selectedClient?.email ? selectedClient?.email : 'ww'
		},
		validationSchema: validationSchema,
		onSubmit: (values: IClientForm) => {
			alert(JSON.stringify(values));
			handleClose();
		}
	});

	const handleSave = () => {
		clientForm.handleSubmit();
	};

	const dialogContent = (
		<form onSubmit={clientForm.handleSubmit} onReset={clientForm.handleReset}>
			<Grid container spacing={3} sx={{ marginTop: '10px' }}>
				<Grid item xs={6}>
					<CPTextField
						label="Name"
						name="name"
						onBlur={clientForm.handleBlur}
						handleChange={clientForm.handleChange}
						error={clientForm.touched.name && clientForm.errors.name ? true : false}
						helperText={clientForm.touched.name ? clientForm.errors.name : ''}
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<CPTextField
						label="Email"
						name="email"
						handleChange={clientForm.handleChange}
						onBlur={clientForm.handleBlur}
						error={clientForm.touched.email && clientForm.errors.email ? true : false}
						helperText={clientForm.touched.email ? clientForm.errors.email : ''}
						fullWidth
					/>
				</Grid>
			</Grid>
		</form>
	);

	return (
		<div className={styles.container}>
			<Breadcrumb
				title={'Clients'}
				actions={<CPButton label={'Add a Client'} startIcon={<AddIcon />} onClick={handleOpen} variant="contained" />}
			/>
			<main className={styles.main}>
				<div style={{ height: '60vh', width: '100%' }}>
					<ResponsiveDialog
						title={'Create Client'}
						content={dialogContent}
						open={open}
						handleClose={handleClose}
						actions={
							<>
								<Button onClick={handleSave} variant="contained">
									Close
								</Button>
							</>
						}
					/>
					<Grid container sx={{ padding: '10px' }}>
						<Grid item xs={4}>
							<CPButton
								label={'Export'}
								startIcon={<FileUploadIcon />}
								onClick={handleDataExport}
								variant="contained"
							/>
						</Grid>
						<Grid item xs={3}></Grid>
						<Grid item xs={5} alignItems="right">
							<OutlinedInput
								id="standard-basic"
								sx={{ border: '1px solid #A9A8A8', width: '100%', height: '48px' }}
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
								endAdornment={
									<InputAdornment position="end">
										<CPButton label={'Search'} onClick={handleDataExport} variant="contained" />
									</InputAdornment>
								}
								value={keyword}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
							/>
						</Grid>
					</Grid>

					<DataTable
						onEditAction={handleEdit}
						onDeleteAction={handleDelete}
						rows={clientsList}
						rowCount={rowCount}
						rowsPerPage={rowsPerPage}
						page={page}
						columns={columns}
						setRowsPerPage={setRowsPerPage}
						setPage={setPage}
						loading={tableLoading}
					/>
				</div>
			</main>
		</div>
	);
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	// Fetch data from external API
// 	const res = await fetch(`https://arcane-brook-87163.herokuapp.com/api/districts`);
// 	console.log(res.data);
// 	const data = await res.json();

// 	// Pass data to the page via props
// 	return { props: { data } };
// };

export default Clients;
