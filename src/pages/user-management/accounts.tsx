import type { NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import { useState } from 'react';
import Breadcrumb from 'components/molecules/Breadcrumb';
import ResponsiveDialog from 'components/molecules/ResponsiveDialog';
import { Grid, OutlinedInput, InputAdornment } from '@mui/material';
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

interface IClientForm {
	name: string;
	email: string;
	userType: string;
	client: string;
}

const Accounts: NextPage = () => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		clientForm.handleReset(clientForm);
		setOpen(false);
	};
	const handleDataExport = () => {
		alert('not implemented');
	};

	const validationSchema = yup.object({
		name: yup.string().required(t('value_required')),
		email: yup.string().required(t('value_required')).email()
	});

	const clientForm = useFormik({
		initialValues: {
			name: '',
			email: '',
			userType: '',
			client: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values: IClientForm) => {
			alert(JSON.stringify(values));
			handleClose();
		}
	});

	const dialogContent = (
		<form onSubmit={clientForm.handleSubmit} onReset={clientForm.handleReset}>
			<Grid container sx={{ marginTop: '10px' }} spacing={3}>
				<Grid item xs={12} sm={6} md={6}>
					<CPSingleSelectDropDown
						options={[{ key: '1', value: 'sss', id: 1 }]}
						handleChange={() => {}}
						fullWidth
						size="small"
						label={t('userType')}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<CPSingleSelectAutoCompleteDropDown
						size="small"
						options={[{ key: '1', value: 'sss', id: 1 }]}
						label={t('client')}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6}>
					<CPTextField
						label={t('name')}
						name="name"
						onBlur={clientForm.handleBlur}
						handleChange={clientForm.handleChange}
						error={clientForm.touched.name && clientForm.errors.name ? true : false}
						helperText={clientForm.touched.name ? clientForm.errors.name : ''}
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
								<CPButton label={'Create user'} variant="contained" style={{ padding: '8px 32px' }} />
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
