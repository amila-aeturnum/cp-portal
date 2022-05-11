import * as React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { ButtonBaseActions } from '@mui/material';
interface ICPSwitch {
	disabled?: boolean;
	action?: React.Ref<ButtonBaseActions>;
}
export default function CPSwitch(props: ICPSwitch) {
	const { disabled, action } = props;
	return <IOSSwitch disabled={disabled} action={action} />;
}

const IOSSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 52,
	height: 32,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(20px)',
			color: theme.palette.primary.cpSwitch?.primaryBackground,
			'& + .MuiSwitch-track': {
				backgroundColor: theme.secondary.main,
				opacity: 1,
				border: 0
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5
			}
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: theme.secondary.main,
			border: '6px solid ' + theme.palette.primary.cpSwitch?.primaryBackground
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color: theme.palette.grey[100]
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: 0.7
		}
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 28,
		height: 28
	},
	'& .MuiSwitch-track': {
		borderRadius: 32 / 2,
		backgroundColor: theme.palette.primary.cpSwitch?.disableBackground,
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500
		})
	}
}));
