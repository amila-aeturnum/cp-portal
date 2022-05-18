import * as React from 'react-dom';
import TextField from '@mui/material/TextField';
import { ChangeEvent } from 'react';

interface ICPTextField {
	label: string;
	name: string;
	error?: boolean | undefined;
	helperText?: string;
	handleChange?: (e: ChangeEvent) => void;
	onBlur?: (e: ChangeEvent) => void;
}

export default function CPTextField(props: ICPTextField) {
	const { label, handleChange, error, name, helperText, onBlur } = props;
	return (
		<TextField
			sx={{ width: 318, height: 42 }}
			id="outlined-basic"
			label={label}
			name={name}
			variant="outlined"
			error={error}
			onBlur={onBlur}
			onChange={handleChange}
			helperText={helperText}
		/>
	);
}
