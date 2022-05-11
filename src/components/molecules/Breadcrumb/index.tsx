import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

interface IBreadcrumb {
	title: string;
}

export default function Breadcrumb(props: IBreadcrumb) {
	const { title } = props;
	const breadcrumbs = [
		<Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
			Dashboard
		</Link>
		// <Link
		// 	underline="hover"
		// 	key="2"
		// 	color="inherit"
		// 	href="/material-ui/getting-started/installation/"
		// 	onClick={handleClick}
		// >
		// 	Core
		// </Link>,
		// <Typography key="3" color="text.primary">
		// 	Breadcrumb
		// </Typography>
	];

	return (
		<Stack sx={{ backgroundColor: '#FFF', marginBottom: 2, padding: 3, borderRadius: 2 }}>
			<Typography fontSize={24}>{title}</Typography>
			<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
				{breadcrumbs}
			</Breadcrumbs>
		</Stack>
	);
}
