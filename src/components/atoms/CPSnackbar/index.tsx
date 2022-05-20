import { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
interface ICPSnackbar {
	content: React.ReactNode;
	key?: string | number;
}

const CPSnackbar = forwardRef<HTMLDivElement, ICPSnackbar>((props, ref) => {
	const { content, key } = props;

	const { closeSnackbar } = useSnackbar();
	const handleDismiss = useCallback(() => {
		closeSnackbar(key);
	}, [props.key, closeSnackbar]);
	return <SnackbarContent ref={ref}>{content}</SnackbarContent>;
});
export default CPSnackbar;
