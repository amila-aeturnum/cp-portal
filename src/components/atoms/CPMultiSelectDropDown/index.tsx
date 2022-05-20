import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { ChangeEvent } from 'react';

interface CPMultiSelectDropDown {
	onBlur?: (e: ChangeEvent) => void;
	id?: string;
	options: OptionItem[];
	label?: string;
	handleChange?: (event: any, newValue: any) => void;
	placeHolder?: string;
	name: string;
	error?: boolean | undefined;
	helperText?: string;
}

interface OptionItem {
	key: string;
	value: string;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CPMultiSelectDropDown(props: CPMultiSelectDropDown) {
	const { label, options, placeHolder, id, handleChange, name, error, onBlur, helperText } = props;
	return (
		<Autocomplete
			multiple
			onChange={handleChange}
			id={id}
			options={options}
			disableCloseOnSelect
			isOptionEqualToValue={(option, value) => option.key === value.key}
			getOptionLabel={(option) => option.value}
			renderOption={(props, option, { selected }) => (
				<li {...props} key={option.key}>
					<Checkbox
						id="{option.key}"
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
						key={option.key}
					/>
					{option.value}
				</li>
			)}
			style={{ width: 318, height: 42 }}
			renderInput={(params) => (
				<TextField
					{...params}
					name={name}
					label={label}
					error={error}
					onBlur={onBlur}
					helperText={helperText}
					placeholder={placeHolder}
				/>
			)}
		/>
	);
}
