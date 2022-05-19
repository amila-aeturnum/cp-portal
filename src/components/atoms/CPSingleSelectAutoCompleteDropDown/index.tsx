import * as React from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { IOptionItem } from 'interfaces/optionItem.interface';
interface ICPSingleSelectAutoCompleteDropDown {
	label: string;
	options: IOptionItem[];
	size?: 'small' | 'medium';
	id?: string;
	error?: boolean | undefined;
	helperText?: string;
	setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
	onBlur?: (e: ChangeEvent) => void;
	name: string;
}

export default function CPSingleSelectAutoCompleteDropDown(props: ICPSingleSelectAutoCompleteDropDown) {
	const { label, setFieldValue, error, helperText, onBlur, size, options, id, name } = props;
	return (
		<Autocomplete
			size={size}
			id={id}
			fullWidth={true}
			options={options}
			getOptionLabel={(option) => option.label}
			onChange={(e: object, value: any | null) => {
				console.log(value);
				setFieldValue(name, value.value);
			}}
			renderInput={(params) => (
				<TextField {...params} name={name} label={label} error={error} onBlur={onBlur} helperText={helperText} />
			)}
		/>
	);
}
