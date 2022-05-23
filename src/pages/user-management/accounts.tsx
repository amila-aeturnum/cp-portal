import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import { useState, useEffect, ChangeEvent } from 'react';
import Breadcrumb from 'components/molecules/Breadcrumb';
import ResponsiveDialog from 'components/molecules/ResponsiveDialog';
import { Grid, OutlinedInput, InputAdornment, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CPButton from 'components/atoms/CPButton';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SearchIcon from '@mui/icons-material/Search';
import CPTextField from 'components/atoms/CPTextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import CPSingleSelectDropDown from 'components/atoms/CPSingleSelectDropDown';
import CPSingleSelectAutoCompleteDropDown from 'components/atoms/CPSingleSelectAutoCompleteDropDown';
import axiosInstance from 'configs/axiosConfig';
import { IRoleList } from 'types/userRole.types';
import { IOptionItem } from 'interfaces/optionItem.interface';
import { toFirstLetterCapital } from 'utils/helpers';
import { IUserAccountList } from 'types/userAccountList.type';
import CPLoadingButton from 'components/atoms/CPLoadingButton';
import { useSnackbar } from 'notistack';
import CPAlert from 'components/atoms/CPAlert';
import { getReadableError } from 'utils/errorHelper';
import useDebounce from 'hooks/useDebounce';
import { deleteEndpointPromise, getEndpointPromise } from 'services/apiServices';
import { get } from 'lodash';
import DataTable from 'components/molecules/DataTable';
import { IColumn } from 'components/molecules/DataTable/DataTable.type';
import { useMsal } from '@azure/msal-react';

interface IAccountForm {
	fullName: string;
	email: string;
	userRole: string;
	clientAccountId: string;
}

const Accounts: NextPage = () => {
	const [open, setOpen] = useState(false);
	const [userTypes, setUserTypes] = useState<IOptionItem[] | []>([]);
	const [isLoadingUserTypes, setIsLoadingUserTypes] = useState<boolean>(false);
	const [clients, setClients] = useState<IOptionItem[] | []>([]);
	const [isLoadingClientList, setIsLoadingClientList] = useState<boolean>(false);
	const [isAnalyst, setIsAnalyst] = useState<Boolean | null>(null);
	const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
	const { t } = useTranslation();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);
	const [keyword, setKeyword] = useState<string>('');
	const [tableLoading, setTableLoading] = useState<boolean>(false);
	const debouncedKeyword = useDebounce<string>(keyword, 1000);
	const [accountList, setAccountsList] = useState([]);
	const [rowCount, setRowCount] = useState<number>(0);
	const { accounts } = useMsal();
	const currentAccount = accounts[0];
	console.log(currentAccount);
	const columns: IColumn[] = [
		{ id: 'clientName', label: 'Client Name', minWidth: 170 },
		{ id: 'email', label: 'Email', minWidth: 100 },
		{
			id: 'userFullName',
			label: 'Full Name',
			minWidth: 170,
			align: 'right'
		},
		{
			id: 'userRole',
			label: 'Role',
			minWidth: 170,
			align: 'right'
		}
	];

	useEffect(() => {
		getAllAccounts();
	}, [page, rowsPerPage, debouncedKeyword]);

	// get user roles
	useEffect(() => {
		if (open) {
			setIsLoadingUserTypes(true);
			axiosInstance
				.get<IRoleList>(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager/user/roles`)
				.then(function (response) {
					var mapUserTypes: IOptionItem[] = [];
					response.data.roleList?.forEach((value) => {
						mapUserTypes.push({ value: value.roleId, label: toFirstLetterCapital(value.roleName) });
					});
					setUserTypes(mapUserTypes);
					setIsLoadingUserTypes(false);
				})
				.catch((error) => {
					let message = getReadableError(error);
					enqueueSnackbar(<CPAlert title={t('error')} message={message} severity={'error'} />);
					setIsLoadingUserTypes(false);
				});
		}
	}, [open]);
	// get client list
	useEffect(() => {
		if (open) {
			setIsLoadingClientList(true);
			axiosInstance
				.get<IUserAccountList>(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager/client-account/list`)
				.then(function (response) {
					var clients: IOptionItem[] = [];
					response.data.userAccountList?.forEach((value) => {
						clients.push({ value: value.id, label: toFirstLetterCapital(value.clientName) });
					});
					setClients(clients);
					setIsLoadingClientList(false);
				})
				.catch((error) => {
					let message = getReadableError(error);
					enqueueSnackbar(<CPAlert title={t('error')} message={message} severity={'error'} />);
					setIsLoadingClientList(false);
				});
		}
	}, [open]);

	const getAllAccounts = async () => {
		try {
			setTableLoading(true);
			const response = await getEndpointPromise(
				`/entitymanager/user/all?count=${rowsPerPage}&page=${page}&keyword=${keyword}&userObjectId=${get(
					currentAccount,
					'localAccountId'
				)}`
			);
			setRowCount(get(response, 'data.pagination.total'));
			setAccountsList(get(response, 'data.userAccountList'));
		} catch (error) {
			console.log(error);
		} finally {
			setTableLoading(false);
		}
	};

	const onUserTypeChange = (e: SelectChangeEvent<string>) => {
		if (userTypes.length == 0) {
			return;
		}
		let userType = e.target.value;
		clientForm.setFieldValue(e.target.name, userType);
		if (userTypes.find((element) => element.value.toString() == userType)?.label === 'Analyst') {
			clientForm.setFieldValue('clientAccountId', '');
			setIsAnalyst(true);
		} else {
			setIsAnalyst(false);
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		clientForm.handleReset(clientForm);
		setIsAnalyst(null);
		setOpen(false);
	};
	const handleDataExport = () => {
		alert('not implemented');
	};

	const createAccount = (client: IAccountForm) => {
		setIsCreatingAccount(true);
		axiosInstance
			.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager/user/create`, client)
			.then(function (response) {
				enqueueSnackbar(
					<CPAlert title={t('successful')} message={t('new_user_account_created')} severity={'success'} />
				);
				handleClose();
				setIsCreatingAccount(false);
			})
			.catch((error) => {
				let message = getReadableError(error);
				enqueueSnackbar(<CPAlert title={t('error')} message={message} severity={'error'} />);
				setIsCreatingAccount(false);
			});
	};

	let validationSchemaConditional: any;
	if (isAnalyst) {
		validationSchemaConditional = yup.object({
			userRole: yup.string().required(t('value_required')),
			fullName: yup.string().max(255, t('invalid_name')).required(t('value_required')).trim(),
			email: yup.string().required(t('value_required')).max(255, t('invalid_email')).email(t('invalid_email')).trim()
		});
	} else {
		validationSchemaConditional = yup.object({
			userRole: yup.string().required(t('value_required')),
			clientAccountId: yup.string().required(t('value_required')),
			fullName: yup.string().max(255, t('invalid_name')).required(t('value_required')).trim(),
			email: yup.string().required(t('value_required')).max(255, t('invalid_email')).email(t('invalid_email')).trim()
		});
	}

	const validationSchema = validationSchemaConditional;

	const clientForm = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			userRole: '',
			clientAccountId: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values: IAccountForm) => {
			const castValues = validationSchema.cast(values);
			createAccount(castValues);
		}
	});

	const handleDelete = async (data: any) => {
		try {
			const response = await deleteEndpointPromise(`/entitymanager/user/delete?id=${data.id}`);
			getAllAccounts();
			enqueueSnackbar('Successfully Deleted', { variant: 'success' });
		} catch (error) {
			console.log(error);
		} finally {
			setTableLoading(false);
		}
	};
	const handleEdit = (data: any) => {
		handleOpen();
	};

	const dialogContent = (
		<form
			onSubmit={clientForm.handleSubmit}
			onReset={clientForm.handleReset}
			onBlur={() => {
				// format inputs
				clientForm.values.fullName = clientForm.values.fullName.trim();
				clientForm.values.email = clientForm.values.email.trim();
			}}
		>
			<Grid container sx={{ marginTop: '10px' }} spacing={3}>
				<Grid item xs={12} sm={6} md={6}>
					<CPSingleSelectDropDown
						name="userRole"
						options={userTypes}
						fullWidth
						size="small"
						label={t('userType')}
						onBlur={clientForm.handleBlur}
						error={clientForm.touched.userRole && clientForm.errors.userRole ? true : false}
						helperText={clientForm.touched.userRole ? clientForm.errors.userRole : ''}
						onChange={onUserTypeChange}
						disabled={isLoadingUserTypes}
					/>
				</Grid>
				{isAnalyst ? null : (
					<Grid item xs={12} sm={6} md={6}>
						<CPSingleSelectAutoCompleteDropDown
							name="clientAccountId"
							size="small"
							options={clients}
							label={t('client')}
							onBlur={clientForm.handleBlur}
							setFieldValue={clientForm.setFieldValue}
							error={clientForm.touched.clientAccountId && clientForm.errors.clientAccountId ? true : false}
							helperText={clientForm.touched.clientAccountId ? clientForm.errors.clientAccountId : ''}
							loading={isLoadingClientList}
							disableClearable
						/>
					</Grid>
				)}
				<Grid item xs={12} sm={6} md={6}>
					<CPTextField
						label={t('name')}
						name="fullName"
						onBlur={clientForm.handleBlur}
						handleChange={clientForm.handleChange}
						error={clientForm.touched.fullName && clientForm.errors.fullName ? true : false}
						helperText={clientForm.touched.fullName ? clientForm.errors.fullName : ''}
						size={'small'}
						fullWidth
						value={clientForm.values.fullName}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<CPTextField
						label={t('email')}
						name="email"
						handleChange={clientForm.handleChange}
						onBlur={clientForm.handleBlur}
						error={clientForm.touched.email && clientForm.errors.email ? true : false}
						helperText={clientForm.touched.email ? clientForm.errors.email : ''}
						size={'small'}
						fullWidth
						value={clientForm.values.email}
					/>
				</Grid>
			</Grid>
		</form>
	);

	return (
		<div className={styles.container}>
			<Breadcrumb
				title={'Accounts'}
				actions={<CPButton label={'Add a Account'} startIcon={<AddIcon />} onClick={handleOpen} variant="contained" />}
			/>
			<main className={styles.main}>
				<div style={{ height: '60vh', width: '100%' }}>
					<ResponsiveDialog
						title={'Create user accounts'}
						content={dialogContent}
						open={open}
						handleClose={handleClose}
						actions={
							<>
								<CPLoadingButton
									label={'Create user'}
									variant="contained"
									style={{ padding: '8px 32px' }}
									onClick={clientForm.submitForm}
									disabled={!(clientForm.isValid && clientForm.dirty)}
									loading={isCreatingAccount}
								/>
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
								onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
							/>
						</Grid>
					</Grid>
					<DataTable
						onEditAction={handleEdit}
						onDeleteAction={handleDelete}
						rows={accountList}
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

export default Accounts;
