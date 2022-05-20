import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

interface ICPTextField {
	label: string;
	name: string;
	error?: boolean | undefined;
	helperText?: string;
	handleChange?: (e: ChangeEvent) => void;
	onBlur?: (e: ChangeEvent) => void;
	size?: 'small' | 'medium';
	fullWidth?: boolean;
	type?: string;
}

export default function CPTextField(props: ICPTextField) {
	const { label, handleChange, error, name, helperText, onBlur, size, fullWidth, type } = props;

	return (
		<TextField
			type={type}
			id="outlined-basic"
			label={label}
			name={name}
			variant="outlined"
			error={error}
			onBlur={onBlur}
			onChange={handleChange}
			helperText={helperText}
			size={size}
			fullWidth={fullWidth}
		/>
	);
}
