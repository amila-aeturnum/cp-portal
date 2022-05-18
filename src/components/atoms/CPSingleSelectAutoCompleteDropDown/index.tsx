import * as React from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';

interface ICPSingleSelectAutoCompleteDropDown {
	label: string;
	options: OptionItem[];
	size?: 'small' | 'medium';
	id?: string;
}

interface OptionItem {
	key: string;
	value: string;
	id: number;
}

export default function CPSingleSelectAutoCompleteDropDown(props: ICPSingleSelectAutoCompleteDropDown) {
	const { label, size, options, id } = props;
	return (
		<Autocomplete
			size={size}
			id={id}
			fullWidth={true}
			options={options}
			getOptionLabel={(option) => option.value}
			renderInput={(params) => <TextField {...params} label={label} />}
		/>
	);
}
