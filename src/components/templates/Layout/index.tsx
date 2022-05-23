import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ListItem, ListItemButton } from '@mui/material';
import { Drawer, DrawerHeader } from './Drawer';
import { useRouter } from 'next/router';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { useEffect } from 'react';
import { get } from 'lodash-es';
import Loader from 'components/atoms/Loader';
import { loginRequest } from 'configs/azureConfig';
import { setAuthToken } from 'utils/localStorageUtil';
import axiosInstance from 'configs/axiosConfig';

interface ILayout {
	children: React.ReactNode;
}

export default function Layout(props: ILayout) {
	const { children } = props;
	const [open, setOpen] = React.useState(true);
	const [authenticated, setAuthenticated] = React.useState<boolean>();
	const router = useRouter();
	const { instance, accounts } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const currentAccount = accounts[0];

	const request = {
		...loginRequest,
		account: currentAccount
	};

	useEffect(() => {
		setAuthenticated(isAuthenticated);
	}, [isAuthenticated]);

	useEffect(() => {
		if (authenticated) {
			instance.acquireTokenSilent(request).then((response) => {
				const accessToken = response.accessToken;
				setAuthToken(accessToken);
				axiosInstance
					.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_API_URL}/entitymanager/user/profile`)
					.then(function (response) {
						console.log(response);
					})
					.catch((error) => {
						console.log(error);
					});
			});
		}
	}, [authenticated]);

	const handleSideNavOpen = () => {
		setOpen(true);
	};

	const handleSideNavClose = () => {
		setOpen(false);
	};

	const handleLogout = () => {
		instance.logoutRedirect({
			account: currentAccount
		});
	};

	if (!authenticated) {
		return (
			<>
				<Loader />
				{children}
			</>
		);
	} else {
		return (
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Drawer variant="permanent" open={open}>
					<DrawerHeader sx={{ height: 140 }}>
						<div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }}></div>
					</DrawerHeader>
					<Divider />
					<List sx={{ overflowY: 'auto', overflowX: 'hidden', height: '40%' }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5
							}}
							onClick={() => router.push('/user-management/accounts')}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center'
								}}
							>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary={'User Management-Account'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
						{['User Management-Client', 'Global Query List', 'Customized Queries', 'Statistics'].map((text, index) => (
							<ListItemButton
								key={text}
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5
								}}
								onClick={() => router.push('/user-management/clients/')}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center'
									}}
								>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						))}
					</List>
					<Divider />
					<List sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
						{['Notifications', 'Settings'].map((text, index) => (
							<ListItemButton
								key={text}
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center'
									}}
								>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						))}
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5
							}}
							onClick={handleLogout}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center'
								}}
							>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</List>
					<div style={{ bottom: 10, position: 'absolute', width: '100%' }}>
						<IconButton onClick={open ? handleSideNavClose : handleSideNavOpen}>
							{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
						<List>
							<ListItem
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
									bottom: 0
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center'
									}}
								>
									<AccountCircleIcon fontSize="medium" />
								</ListItemIcon>
								<ListItemText
									primary={get(currentAccount, 'idTokenClaims.name')}
									secondary={get(currentAccount, 'idTokenClaims.email')}
									sx={{ opacity: open ? 1 : 0 }}
									primaryTypographyProps={{
										noWrap: true
									}}
									secondaryTypographyProps={{ noWrap: true }}
								/>
							</ListItem>
						</List>
					</div>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					{children}
				</Box>
			</Box>
		);
	}
}
