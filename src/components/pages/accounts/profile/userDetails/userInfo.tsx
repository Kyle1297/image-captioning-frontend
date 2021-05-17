import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

interface Props {
	Icon: React.ComponentType<any>;
	contents: React.ReactNode;
}

const UserInfo: React.FC<Props> = ({ Icon, contents }) => {
	// access styles
	const styles = useStyles();

	return (
		<Grid item>
			<Grid
				container
				className={styles.nowrap}
				wrap='nowrap'
				spacing={1}
				alignItems='center'
			>
				<Grid item>
					<Icon className={styles.icon} />
				</Grid>
				<Grid item>
					<Typography variant='body2' className={styles.subText}>
						{contents}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		icon: {
			fontSize: 11,
			color: grey[600],
		},
		subText: {
			color: grey[600],
			fontSize: 13,
		},
		nowrap: {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
	})
);

export default UserInfo;
