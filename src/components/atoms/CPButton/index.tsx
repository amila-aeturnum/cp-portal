import * as React from 'react';
import { Button } from '@mui/material';

interface ICPButton {
	label?: string;
	variant?: 'text' | 'outlined' | 'contained';
	color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	startIcon?: React.ReactNode;
	style?: React.CSSProperties;
}

export default function CPButton(props: ICPButton) {
	const { label, variant, color, startIcon, style } = props;
	return (
		<Button variant={variant} color={color} startIcon={startIcon} style={style}>
			{label}
		</Button>
	);
}
