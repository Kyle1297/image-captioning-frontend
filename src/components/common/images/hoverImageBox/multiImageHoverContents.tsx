import React, { Fragment } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import CommentButton from '../../buttons/commentButton';
import { ImageState } from '../../../../store/types/image';
import { AppState } from '../../../../store/reducers';
import { useSelector } from 'react-redux';
import LikingButton, { LikeTypes } from '../../buttons/likingButton';
import { Link } from 'react-router-dom';

interface Props {
	uuid: string;
}

const MultiImageHoverContents: React.FC<Props> = ({ uuid }) => {
	// control styles
	const styles = useStyles();
	const smallScreen = useMediaQuery('(max-width: 350px)');

	// retrieve image
	const image = useSelector<AppState, ImageState['image']>((state) =>
		state.images.images.find((image) => image.uuid === uuid)
	);

	return image ? (
		<Fragment>
			<Grid item className={styles.leftItem}>
				<Link to={`/users/${image.uploader.username}`} className={styles.link}>
					<Typography className={styles.text}>
						{image.uploader ? image.uploader.username : 'Anonymous'}
					</Typography>
				</Link>
			</Grid>
			<Grid
				item
				className={styles.rightItem}
				style={smallScreen ? { visibility: 'hidden' } : {}}
			>
				<Grid container spacing={1} justify='center' alignItems='center'>
					<LikingButton uuid={uuid} type={LikeTypes.LIKE} />
					<LikingButton uuid={uuid} type={LikeTypes.DISLIKE} />
					<CommentButton uuid={uuid} />
				</Grid>
			</Grid>
		</Fragment>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		leftItem: {
			marginLeft: 7,
		},
		rightItem: {
			marginRight: 12,
		},
		text: {
			fontSize: 16,
			marginLeft: 6,
		},
		link: {
			color: 'white',
			textDecoration: 'none',
		},
	})
);

export default MultiImageHoverContents;
