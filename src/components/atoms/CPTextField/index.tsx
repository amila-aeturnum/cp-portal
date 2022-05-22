import { InputBaseComponentProps, OutlinedInputProps } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

interface ICPTextField {
	label: string;
	name: string;
	error?: boolean | undefined;
	helperText?: string | any;
	handleChange?: (e: ChangeEvent) => void;
	onBlur?: (e: ChangeEvent) => void;
	size?: 'small' | 'medium';
	fullWidth?: boolean;
	value?: unknown;
	inputProps?: any;
}

export default function CPTextField(props: ICPTextField) {
	const { label, handleChange, error, name, helperText, onBlur, size, fullWidth, value, inputProps } = props;

	return (
		<TextField
			InputProps={inputProps}
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
			value={value}
		/>
	);
}
