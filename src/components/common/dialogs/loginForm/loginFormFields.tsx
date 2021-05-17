import React, { useEffect, useState } from 'react';
import {
	TextField,
	Button,
	useMediaQuery,
	Typography,
	CircularProgress,
} from '@material-ui/core';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../../../store/actions/auth';
import { AppState } from '../../../../store/reducers';
import {
	ErrorMessage,
	Request,
	RequestEnums,
} from '../../../../store/types/request';
import {
	namedRequestError,
	namedRequestsInProgress,
} from '../../../../store/selectors/request';
import { LoginState, TabNumbers } from '../../../../store/types/login';

const LoginFormFields: React.FC = () => {
	// control styles
	const styles = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	// retrieve login tab
	const tab = useSelector<AppState, LoginState['tab']>(
		(state) => state.login.tab
	);

	// control username input
	const [username, setUsername] = useState<string>('');
	const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
		setUsername(event.currentTarget.value);

	// control email input
	const [email, setEmail] = useState<string>('');
	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(event.currentTarget.value);

	// control password input
	const [password, setPassword] = useState<string>('');
	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(event.currentTarget.value);

	// handle form submission
	const dispatch = useDispatch();
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (tab === TabNumbers.JOIN)
			dispatch(
				registerUser({
					username: username,
					password: password,
					email: email,
				})
			);
		else
			dispatch(
				loginUser({
					username: username,
					password: password,
				})
			);
	};

	// check for errors on form submission
	const loginErrorData = useSelector<AppState, ErrorMessage['data']>(
		(state) => namedRequestError(state, RequestEnums.loginUser)?.data
	);
	const registerErrorData = useSelector<AppState, ErrorMessage['data']>(
		(state) => namedRequestError(state, RequestEnums.registerUser)?.data
	);
	const isLoginError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.loginUser)
	);
	const isRegisterError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.registerUser)
	);

	// clear fields if login tab is changed
	useEffect(() => {
		setPassword('');
		setUsername('');
		setEmail('');
	}, [tab]);

	// detect when login or register request is currently occurring
	const registerIsLoading = useSelector<AppState, Request['isLoading']>(
		(state) => namedRequestsInProgress(state, RequestEnums.registerUser)
	);
	const loginIsLoading = useSelector<AppState, Request['isLoading']>((state) =>
		namedRequestsInProgress(state, RequestEnums.loginUser)
	);

	return (
		<form onSubmit={handleFormSubmit}>
			<TextField
				size='small'
				className={styles.textField}
				style={fullScreen ? { width: '100%' } : { width: '80%' }}
				variant='outlined'
				label='Username'
				onChange={handleUsername}
				value={username}
				error={
					(registerErrorData &&
						registerErrorData.username &&
						tab === TabNumbers.JOIN) ||
					(loginErrorData &&
						loginErrorData.username &&
						tab === TabNumbers.LOGIN)
						? true
						: false
				}
				helperText={(() => {
					if (tab === TabNumbers.LOGIN) {
						if (loginErrorData && loginErrorData.username)
							return loginErrorData.username.join(' ');
					} else {
						if (registerErrorData && registerErrorData.username)
							return registerErrorData.username.join(' ');
					}
				})()}
			/>
			{tab === TabNumbers.JOIN ? (
				<TextField
					size='small'
					className={styles.textField}
					style={fullScreen ? { width: '100%' } : { width: '80%' }}
					variant='outlined'
					label='Email'
					onChange={handleEmail}
					value={email}
					error={registerErrorData && registerErrorData.email ? true : false}
					helperText={
						tab === TabNumbers.JOIN &&
						registerErrorData &&
						registerErrorData.email
							? registerErrorData.email.join(' ')
							: ''
					}
				/>
			) : (
				''
			)}
			<TextField
				size='small'
				className={styles.textField}
				style={fullScreen ? { width: '100%' } : { width: '80%' }}
				variant='outlined'
				label='Password'
				error={
					(registerErrorData &&
						registerErrorData.password &&
						tab === TabNumbers.JOIN) ||
					(loginErrorData &&
						loginErrorData.password &&
						tab === TabNumbers.LOGIN)
						? true
						: false
				}
				helperText={(() => {
					if (tab === TabNumbers.LOGIN) {
						if (loginErrorData && loginErrorData.password)
							return loginErrorData.password.join(' ');
					} else {
						if (registerErrorData && registerErrorData.password)
							return registerErrorData.password.join(' ');
						else return 'Your password must contain at least 8 characters.';
					}
				})()}
				type='password'
				onChange={handlePassword}
				value={password}
			/>
			<Button
				size='large'
				type='submit'
				style={getStyles(fullScreen, isLoginError || isRegisterError, theme)}
				className={styles.button}
				variant='contained'
				color='primary'
			>
				{loginIsLoading || registerIsLoading ? (
					<CircularProgress size={28} className={styles.loading} />
				) : tab === TabNumbers.JOIN ? (
					'Join'
				) : (
					'Login'
				)}
			</Button>
			{isLoginError || isRegisterError ? (
				<Typography className={styles.error} color='error' variant='body2'>
					{(() => {
						if (tab === TabNumbers.LOGIN) {
							if (loginErrorData && loginErrorData.non_field_errors)
								return loginErrorData.non_field_errors.join(' ');
							else if (isLoginError && !loginErrorData)
								return "Hmmm... couldn't reach server to login. Please try again later.";
						} else if (isRegisterError && !registerErrorData)
							return "Hmmm... couldn't reach server to register. Please try again later.";
					})()}
				</Typography>
			) : (
				''
			)}
		</form>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textField: {
			[`& fieldset`]: {
				borderRadius: 25,
			},
			marginBottom: theme.spacing(2.5),
		},
		button: {
			textTransform: 'none',
			borderRadius: '25px',
		},
		error: {
			marginBottom: theme.spacing(4),
		},
		loading: {
			color: 'orange',
		},
	})
);

const getStyles = (
	fullScreen: boolean,
	invalidLogin: Request['error'],
	theme: Theme
) => {
	if (fullScreen) {
		if (invalidLogin)
			return {
				width: '100%',
				marginBottom: theme.spacing(1),
			};
		else
			return {
				width: '100%',
				marginBottom: theme.spacing(4),
			};
	} else {
		if (invalidLogin)
			return {
				width: '80%',
				marginBottom: theme.spacing(1),
			};
		else
			return {
				width: '80%',
				marginBottom: theme.spacing(4),
			};
	}
};

export default LoginFormFields;
