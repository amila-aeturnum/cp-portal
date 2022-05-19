import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import * as React from 'react';
import Breadcrumb from 'components/molecules/Breadcrumb';
import ResponsiveDialog from 'components/molecules/ResponsiveDialog';
import { Button, Grid, OutlinedInput, InputAdornment, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DataTable from 'components/molecules/DataTable';
import CPButton from 'components/atoms/CPButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SearchIcon from '@mui/icons-material/Search';
import CPTextField from 'components/atoms/CPTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import axiosInstance from 'configs/axiosConfig';
import { IColumn } from 'components/molecules/DataTable/DataTableHeader';
import CPSwitch from 'components/atoms/CPSwitch';
import CPMultiSelectDropDown from 'components/atoms/CPMultiSelectDropDown';

interface IClientForm {
	name?: string;
	clientEmail: string;
}

const Clients: NextPage = () => {
	const [open, setOpen] = useState(false);
	const [clientsList, setClientsList] = useState([]);
	const { t, i18n } = useTranslation();
	const [page, setPage] = React.useState<Number>(0);
	const [rowsPerPage, setRowsPerPage] = React.useState<Number>(3);
	const [analystList, setanalystList] = useState([]);

	useEffect(() => {
		axiosInstance
			.get(
				`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager/client-account/all?count=${rowsPerPage}&page=${page}`
			)
			.then(function (response) {
				setClientsList(response.data.userAccountList);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [page, rowsPerPage]);

	useEffect(() => {
		if (open === true) {
			axiosInstance
				.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager//user/analyst`)
				.then(function (response) {
					const newArray = response.data.userList.map((item: any) => ({
						id: item.id,
						value: item.userFullName,
						key: item.email
					}));

					console.log(newArray);
					setanalystList(newArray);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [open]);

	const columns: IColumn[] = [
		{ id: 'clientName', label: 'Client Name', minWidth: 170 },
		{ id: 'email', label: 'Email', minWidth: 100 },
		{
			id: 'isConversionRate',
			label: 'Is ConversionRate',
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

	const handleEdit = (data: object) => {
		alert(JSON.stringify(data));
	};

	const handleClose = () => {
		clientForm.handleReset(clientForm);
		setOpen(false);
	};
	const handleDataExport = () => {
		alert('not implemented');
	};

	const validationSchema = yup.object({
		name: yup
			.string()
			.required('Client Name is required')
			.max(255, 'Cannot exceed 255 characters')
			.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
		clientEmail: yup.string().email('Invalid email format').required('Email is required')
	});

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const clientForm = useFormik({
		initialValues: {
			name: '',
			clientEmail: ''
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

	const handleOnChange = () => {};

	const [inputList, setInputList] = React.useState<string[]>([]);

	const handleAdd = () => {
		setInputList([...inputList, 'element']);
	};

	const dialogContent = (
		<form onSubmit={clientForm.handleSubmit} onReset={clientForm.handleReset}>
			<Grid container spacing={3} sx={{ marginTop: '10px' }}>
				<Grid item xs={6}>
					<CPTextField
						label="Client Name"
						name="name"
						onBlur={clientForm.handleBlur}
						handleChange={clientForm.handleChange}
						error={clientForm.touched.name && clientForm.errors.name ? true : false}
						helperText={clientForm.touched.name ? clientForm.errors.name : ''}
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={6}>
					<CPTextField
						label="Client email"
						name="clientEmail"
						onBlur={clientForm.handleBlur}
						handleChange={clientForm.handleChange}
						error={clientForm.touched.clientEmail && clientForm.errors.clientEmail ? true : false}
						helperText={clientForm.touched.clientEmail ? clientForm.errors.clientEmail : ''}
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={6}>
					<CPMultiSelectDropDown options={analystList} label="Select analyst" handleChange={handleOnChange} />
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3} sx={{ marginTop: '20px' }}>
						<Grid item xs={12}>
							<span>Report recipient email</span>
						</Grid>
						<Grid item xs={12}>
							<Stack spacing={3} direction="column">
								{/* <Grid item xs={12}> */}
								{inputList.map((input) => (
									<CPTextField label="Email" name="recipientEmail" fullWidth size="small" />
								))}

								{/* </Grid> */}
								<Grid item xs={6}>
									<CPTextField label="Email" name="recipientEmail" fullWidth size="small" />
									<CPButton
										label={<AddIcon />}
										onClick={handleAdd}
										variant="contained"
										style={{ width: '48px', height: '48px', marginLeft: 10 }}
									/>
									<span style={{ marginLeft: 10 }}>add more</span>
								</Grid>
							</Stack>
						</Grid>
						<Grid item xs={12}>
							<Grid container sx={{ marginTop: '20px', marginBottom: '20px' }}>
								<Grid item xs={6}>
									<CPSwitch></CPSwitch>
									<span style={{ marginLeft: 10 }}>Conversion rate</span>
								</Grid>
								<Grid item xs={6}>
									<CPSwitch></CPSwitch>
									<span style={{ marginLeft: 10 }}>Cost per acquisition</span>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
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
									Create Client
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
							/>
						</Grid>
					</Grid>

					<DataTable
						onEditAction={handleEdit}
						rows={clientsList}
						rowsPerPage={rowsPerPage}
						page={page}
						columns={columns}
						setRowsPerPage={setRowsPerPage}
						setPage={setPage}
					/>
				</div>
			</main>
		</div>
	);
};

export default Clients;
