import * as React from 'react';
import { Alert, AlertColor, AlertTitle } from '@mui/material';

interface ICPAlert {
	message: string | React.ReactNode;
	severity: AlertColor;
	title: string | React.ReactNode;
}

export default function CPAlert(props: ICPAlert) {
	const { message, severity, title } = props;
	return (
		<Alert severity={severity} sx={{ borderColor: severity, border: 1 }}>
			<AlertTitle>{title}</AlertTitle>
			{message}
		</Alert>
	);
}
