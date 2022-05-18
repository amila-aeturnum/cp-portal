import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';

interface ICPSingleSelectDropDown {
	options: OptionItem[];
	label?: string;
	fullWidth?: boolean;
	size?: 'small' | 'medium';
	error?: boolean | undefined;
	helperText?: string;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
	onBlur?: (e: ChangeEvent) => void;
	name: string;
	id?: string | undefined;
}
interface OptionItem {
	key: string;
	value: string;
	id: string;
}
export default function CPSingleSelectDropDown(props: ICPSingleSelectDropDown) {
	const [age, setAge] = React.useState('');
	const { label, options, fullWidth, size, name, helperText, error, setFieldValue, id, onBlur } = props;

	return (
		<FormControl fullWidth={fullWidth} size={size} error={error}>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				label={label}
				onChange={(e) => {
					setFieldValue(name, e.target.value);
				}}
				onBlur={onBlur}
				name={name}
			>
				{Object.values(options).map((option) => (
					<MenuItem key={option.key} value={option.id}>
						{option.value}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
}
