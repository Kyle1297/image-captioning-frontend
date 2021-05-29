import React, { Fragment, useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { AuthState } from '../../../store/types/auth';
import { cyan, green, red, teal } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';

export enum UserTypes {
	UPLOADER,
	COMMENTER,
	POSTER,
	USER_SMALL,
	USER_LARGE,
	FOLLOWER,
}

interface Props {
	user: AuthState['user'] | AuthState['publicUser'];
	userType: UserTypes;
	noLink?: boolean;
}

const UserAvatar: React.FC<Props> = ({ user, userType, noLink }) => {
	// retrieve styles
	const styles = useStyles();

	// remove link
	const handleNoLink = (event: React.MouseEvent<HTMLAnchorElement>) =>
		event.preventDefault();

	// detect when image has loaded
	const [imageLoaded, setImageLoaded] = useState<boolean>(true);
	const handleImageLoad = () => setImageLoaded(true);

	// reset image load status if image src changes
	useEffect(() => {
		if (user?.profile.image?.uuid) setImageLoaded(false);
	}, [user?.profile.image?.uuid]);

	return (
		<Fragment>
			<Link
				to={`/users/${user?.username}`}
				className={styles.link}
				onClick={noLink ? handleNoLink : undefined}
				style={noLink ? { pointerEvents: 'none' } : {}}
			>
				<Avatar
					src={user?.profile?.image?.image}
					alt={user?.username}
					variant={userType === UserTypes.FOLLOWER ? 'rounded' : 'circular'}
					onLoad={handleImageLoad}
					onError={handleImageLoad}
					style={
						imageLoaded
							? (() => {
									switch (userType) {
										case UserTypes.UPLOADER:
											return { backgroundColor: green[400] };
										case UserTypes.FOLLOWER:
											return {
												backgroundColor: cyan[200],
												width: 75,
												height: 75,
											};
										case UserTypes.COMMENTER:
											return { backgroundColor: cyan[200] };
										case UserTypes.USER_SMALL:
											return {
												backgroundColor: teal[200],
												width: 34,
												height: 34,
											};
										case UserTypes.USER_LARGE:
											return {
												backgroundColor: red[200],
												width: 135,
												height: 135,
											};
										default:
											return {
												backgroundColor: red[200],
												width: 44,
												height: 44,
											};
									}
							  })()
							: { display: 'none' }
					}
					className={styles.avatar}
				/>
			</Link>
			{imageLoaded ? (
				''
			) : (
				<Skeleton
					animation='wave'
					variant='circle'
					style={(() => {
						switch (userType) {
							case UserTypes.UPLOADER:
							case UserTypes.COMMENTER:
								return { width: 40, height: 40 };
							case UserTypes.FOLLOWER:
								return { width: 75, height: 75 };
							case UserTypes.USER_SMALL:
								return { width: 34, height: 34 };
							case UserTypes.USER_LARGE:
								return { width: 135, height: 135 };
							default:
								return { width: 44, height: 44 };
						}
					})()}
				/>
			)}
		</Fragment>
	);
};

// styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		avatar: {
			color: 'white',
		},
		link: {
			color: 'black',
			textDecoration: 'none',
		},
	})
);

export default UserAvatar;
