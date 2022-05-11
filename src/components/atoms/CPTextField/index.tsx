import * as React from 'react-dom';

import TextField from '@mui/material/TextField';

interface ICPTextField {
	label?: string;
	handleChange: (text: string) => void;
}

export default function CPTextField(props: ICPTextField) {
	const { label, handleChange } = props;
	return (
		<TextField
			sx={{ width: 318, height: 42 }}
			id="outlined-basic"
			label={label}
			variant="outlined"
			onChange={(e) => handleChange(e.target.value)}
		/>
	);
}
