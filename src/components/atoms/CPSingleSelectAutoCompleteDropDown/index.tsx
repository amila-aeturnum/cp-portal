import * as React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
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
	loading?: boolean;
	disableClearable?: boolean;
}

export default function CPSingleSelectAutoCompleteDropDown(props: ICPSingleSelectAutoCompleteDropDown) {
	const { label, setFieldValue, error, helperText, onBlur, size, options, id, name, loading, disableClearable } = props;
	return (
		<Autocomplete
			size={size}
			id={id}
			fullWidth={true}
			options={options}
			getOptionLabel={(option) => option.label}
			onChange={(e: object, value: any | null) => {
				setFieldValue(name, value.value);
			}}
			disableClearable={disableClearable}
			loading={loading}
			renderInput={(params) => (
				<TextField
					{...params}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? (
									<CircularProgress color="inherit" size={20} style={{ position: 'absolute', right: '32px' }} />
								) : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						)
					}}
					name={name}
					label={label}
					error={error}
					onBlur={onBlur}
					helperText={helperText}
				/>
			)}
		/>
	);
}
