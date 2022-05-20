import * as React from 'react';
import { Button } from '@mui/material';
import { MouseEventHandler } from 'react';

interface ICPButton {
	label: string | React.ReactNode;
	variant?: 'text' | 'outlined' | 'contained';
	color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	startIcon?: React.ReactNode;
	style?: React.CSSProperties;
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	disabled?: boolean;
}

export default function CPButton(props: ICPButton) {
	const { label, variant, color, startIcon, style, onClick, disabled } = props;
	return (
		<Button variant={variant} color={color} startIcon={startIcon} style={style} onClick={onClick} disabled={disabled}>
			{label}
		</Button>
	);
}
