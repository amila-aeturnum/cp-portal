import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface ICPSingleSelectDropDown {
	options: OptionItem[];
	label?: string;
	handleChange: (text: string) => void;
}
interface OptionItem {
	key: string;
	value: string;
	id: number;
}
export default function CPSingleSelectDropDown(props: ICPSingleSelectDropDown) {
	const [age, setAge] = React.useState('');
	const { label, options } = props;
	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
	};
	return (
		<FormControl sx={{ width: 318, height: 42 }}>
			<InputLabel id="demo-simple-select-label">{label}</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={age}
				label={label}
				onChange={handleChange}
			>
				{Object.values(options).map((option) => (
					<MenuItem key="option.key" value={option.value}>
						{option.value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
