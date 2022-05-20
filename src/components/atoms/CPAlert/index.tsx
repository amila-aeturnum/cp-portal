import * as React from 'react';
import { Alert, AlertColor, AlertTitle } from '@mui/material';
import { useTheme } from '@mui/material';

interface ICPAlert {
	message: string | React.ReactNode;
	severity: AlertColor;
	title: string | React.ReactNode;
}

export default function CPAlert(props: ICPAlert) {
	const { message, severity, title } = props;
	const theme = useTheme();
	const borderColor = () => {
		switch (severity) {
			case 'success':
				return theme.palette.success.main;
			case 'error':
				return theme.palette.error.main;
			case 'warning':
				return theme.palette.warning.main;
			case 'info':
				return theme.palette.info.main;
		}
	};
	return (
		<Alert severity={severity} sx={{ borderColor: { borderColor }, border: 1 }}>
			<AlertTitle>{title}</AlertTitle>
			{message}
		</Alert>
	);
}
