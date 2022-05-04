import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, drawerWidth } from './AppBar';
import { ListItem, ListItemButton } from '@mui/material';

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`
	}
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme)
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme)
	})
}));

interface ILayout {
	children: React.ReactNode;
}

export default function Layout(props: ILayout) {
	const theme = useTheme();
	const { children } = props;
	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' })
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						CP Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{['User Management', 'Global Query List', 'Customized Queries', 'Statistics'].map((text, index) => (
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
				</List>
				<Divider />
				<List>
					{['Notifications', 'Settings', 'Logout'].map((text, index) => (
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
				</List>
				<div style={{ position: 'absolute', bottom: 10 }}>
					<List sx={{ justifyContent: open ? 'initial' : 'center' }}>
						<ListItem
							key={'text'}
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
								position: 'absolute',
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
								<AccountCircleIcon fontSize="large" />
							</ListItemIcon>
							<ListItemText primary={'User'} secondary={'test@gmail.com'} sx={{ opacity: open ? 1 : 0 }} />
						</ListItem>
					</List>
				</div>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	);
}
