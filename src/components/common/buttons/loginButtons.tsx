import React, { Fragment, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
	Button,
	Grid,
	Divider,
	useMediaQuery,
	MenuItem,
	withStyles,
	Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/reducers';
import { AuthState } from '../../../store/types/auth';
import { logoutUser } from '../../../store/actions/auth';
import { LoginState, TabNumbers } from '../../../store/types/login';
import { openLogin, setLogin } from '../../../store/actions/login';
import { setAlert } from '../../../store/actions/alert';
import { SeverityTypes } from '../../../store/types/alert';
import { Request, RequestEnums } from '../../../store/types/request';
import { namedRequestsInProgress } from '../../../store/selectors/request';

const LoginButtons: React.FC = () => {
	// access styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 500px)');

	// retrieve login form states
	const open = useSelector<AppState, LoginState['open']>(
		(state) => state.login.open
	);

	// login dialog functionality
	const dispatch = useDispatch();
	const handleLoginClick = (
		event: React.MouseEvent<HTMLButtonElement>,
		tabNumber: TabNumbers
	) => {
		event.preventDefault();
		dispatch(
			setLogin({
				tab: tabNumber,
				open: !open,
			})
		);
	};

	// handle logout
	const [logout, setLogout] = useState<boolean>(false);
	const handleLogoutClick = () => {
		setLogout(true);
		dispatch<any>(logoutUser());
		dispatch(openLogin(false));
	};

	// retrieve user authentication
	const isAuthenticated = useSelector<AppState, AuthState['isAuthenticated']>(
		(state) => state.auth.isAuthenticated
	);

	// detect when logout request is occurring
	const logoutIsLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.logoutUser)
	);

	// show alert when logged out successfully
	useEffect(() => {
		if (logout && !logoutIsLoading)
			dispatch(
				setAlert({
					severity: SeverityTypes.INFO,
					message: 'You were successfully logged out!',
					open: true,
					loading: null,
				})
			);
	}, [logout, logoutIsLoading, dispatch]);

	return isAuthenticated ? (
		<StyledMenuItem onClick={handleLogoutClick} className={styles.menuItem}>
			<Typography className={styles.content}>Logout</Typography>
		</StyledMenuItem>
	) : (
		<Fragment>
			<Grid container wrap='nowrap' justify='center'>
				<Grid item xs={smallScreen ? 7 : false}>
					<Button
						fullWidth
						className={styles.button}
						style={smallScreen ? {} : { minWidth: 85 }}
						onClick={(event) => handleLoginClick(event, TabNumbers.LOGIN)}
					>
						Login
					</Button>
				</Grid>
				<Grid item xs={smallScreen ? 1 : false}>
					<Divider
						classes={{
							root: styles.divider,
						}}
						orientation='vertical'
						variant='middle'
					/>
				</Grid>
				<Grid item xs={smallScreen ? 7 : false}>
					<Button
						fullWidth
						className={styles.button}
						onClick={(event) => handleLoginClick(event, TabNumbers.JOIN)}
					>
						Join
					</Button>
				</Grid>
			</Grid>
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			textTransform: 'none',
			fontSize: 15,
			minWidth: 75,
		},
		divider: {
			margin: 'auto',
		},
		content: {
			marginLeft: 7,
		},
		menuItem: {
			paddingTop: 12,
			paddingBottom: 12,
		},
	})
);

const StyledMenuItem = withStyles({
	root: {
		'&:hover': {
			backgroundColor: 'lightgray',
		},
	},
})(MenuItem);

export default LoginButtons;
