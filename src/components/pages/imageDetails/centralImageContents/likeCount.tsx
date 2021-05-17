import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store/reducers';
import { ImageState } from '../../../../store/types/image';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { ThumbDown, ThumbUp } from '@material-ui/icons';
import { blue } from '@material-ui/core/colors';

const LikeCount: React.FC = () => {
	// retrieve styles
	const styles = useStyles();

	// retrieve image
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);

	return image ? (
		<Grid container spacing={1} alignItems='center'>
			<Grid item>
				<AvatarGroup max={2} spacing={4}>
					<Avatar className={styles.likeAvatar}>
						<ThumbUp className={styles.icon} />
					</Avatar>
					<Avatar className={styles.dislikeAvatar}>
						<ThumbDown className={styles.icon} />
					</Avatar>
				</AvatarGroup>
			</Grid>
			<Grid item>
				<Typography color='textSecondary'>
					{image.likes.length} {image.likes.length === 1 ? 'like' : 'likes'} and{' '}
					{image.dislikes.length}{' '}
					{image.dislikes.length === 1 ? 'dislike' : 'dislikes'}
				</Typography>
			</Grid>
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		likeAvatar: {
			color: theme.palette.getContrastText(blue[800]),
			backgroundColor: blue[800],
			width: 20,
			height: 20,
		},
		dislikeAvatar: {
			color: theme.palette.getContrastText('#d50000'),
			backgroundColor: '#d50000',
			width: 20,
			height: 20,
		},
		icon: {
			fontSize: 14,
		},
	})
);

export default LikeCount;
