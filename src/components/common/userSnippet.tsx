import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { AppState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import { ImageState } from '../../store/types/image';
import UserAvatar, { UserTypes } from './layout/userAvatar';
import DisplayTime from './displayTime';
import OptionsMenu from './menu/optionsMenu';
import { User } from '../../store/types/auth';
import { Link } from 'react-router-dom';

interface Props {
	user?: User;
}

const UserSnippet: React.FC<Props> = ({ user }) => {
	// retrieve styles
	const styles = useStyles();

	// retrieve image
	const image = useSelector<AppState, ImageState['image']>(
		(state) => state.image.image
	);

	return image || user ? (
		<Grid container justify='space-between'>
			<Grid item>
				<Grid
					container
					alignItems='center'
					spacing={user ? 3 : 1}
					className={styles.root}
				>
					<Grid item>
						<UserAvatar
							user={user ? user : image ? image.uploader : null}
							userType={user ? UserTypes.FOLLOWER : UserTypes.UPLOADER}
						/>
					</Grid>
					<Grid item>
						<Grid container direction='column'>
							<Link
								to={`/users/${
									user ? user.username : image ? image.uploader.username : ''
								}`}
								className={styles.link}
							>
								<Typography variant={user ? 'body1' : 'subtitle2'}>
									{user
										? user.username
										: image?.uploader
										? image.uploader.username
										: 'Anonymous'}
								</Typography>
							</Link>
							{user ? (
								<Link
									to={`/users/${
										user ? user.username : image ? image.uploader.username : ''
									}`}
									className={styles.link}
								>
									<Typography
										variant='caption'
										className={styles.subText}
									>{`${user.counts.public} images`}</Typography>
								</Link>
							) : image ? (
								<DisplayTime timestamp={image.uploaded_at} />
							) : (
								''
							)}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<OptionsMenu username={user?.username} uuid={image?.uuid} />
		</Grid>
	) : (
		<div />
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			marginBottom: 5,
		},
		subText: {
			color: grey[600],
		},
		link: {
			color: 'black',
			textDecoration: 'none',
		},
	})
);

export default UserSnippet;
