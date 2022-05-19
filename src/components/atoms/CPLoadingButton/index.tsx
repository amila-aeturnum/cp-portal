import * as React from 'react';
import { MouseEventHandler } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

interface ICPLoadingButton {
	label: string | React.ReactNode;
	variant?: 'text' | 'outlined' | 'contained';
	color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
	startIcon?: React.ReactNode;
	style?: React.CSSProperties;
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	disabled?: boolean;
	loading?: boolean;
}

export default function CPLoadingButton(props: ICPLoadingButton) {
	const { label, variant, color, startIcon, style, onClick, disabled, loading } = props;
	return (
		<LoadingButton
			variant={variant}
			color={color}
			startIcon={startIcon}
			style={style}
			onClick={onClick}
			disabled={disabled}
			loading={loading}
		>
			{label}
		</LoadingButton>
	);
}
