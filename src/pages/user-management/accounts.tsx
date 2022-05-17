import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import * as React from 'react';
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
import { useEffect } from 'react';
import axiosInstance from 'configs/axiosConfig';

interface IClientForm {
	name?: string;
	description: string;
}

const Accounts: NextPage = () => {
	const [open, setOpen] = React.useState(false);
	const { t, i18n } = useTranslation();

	useEffect(() => {
		axiosInstance
			.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager/client-account/all`)
			.then(function (response) {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

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
		name: yup.number().required(t('Welcome to React')),
		description: yup.string().required('name_required')
	});

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	const clientForm = useFormik({
		initialValues: {
			name: '',
			description: ''
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
			<Grid>
				<Grid container spacing={3} sx={{ marginTop: '10px' }} rowSpacing={2}>
					<Grid item xs={12} md={6}></Grid>
					<Grid item xs={12} md={6}>
						<CPTextField
							label="description"
							name="description"
							handleChange={clientForm.handleChange}
							onBlur={clientForm.handleBlur}
							error={clientForm.touched.description && clientForm.errors.description ? true : false}
							helperText={clientForm.touched.description ? clientForm.errors.description : ''}
							size={'small'}
							fullWidth
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3} sx={{ marginTop: '10px' }} rowSpacing={2}>
					<Grid item xs={12} md={6}>
						<CPTextField
							label="Name"
							name="name"
							onBlur={clientForm.handleBlur}
							handleChange={clientForm.handleChange}
							error={clientForm.touched.name && clientForm.errors.name ? true : false}
							helperText={clientForm.touched.name ? clientForm.errors.name : ''}
							size={'small'}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CPTextField
							label="description"
							name="description"
							handleChange={clientForm.handleChange}
							onBlur={clientForm.handleBlur}
							error={clientForm.touched.description && clientForm.errors.description ? true : false}
							helperText={clientForm.touched.description ? clientForm.errors.description : ''}
							size={'small'}
							fullWidth
						/>
					</Grid>
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
								<CPButton label={'Create user'} variant="contained" />
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

					<DataTable onEditAction={handleEdit} />
				</div>
			</main>
		</div>
	);
};

export default Accounts;
