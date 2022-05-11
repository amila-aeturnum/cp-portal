import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface ICPSingleSelectDropDown {
	options:[]
	label?: string;
	handleChange: (text: string) => void;
}

export default function CPSingleSelectDropDown(props: ICPSingleSelectDropDown) {
	const [age, setAge] = React.useState('');
	const { label,options } = props;
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
				<MenuItem value={10}>Funnel Name</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select>
		</FormControl>
	);
}
