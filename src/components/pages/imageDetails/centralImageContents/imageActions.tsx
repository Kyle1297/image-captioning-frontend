import React, { Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, Grid } from '@material-ui/core';
import DownloadButton from '../../../common/buttons/downloadButton';
import LikingButton, { LikeTypes } from '../../../common/buttons/likingButton';

interface Props {
	imageWidth: number;
}

const ImageActions: React.FC<Props> = ({ imageWidth }) => {
	// retrieve styles
	const styles = useStyles();

	return (
		<Fragment>
			<Divider className={styles.top} />
			<Grid
				container
				alignItems='center'
				justify={imageWidth > 460 ? 'space-around' : 'space-between'}
			>
				<Grid item>
					<LikingButton type={LikeTypes.LIKE} />
				</Grid>
				<Grid item>
					<LikingButton type={LikeTypes.DISLIKE} />
				</Grid>
				<Grid item>
					<DownloadButton />
				</Grid>
			</Grid>
			<Divider className={styles.bottom} />
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		top: {
			marginTop: 12,
			marginBottom: 5,
		},
		bottom: {
			marginTop: 5,
			marginBottom: 22,
		},
	})
);

export default ImageActions;
