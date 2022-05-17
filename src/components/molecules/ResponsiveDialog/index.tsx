import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

interface IResponsiveDialog {
	open: boolean;
	title: string;
	maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xs';
	fullWidth?: boolean;
	handleClose: () => void;
	content: React.ReactNode;
	actions: React.ReactNode;
}

export default function ResponsiveDialog(props: IResponsiveDialog) {
	const { title, content, handleClose, open, maxWidth = 'md', fullWidth = true, actions } = props;

	return (
		<React.Fragment>
			<Dialog fullWidth={fullWidth} title={title} maxWidth={maxWidth} open={open} onClose={handleClose}>
				<DialogTitle sx={{ fontSize: 24, fontWeight: 500 }}>
					{title}
					<IconButton onClick={handleClose} sx={{ float: 'right' }}>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>{content}</DialogContent>
				<DialogActions>{actions}</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
