import React, { useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store/reducers';
import { Typography } from '@material-ui/core';
import PostComment from './postComment';
import UserComment from './userComment';
import { CommentsState } from '../../../../../store/types/comment';
import { Image } from '../../../../../store/types/image';
import { getComments } from '../../../../../store/actions/comment';
import DiscoverButton from '../../../../common/buttons/discoverButton';

const Comments: React.FC = () => {
	// retrieve styles
	const styles = useStyles();

	// retrieve image comments and image uuid
	const uuid = useSelector<AppState, Image['uuid'] | undefined>(
		(state) => state.image.image?.uuid
	);
	const { count, comments } = useSelector<AppState, CommentsState>(
		(state) => state.comments
	);

	// fetch image comments
	const dispatch = useDispatch();
	useEffect(() => {
		if (uuid) {
			dispatch(
				getComments(
					{
						image: uuid,
					},
					true
				)
			);
		}
	}, [dispatch, uuid]);

	return comments && uuid ? (
		<div className={styles.root}>
			<Typography>
				{comments[0]?.image === uuid ? count : 0} Comments
			</Typography>
			<PostComment />
			{comments.map((comment) => (
				<UserComment key={comment.id} uuid={uuid} id={comment.id} />
			))}
			<DiscoverButton uuid={uuid} />
		</div>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginTop: 20,
		},
	})
);

export default Comments;
