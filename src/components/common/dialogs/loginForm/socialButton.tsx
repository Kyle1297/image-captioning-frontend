import React from 'react';
import { Button, useMediaQuery } from '@material-ui/core';
import {
	createStyles,
	makeStyles,
	Theme,
	useTheme,
} from '@material-ui/core/styles';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export enum LogoTypes {
	FACEBOOK,
	GOOGLE,
}

interface Props {
	logo: LogoTypes;
}

const SocialButton: React.FC<Props> = ({ logo }) => {
	// control styles
	const styles = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
	const smallScreen = useMediaQuery('(max-width: 320px)');

	return (
		<Button
			size='large'
			style={fullScreen ? { width: '100%' } : { width: '80%' }}
			className={styles.button}
			classes={{ startIcon: styles.startIcon }}
			variant='outlined'
			startIcon={logo ? <FaFacebook /> : <FcGoogle />}
		>
			{smallScreen ? '' : 'Continue with '}
			{logo ? 'Facebook' : 'Google'}
		</Button>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			textTransform: 'none',
			borderRadius: '25px',
			marginBottom: theme.spacing(3),
		},
		startIcon: {
			color: '#4267B2',
			position: 'absolute',
			left: '1em',
		},
	})
);

export default SocialButton;
