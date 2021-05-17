import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { Comment, CommentState } from '../../../../../store/types/comment';
import LikingButton, {
	LikeTypes,
} from '../../../../common/buttons/likingButton';
import UserAvatar, { UserTypes } from '../../../../common/layout/userAvatar';
import { AppState } from '../../../../../store/reducers';
import DisplayTime from '../../../../common/displayTime';
import OptionsMenu from '../../../../common/menu/optionsMenu';
import { Image } from '../../../../../store/types/image';

interface Props {
	id: Comment['id'];
	uuid: Image['uuid'];
}

const UserComment: React.FC<Props> = ({ id, uuid }) => {
	// retrieve styles and dispatch
	const styles = useStyles();

	// retrieve image comment
	const comment = useSelector<AppState, CommentState['comment']>((state) =>
		state.comments.comments.find((comment) => comment.id === id)
	);

	return comment?.image === uuid ? (
		<Grid container justify='center' spacing={2} className={styles.root}>
			<Grid item>
				<UserAvatar user={comment.commenter} userType={UserTypes.COMMENTER} />
			</Grid>
			<Grid item xs>
				<Grid container spacing={1} direction='column'>
					<Grid item>
						<Grid container justify='space-between' alignItems='center'>
							<Grid item>
								<Grid container spacing={1}>
									<Grid item>
										<Typography variant='body2'>
											{comment.commenter.username}
										</Typography>
									</Grid>
									<Grid item>
										<DisplayTime
											timestamp={comment.last_edited}
											edited={comment.last_edited !== comment.commented_at}
										/>
									</Grid>
								</Grid>
							</Grid>
							<OptionsMenu commentId={id} />
						</Grid>
					</Grid>
					<Grid item>
						<Typography className={styles.comment} variant='body2'>
							{comment.comment}
						</Typography>
					</Grid>
					<Grid item>
						<Grid container spacing={2}>
							<LikingButton commentId={id} type={LikeTypes.LIKE} />
							<LikingButton commentId={id} type={LikeTypes.DISLIKE} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: 12,
		},
		comment: {
			wordBreak: 'break-word',
		},
		menuText: {
			marginLeft: 18,
			marginRight: 20,
			marginBottom: 1,
		},
	})
);

export default UserComment;
