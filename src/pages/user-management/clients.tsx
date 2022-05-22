import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import Breadcrumb from 'components/molecules/Breadcrumb';
import ResponsiveDialog from 'components/molecules/ResponsiveDialog';
import { Button, Grid, OutlinedInput, InputAdornment, Stack, IconButton } from '@mui/material';
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
import axiosInstance from 'configs/axiosConfig';
import { IColumn } from 'components/molecules/DataTable/DataTable.type';
import CPSwitch from 'components/atoms/CPSwitch';
import CPMultiSelectDropDown from 'components/atoms/CPMultiSelectDropDown';
import useDebounce from 'hooks/useDebounce';
import { get } from 'lodash';
import { deleteEndpointPromise, getEndpointPromise } from 'services/apiServices';
import fileDownload from 'js-file-download';
import { IClient, IUserAccount } from 'types/client.type';
import { useSnackbar } from 'notistack';
import CPAlert from 'components/atoms/CPAlert';
import { getReadableError } from 'utils/errorHelper';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
interface IClientForm {
	name?: string;
	email: string;
	analystIdList: any[];
	recipientEmailList: string[];
	isConversionRate: boolean;
	isCostPerAcquisition: boolean;
}

const Clients: NextPage = () => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [analystList, setanalystList] = useState([]);
	const [clientsList, setClientsList] = useState<IUserAccount[]>([]);
	const [selectedClient, setSelectedClient] = useState<IUserAccount>();
	const { t } = useTranslation();
	const [rowCount, setRowCount] = useState<number>(0);
	const [keyword, setKeyword] = useState<string>('');
	const [tableLoading, setTableLoading] = useState<boolean>(false);
	const debouncedKeyword = useDebounce<string>(keyword, 1000);
	const { enqueueSnackbar } = useSnackbar();
	const [isConversionRate, setisConversionRate] = useState<boolean>(false);
	const [isCostPerAcquisition, setisCostPerAcquisition] = useState<boolean>(false);
	const [recipientEmailList, setRecipientEmailList] = useState<string[]>([]);

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
					let newArray = [];
					newArray = response.data.userList.map((item: any) => ({
						value: item.userFullName,
						key: item.id
					}));
					console.log(newArray);
					//newArray = newArray.slice(0, newArray.length - 10);
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

	const handleDelete = async (data: IUserAccount) => {
		try {
			const response = await deleteEndpointPromise(`/entitymanager/client-account/delete?id=${data.id}`);
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
			fileDownload(response.data, 'clients.csv');
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const validationSchema = yup.object({
		name: yup
			.string()
			.required('Client Name is required')
			.max(255, 'Cannot exceed 255 characters')
			.matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
		email: yup.string().email('Invalid email format').required('Email is required'),
		analystIdList: yup.array().min(1, 'Client Name is required')
		//recipientEmail: yup.array().min(1, 'Recipient Email is required')
	});

	const clientForm = useFormik({
		initialValues: {
			name: '',
			email: '',
			analystIdList: [],
			recipientEmailList: [],
			isConversionRate: false,
			isCostPerAcquisition: false
		},
		validationSchema: validationSchema,
		onSubmit: (values: IClientForm) => {
			debugger;
			const castValues = validationSchema.cast(values);
			createClient(values);
			alert(JSON.stringify(values));
			handleClose();
		}
	});

	const createClient = (client: IClientForm) => {
		debugger;
		client.isConversionRate = isConversionRate;
		client.isCostPerAcquisition = isCostPerAcquisition;
		client.recipientEmailList = recipientEmailList;
		axiosInstance
			.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager/client-account/create`, client)
			.then(function (response) {
				enqueueSnackbar(
					<CPAlert title={t('successful')} message={t('New client has been created')} severity={'success'} />
				);
				handleClose();
			})
			.catch((error) => {
				let message = getReadableError(error);
				enqueueSnackbar(<CPAlert title={t('error')} message={message} severity={'error'} />);
			});
	};
	const handleSave = () => {
		debugger;
		clientForm.handleSubmit();
	};

	const handleOnChange = () => {};

	const [inputList, setInputList] = useState<string[]>([]);

	const handleAdd = () => {
		setInputList([...inputList, 'element']);
	};
	const handleMultiselect = (event: any, newValue: any) => {
		debugger;
		let newArray = [];
		newArray = newValue.map((item: any) => item.key);
		//console.log(newValue);
		clientForm.setFieldValue('analystIdList', newArray);
	};
	const handleisConversionRate = (event: any, checked: any) => {
		debugger;
		setisConversionRate(checked);
	};
	const handleisCostPerAcquisition = (event: any, checked: any) => {
		debugger;
		setisCostPerAcquisition(checked);
	};

	const handleRecipientEmail = (event: any) => {
		debugger;
		const emailArray: string[] = [event.target.value];
		setRecipientEmailList(emailArray);
	};

	const handleRecipientEmailRemoveClick = (event: any) => {
		debugger;
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
						name="email"
						onBlur={clientForm.handleBlur}
						handleChange={clientForm.handleChange}
						error={clientForm.touched.email && clientForm.errors.email ? true : false}
						helperText={clientForm.touched.email ? clientForm.errors.email : ''}
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={6}>
					<CPMultiSelectDropDown
						id="analystIdList"
						options={analystList}
						label="Select analyst"
						onBlur={clientForm.handleBlur}
						handleChange={handleMultiselect}
						//	handleChange={clientForm.handleChange}
						size={'small'}
						name="analystIdList"
						error={clientForm.touched.analystIdList && clientForm.errors.analystIdList ? true : false}
						helperText={clientForm.touched.analystIdList ? clientForm.errors.analystIdList : ''}
					/>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3} sx={{ marginTop: '20px' }}>
						<Grid item xs={12}>
							<span>Report recipient email</span>
						</Grid>
						<Grid item xs={12}>
							<Grid item xs={6}>
								<Stack spacing={3} direction="column">
									{/* <Grid item xs={12}> */}
									{inputList.map((input) => (
										<CPTextField
											handleChange={handleRecipientEmail}
											label="Email"
											fullWidth
											size="small"
											name={'ss'}
											inputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton edge="end" style={{ color: 'red' }} onClick={handleRecipientEmailRemoveClick}>
															<RemoveCircleIcon />
														</IconButton>
													</InputAdornment>
												)
											}}
										/>
									))}
								</Stack>
							</Grid>
							{/* </Grid> */}
							<Grid item xs={6} sx={{ display: 'flex' }}>
								<CPTextField
									label="Email"
									name="recipientEmail"
									fullWidth
									size="small"
									onBlur={handleRecipientEmail}
									inputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton edge="end" style={{ color: 'red' }} onClick={handleRecipientEmailRemoveClick}>
													<RemoveCircleIcon />
												</IconButton>
											</InputAdornment>
										)
									}}
									//handleChange={handleRecipientEmail}
									//	error={clientForm.errors.recipientEmail ? true : false}
									//	helperText={clientForm.errors.recipientEmail ? clientForm.errors.recipientEmail : ''}
								/>
								<CPButton
									label={<AddIcon />}
									onClick={handleAdd}
									variant="contained"
									style={{ width: '48px', height: '48px', marginLeft: 10 }}
									//	disabled={clientForm.errors.recipientEmail ? true : false}
								/>
								<span style={{ marginLeft: 10 }}>add more</span>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container sx={{ marginTop: '20px', marginBottom: '20px' }}>
								<Grid item xs={6}>
									<CPSwitch handleChange={handleisConversionRate}></CPSwitch>
									<span style={{ marginLeft: 10 }}>Conversion rate</span>
								</Grid>
								<Grid item xs={6}>
									<CPSwitch handleChange={handleisCostPerAcquisition}></CPSwitch>
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
