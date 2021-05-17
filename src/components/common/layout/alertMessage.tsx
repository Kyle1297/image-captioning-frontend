import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { AlertState } from '../../../store/types/alert';
import { openAlert } from '../../../store/actions/alert';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const AlertMessage: React.FC = () => {
	// retrieve styles and alert status
	const styles = useStyles();
	const alert = useSelector<AppState, AlertState>((state) => state.alert);
	const dispatch = useDispatch();

	// handle closure of alert
	const handleAlert = (event?: React.SyntheticEvent, reason?: string) =>
		dispatch(openAlert(false));

	return alert ? (
		<Snackbar
			key={alert.message}
			open={alert.loading ? true : alert.open}
			autoHideDuration={alert.loading ? null : 3000}
			onClose={handleAlert}
			anchorOrigin={
				alert.loading === null
					? { vertical: 'bottom', horizontal: 'center' }
					: { vertical: 'top', horizontal: 'center' }
			}
		>
			<MuiAlert
				elevation={6}
				variant='filled'
				severity={alert.severity}
				action={
					alert.loading ? (
						<CircularProgress className={styles.loading} size={26} />
					) : (
						''
					)
				}
			>
				{alert.message}
			</MuiAlert>
		</Snackbar>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		loading: {
			marginLeft: 25,
			marginRight: 4,
			color: 'orange',
		},
	})
);

export default AlertMessage;
