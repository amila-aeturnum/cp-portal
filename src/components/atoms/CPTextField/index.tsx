import * as React from 'react';

import TextField from '@mui/material/TextField';

interface ICPTextField {
	label?: string;
	handleChange: (text: string) => void;
}

export default function CPTextField(props: ICPTextField) {
	const { label, handleChange } = props;
	return (
		<TextField id="outlined-basic" label={label} variant="outlined" onChange={(e) => handleChange(e.target.value)} />
	);
}
