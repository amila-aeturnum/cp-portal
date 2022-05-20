import * as React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';
import { IOptionItem } from 'interfaces/optionItem.interface';

interface ICPSingleSelectDropDown {
	options: IOptionItem[];
	label?: string;
	fullWidth?: boolean;
	size?: 'small' | 'medium';
	error?: boolean | undefined;
	helperText?: string;
	setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
	onChange?: (event: SelectChangeEvent<string>) => void;
	onBlur?: (e: ChangeEvent) => void;
	name: string;
	id?: string | undefined;
	disabled?: boolean;
}

export default function CPSingleSelectDropDown(props: ICPSingleSelectDropDown) {
	const { label, options, fullWidth, size, name, helperText, error, setFieldValue, id, onBlur, onChange, disabled } =
		props;

	return (
		<FormControl fullWidth={fullWidth} size={size} error={error} disabled={disabled}>
			<InputLabel id={id}>{label}</InputLabel>
			<Select
				label={label}
				onChange={(e) => {
					setFieldValue?.(name, e.target.value);
					onChange?.(e);
				}}
				onBlur={onBlur}
				name={name}
				defaultValue=""
			>
				{Object.values(options).map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	);
}
