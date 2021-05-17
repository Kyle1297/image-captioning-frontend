import React, { useEffect, useMemo, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Grid,
	IconButton,
	Tooltip,
	Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Image, ImageState } from '../../../../store/types/image';
import { AppState } from '../../../../store/reducers';
import { AuthState, User } from '../../../../store/types/auth';
import { updateImage } from '../../../../store/actions/image';
import { setAlert } from '../../../../store/actions/alert';
import { SeverityTypes } from '../../../../store/types/alert';
import { setLogin } from '../../../../store/actions/login';
import { TabNumbers } from '../../../../store/types/login';
import { Request, RequestEnums } from '../../../../store/types/request';
import { namedRequestError } from '../../../../store/selectors/request';
import { blue, grey } from '@material-ui/core/colors';
import { Comment, CommentState } from '../../../../store/types/comment';
import { updateComment } from '../../../../store/actions/comment';
import LikingIcon from './likingIcon';
import { instanceOfImage } from '../../types';

export enum LikeTypes {
	LIKE,
	DISLIKE,
}

interface LikingPatch {
	likes: User['id'][];
	dislikes: User['id'][];
}

interface Props {
	uuid?: Image['uuid'];
	type: LikeTypes;
	commentId?: Comment['id'];
}

const LikingButton: React.FC<Props> = ({ uuid, type, commentId }) => {
	// access styles and dispatch
	const styles = useStyles();
	const dispatch = useDispatch();

	// retrieve current user
	const { user, isAuthenticated } = useSelector<AppState, AuthState>(
		(state) => state.auth
	);

	// retrieve image or comment
	const data = useSelector<
		AppState,
		ImageState['image'] | CommentState['comment']
	>((state) => {
		if (uuid) return state.images.images.find((image) => image.uuid === uuid);
		else if (commentId)
			return state.comments.comments.find(
				(comment) => comment.id === commentId
			);
		else return state.image.image;
	});

	// retrieve either image or comment update error
	const updateError = useSelector<AppState, Request['error']>((state) =>
		commentId
			? namedRequestError(state, RequestEnums.updateComment)
			: namedRequestError(state, RequestEnums.updateImage)
	);

	// handle hovering over button
	const [hovering, setHovering] = useState<boolean>(false);
	const handleEnterHover = (event: React.MouseEvent<HTMLButtonElement>) =>
		setHovering(true);
	const handleExitHover = (event: React.MouseEvent<HTMLButtonElement>) =>
		setHovering(false);

	// update total number of likes
	const updateLikes = ({ likes, dislikes }: LikingPatch) => {
		if (user) {
			if (likes.includes(user.id))
				likes = likes.filter((item) => item !== user.id);
			else {
				likes = [...likes, user.id];
				if (dislikes.includes(user.id))
					dislikes = dislikes.filter((item) => item !== user.id);
			}
		}
		return {
			likes: likes,
			dislikes: dislikes,
		};
	};

	// update total number of dislikes
	const updateDislikes = ({ likes, dislikes }: LikingPatch) => {
		if (user) {
			if (dislikes.includes(user.id))
				dislikes = dislikes.filter((item) => item !== user.id);
			else {
				dislikes = [...dislikes, user.id];
				if (likes.includes(user.id))
					likes = likes.filter((item) => item !== user.id);
			}
		}
		return {
			likes: likes,
			dislikes: dislikes,
		};
	};

	// handle button click
	const [buttonClicked, setButtonClicked] = useState<boolean>(false);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (isAuthenticated && user && data) {
			// only alter likes/dislikes if user is authenticated
			setButtonClicked(true);
			let liking = {
				likes: data.likes.map((item: User | number) =>
					typeof item === 'number' ? item : item.id
				),
				dislikes: data.dislikes.map((item: User | number) =>
					typeof item === 'number' ? item : item.id
				),
			};
			type === LikeTypes.LIKE
				? (liking = updateLikes(liking))
				: (liking = updateDislikes(liking));
			if (instanceOfImage(data)) dispatch(updateImage(data.uuid, liking));
			else dispatch(updateComment(data.id, liking));
		} else {
			// alert need for authentication
			dispatch(
				setAlert({
					severity: SeverityTypes.WARNING,
					message: `You need to be logged in to ${
						type === LikeTypes.LIKE ? 'like' : 'dislike'
					} the ${commentId ? 'comment' : 'image'}.`,
					open: true,
					loading: null,
				})
			);
			dispatch(
				setLogin({
					tab: TabNumbers.LOGIN,
					open: true,
				})
			);
		}
	};

	// handle update error
	useEffect(() => {
		if (updateError && buttonClicked) {
			setButtonClicked(false);
			dispatch(
				setAlert({
					severity: SeverityTypes.ERROR,
					message: `There was an error when trying to ${
						type === LikeTypes.LIKE ? 'like' : 'dislike'
					} the ${commentId ? 'comment' : 'image'}.`,
					open: true,
					loading: null,
				})
			);
		}
	}, [updateError, dispatch, commentId, type, buttonClicked]);

	// check if current user has liked the image or comment already
	const userActioned = useMemo(() => {
		if (user && data) {
			if (type === LikeTypes.LIKE)
				return data.likes.some((item: User | number) =>
					typeof item === 'number' ? item === user.id : item.id === user.id
				);
			return data.dislikes.some((item: User | number) =>
				typeof item === 'number' ? item === user.id : item.id === user.id
			);
		}
	}, [data, user, type]);

	return data ? (
		commentId || uuid ? (
			<Grid item>
				<Grid
					container
					alignItems='center'
					style={commentId ? { marginLeft: 6 } : {}}
				>
					<Tooltip
						title={
							commentId ? (type === LikeTypes.LIKE ? 'Like' : 'Dislike') : ''
						}
					>
						<IconButton
							onClick={handleClick}
							onMouseEnter={handleEnterHover}
							onMouseLeave={handleExitHover}
							edge={commentId ? 'start' : false}
							style={(() => {
								if (uuid) return { color: 'white' };
								else {
									if (userActioned) return { color: blue[800] };
									else {
										if (hovering) return { color: grey[600] };
										else return { color: grey[500] };
									}
								}
							})()}
							className={styles.iconButton}
						>
							<LikingIcon
								size={18}
								type={type}
								hovering={hovering}
								userActioned={userActioned}
								comment={commentId ? true : false}
							/>
						</IconButton>
					</Tooltip>
					<Typography className={styles.text}>
						{type === LikeTypes.LIKE
							? data.likes.length < 100
								? data.likes.length
								: '99+'
							: data.dislikes.length < 100
							? data.dislikes.length
							: '99+'}
					</Typography>
				</Grid>
			</Grid>
		) : (
			<Button
				className={styles.button}
				onClick={handleClick}
				style={userActioned ? { color: blue[800] } : { color: grey[700] }}
			>
				<LikingIcon
					size={16}
					type={type}
					hovering={hovering}
					userActioned={userActioned}
				/>
				<Typography className={styles.text}>
					{type === LikeTypes.LIKE ? 'Like' : 'Dislike'}
				</Typography>
			</Button>
		)
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		button: {
			textTransform: 'none',
			fontSize: 16,
		},
		iconButton: {
			padding: 6,
		},
		text: {
			marginLeft: 5,
		},
	})
);

export default LikingButton;
