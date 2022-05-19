import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Breadcrumb from 'components/molecules/Breadcrumb';
import ResponsiveDialog from 'components/molecules/ResponsiveDialog';
import { Grid, OutlinedInput, InputAdornment, SelectChangeEvent, CircularProgress } from '@mui/material';
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

interface IClientForm {
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
	const { t } = useTranslation();
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
					console.log(error);
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
					console.log(error);
					setIsLoadingClientList(false);
				});
		}
	}, [open]);
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

	const createAccount = (client: IClientForm) => {
		axiosInstance
			.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager/user/create`, client)
			.then(function (response) {
				handleClose();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	let validationSchemaConditional: any;
	if (isAnalyst) {
		validationSchemaConditional = yup.object({
			userRole: yup.string().required(t('value_required')),
			fullName: yup.string().required(t('value_required')),
			email: yup.string().required(t('value_required')).email()
		});
	} else {
		validationSchemaConditional = yup.object({
			userRole: yup.string().required(t('value_required')),
			clientAccountId: yup.string().required(t('value_required')),
			fullName: yup.string().required(t('value_required')),
			email: yup.string().required(t('value_required')).max(255, t('invalid_email')).email(t('invalid_email'))
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
		onSubmit: (values: IClientForm) => {
			createAccount(values);
		}
	});

	const dialogContent = (
		<form onSubmit={clientForm.handleSubmit} onReset={clientForm.handleReset}>
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
								<CPButton
									label={'Create user'}
									variant="contained"
									style={{ padding: '8px 32px' }}
									onClick={clientForm.submitForm}
									disabled={!(clientForm.isValid && clientForm.dirty)}
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
							/>
						</Grid>
					</Grid>
				</div>
			</main>
		</div>
	);
};

export default Accounts;
