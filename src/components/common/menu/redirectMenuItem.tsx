import React, { Dispatch, SetStateAction } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {
	createStyles,
	makeStyles,
	Theme,
	Typography,
	withStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router';

interface Props {
	label: string;
	url: string;
	setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
	center?: boolean;
}

const RedirectMenuItem: React.FC<Props> = ({
	label,
	url,
	setAnchorEl,
	center,
}) => {
	// access styles
	const styles = useStyles();

	// handle redirection and menu close
	const history = useHistory();
	const handleRedirect = () => {
		setAnchorEl(null);
		history.push(url);
	};

	return (
		<StyledMenuItem
			style={center ? { justifyContent: 'center' } : {}}
			onClick={handleRedirect}
		>
			<Typography className={styles.content}>{label}</Typography>
		</StyledMenuItem>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		content: {
			marginLeft: 7,
		},
	})
);

const StyledMenuItem = withStyles({
	root: {
		'&:hover': {
			backgroundColor: 'lightgray',
		},
		paddingTop: 12,
		paddingBottom: 12,
	},
})(MenuItem);

export default RedirectMenuItem;
