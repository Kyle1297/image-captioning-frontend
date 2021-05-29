import React, { useEffect, useRef, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../../store/reducers';
import { ImageState } from '../../../../../../store/types/image';
import UserAvatar, { UserTypes } from '../../../../../common/layout/userAvatar';
import { AuthState } from '../../../../../../store/types/auth';
import { Grid, TextField } from '@material-ui/core';
import { namedRequestError } from '../../../../../../store/selectors/request';
import { Request, RequestEnums } from '../../../../../../store/types/request';
import { setAlert } from '../../../../../../store/actions/alert';
import { SeverityTypes } from '../../../../../../store/types/alert';
import { createComment } from '../../../../../../store/actions/comment';
import { setLogin } from '../../../../../../store/actions/login';
import { TabNumbers } from '../../../../../../store/types/login';
import CommentActions from './commentActions';

const PostComment: React.FC = () => {
	// retrieve styles and dispatch
	const styles = useStyles();
	const dispatch = useDispatch();

	// retrieve image, user and comment states
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);
	const user = useSelector<AppState, AuthState['user']>(
		(state) => state.auth.user
	);
	const commentError = useSelector<AppState, Request['error']>((state) =>
		namedRequestError(state, RequestEnums.createComment)
	);

	// handle comment input
	const [comment, setComment] = useState<string>('');
	const commentRef = useRef<HTMLInputElement>(null);
	const handleComment = (event: React.ChangeEvent<HTMLInputElement>) =>
		setComment(event.currentTarget.value);

	// handle comment error
	useEffect(() => {
		if (commentError) {
			dispatch(
				setAlert({
					severity: SeverityTypes.ERROR,
					message: 'Comment failed to upload. Please try again later.',
					open: true,
					loading: null,
				})
			);
		}
	}, [commentError, dispatch]);

	// handle comment input focusing
	const [commentFocused, setCommentFocused] = useState<boolean>(false);
	const handleCommentBlur = () => setCommentFocused(false);
	const handleCommentFocus = () => {
		if (user) setCommentFocused(true);
		else {
			// alert need for authentication to comment
			if (commentRef && commentRef.current) commentRef.current.blur();
			dispatch(
				setLogin({
					tab: TabNumbers.LOGIN,
					open: true,
				})
			);
			setTimeout(() => {
				dispatch(
					setAlert({
						severity: SeverityTypes.WARNING,
						message: 'You need to be logged in to comment.',
						open: true,
						loading: null,
					})
				);
			}, 140);
		}
	};

	// handle form submission
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (image && user) {
			dispatch(
				createComment({
					comment: comment,
					commenter: { id: user.id },
					image: image.uuid,
				})
			);
			setComment('');
			if (commentRef && commentRef.current) commentRef.current.blur();
		}
	};

	return image ? (
		<Grid container justify='center' spacing={2} className={styles.root}>
			<Grid item>
				<UserAvatar
					user={user}
					userType={UserTypes.POSTER}
					noLink={user ? false : true}
				/>
			</Grid>
			<Grid item xs>
				<form onSubmit={handleFormSubmit}>
					<Grid container spacing={1} direction='column'>
						<Grid item>
							<TextField
								fullWidth
								inputRef={commentRef}
								size='small'
								placeholder='Add a comment...'
								onFocus={handleCommentFocus}
								onBlur={handleCommentBlur}
								onChange={handleComment}
								value={comment}
								error={commentError ? true : false}
								InputProps={{
									classes: user
										? {}
										: {
												underline: styles.underline,
										  },
								}}
							/>
						</Grid>
						<CommentActions comment={comment} commentFocused={commentFocused} />
					</Grid>
				</form>
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
			marginTop: 12,
		},
		underline: {
			'&:not(:hover):after': {
				borderColor: 'lightgray',
			},
		},
	})
);

export default PostComment;
