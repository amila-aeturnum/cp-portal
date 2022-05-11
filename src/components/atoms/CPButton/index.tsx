import * as React from 'react';
import { Button } from '@mui/material';
import { MouseEventHandler } from 'react';

interface ICPButton {
	label?: string;
	variant?: 'text' | 'outlined' | 'contained';
	color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	startIcon?: React.ReactNode;
	style?: React.CSSProperties;
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CPButton(props: ICPButton) {
	const { label, variant, color, startIcon, style, onClick } = props;
	return (
		<Button variant={variant} color={color} startIcon={startIcon} style={style} onClick={onClick}>
			{label}
		</Button>
	);
}
