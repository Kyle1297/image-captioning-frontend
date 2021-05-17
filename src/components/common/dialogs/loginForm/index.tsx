import React, { useEffect } from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	Button,
	useMediaQuery,
	Typography,
} from '@material-ui/core';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';
import DividerText from './dividerText';
import SocialButton, { LogoTypes } from './socialButton';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../../../../store/types/auth';
import { AppState } from '../../../../store/reducers';
import LoginFormFields from './loginFormFields';
import LoginTabs from './loginTabs';
import {
	IResolveParams,
	LoginSocialFacebook,
	LoginSocialGoogle,
	objectType,
} from 'reactjs-social-login';
import { LoginState, TabNumbers } from '../../../../store/types/login';
import { openLogin } from '../../../../store/actions/login';
import { setAlert } from '../../../../store/actions/alert';
import { SeverityTypes } from '../../../../store/types/alert';

const LoginForm: React.FC = () => {
	// control styles
	const styles = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	// retrieve user authentication and login form states
	const { open, tab } = useSelector<AppState, LoginState>(
		(state) => state.login
	);
	const isAuthenticated = useSelector<AppState, AuthState['isAuthenticated']>(
		(state) => state.auth.isAuthenticated
	);

	// handle form opening and closure
	const dispatch = useDispatch();
	const handleDialog = () => dispatch(openLogin(!open));
	useEffect(() => {
		if (isAuthenticated) dispatch(openLogin(false));
	}, [isAuthenticated, dispatch]);

	useEffect(() => {
		if (isAuthenticated)
			dispatch(
				setAlert({
					severity: SeverityTypes.SUCCESS,
					message: 'You were successfully logged in!',
					open: true,
					loading: null,
				})
			);
	}, [open, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

	// facebook
	const handleFacebookLoginSuccess = ({ provider, data }: IResolveParams) => {
		console.log(provider, data);
	};
	const handleFacebookLoginFailure = (error: string | objectType) => {
		console.log(error);
	};

	// google
	const handleGoogleLoginSuccess = ({ provider, data }: IResolveParams) => {
		console.log(provider, data);
	};
	const handleGoogleLoginFailure = (error: string | objectType) => {
		console.log(error);
	};

	return (
		<Dialog
			open={open}
			fullScreen={fullScreen}
			fullWidth
			disableScrollLock
			onClose={handleDialog}
			className={styles.dialog}
		>
			<DialogContent>
				<LoginTabs />
				<Typography variant='body1' className={styles.text}>
					{tab === TabNumbers.JOIN
						? 'Sign up to join our community and get access to private storage!'
						: "It's a pleasure to see you again."}
				</Typography>
				<LoginSocialFacebook
					appId={process.env.FACEBOOK_APP_KEY as string}
					onResolve={handleFacebookLoginSuccess}
					onReject={handleFacebookLoginFailure}
				>
					<SocialButton logo={LogoTypes.FACEBOOK} />
				</LoginSocialFacebook>
				<LoginSocialGoogle
					client_id={process.env.GOOGLE_CLIENT_KEY as string}
					onResolve={handleGoogleLoginSuccess}
					onReject={handleGoogleLoginFailure}
				>
					<SocialButton logo={LogoTypes.GOOGLE} />
				</LoginSocialGoogle>
				<DividerText text='or' width={fullScreen ? '100%' : '80%'} />
				<LoginFormFields />
				<div className={styles.terms}>
					<Typography variant='body2'>
						{tab === TabNumbers.JOIN
							? 'By joining CaptionAI, you agree to our Terms of Service.'
							: 'Reset your password'}
					</Typography>
				</div>
			</DialogContent>
			{fullScreen ? (
				<DialogActions>
					<Button onClick={handleDialog} color='primary'>
						Cancel
					</Button>
				</DialogActions>
			) : (
				''
			)}
		</Dialog>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		dialog: {
			textAlign: 'center',
		},
		text: {
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(3),
		},
		terms: {
			marginBottom: theme.spacing(1),
		},
	})
);

export default LoginForm;
