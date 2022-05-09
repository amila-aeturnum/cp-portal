import * as React from 'react';
import { Button } from '@mui/material';

interface ICPButton {
	label?: string;
}

export default function CPButton(props: ICPButton) {
	const { label } = props;
	return <Button>{label}</Button>;
}
